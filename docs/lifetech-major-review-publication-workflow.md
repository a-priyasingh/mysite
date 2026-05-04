# Lifetech Major Review & Publication Workflow

**Path:** `/conf/global/settings/workflow/models/lifetech/lifetech-major-review-publication`
**Environment:** Thermo Fisher Scientific AEM

---

## Overview

This is a multi-stage content review and publication workflow with **4 review gates**, an optional **translation branch**, **delayed release scheduling**, and **cancellation/rework handling** at every stage.

---

## Workflow Phases

```
Flow Start
  |
  +- Phase 1: Initialization & Rework Loop
  +- Phase 2: Design / UX Review
  +- Phase 3: Editorial Review
  +- Phase 4: Final Production Review (+ optional Translation)
  +- Phase 5: Production Run & Scheduled Publishing
  +- Phase 6: Replication to Production
  +- Cancellation / End
Flow End
```

---

## Phase 1: Initialization & Rework Loop

| # | Step | Type | Description |
|---|------|------|-------------|
| 1 | **Log Start Workflow** | Process | Logs the start message to log files (`LogInfoWorkflowHandler`) |
| 2 | **Set the Parameters for Rework Task** | Process | Configures the Rework Task Participant Step (should only run on first pass) |
| 3 | **Select the Web Operations Team** | Process | For Final Production Review, selects the Content... Unlocks Workflow Author Group |
| 4 | **Place the Web Ops Team on the Workflow** | Process | Stores the selected Web Operations Team from the workflow metadata |
| 5 | **In the First Loop Ignore Rework Tasks** | Process | On first run, jumps over the Rework step (skip logic) |
| 6 | **Rework Content** | Process | Logs rework entry (`LogInfoWorkflowHandler`) |
| 7 | **Send Rework Notification to Initiator** | Process | Conditional email notification to the content author |
| 8 | **Rework Content Step** | Participant | The Workflow Initiator must revise the content (participant chooser) |

### Decision Point

| Option | Action |
|--------|--------|
| **Done and Send back to Reviewers** | Touches payload, resets state, continues to Design/UX Review |
| **Cancel the Workflow** | Content Author decides rework isn't viable -> jumps to Cancel Workflow Processing |

---

## Phase 2: Design / UX Review

| # | Step | Type | Description |
|---|------|------|-------------|
| 9 | **Hand over to the Design / UX Review** | Process | Transitions to design review stage |
| 10 | **Report the Meta Data** | Process | Logs metadata to log files |
| 11 | **Replicate to Preview** | Process | Replicates payload to Preview site |
| 12 | **Cache Flush Preview** | Process | Flushes the Preview Dispatcher Cache |
| 13 | **Notify Design Reviewer** | Process | Conditional email notification to design reviewer |
| 14 | **Review: UX / Design** | Participant | Design/UX Reviewer reviews the payload (Workflow Designer Reviewer Group) |

### Decision Point (3-way)

| Option | Action |
|--------|--------|
| **Approve the Changes** | Proceeds to Editorial Review |
| **Reject the Changes and Send Back to Rework** | Jumps back to Rework Content step (Phase 1, step 6) |
| **Cancel the Workflow** | Jumps to Workflow Cancellation Processing |

---

## Phase 3: Editorial Review

| # | Step | Type | Description |
|---|------|------|-------------|
| 15 | **Log the Start of the Editorial Review** | Process | Logs that Design/UX review was approved |
| 16 | **Replicate to Preview** | Process | Replicates payload to Preview site |
| 17 | **Cache Flush Preview** | Process | Flushes the Preview Dispatcher Cache |
| 18 | **Notify about Editorial Review** | Process | Conditional email notification to editorial reviewer |
| 19 | **Review: Editorial** | Participant | Editorial Reviewer reviews the payload (Workflow Editorial Reviewer Group) |

### Decision Point

| Option | Action |
|--------|--------|
| **Approve the Changes** | Proceeds to Final Production Review |
| **Cancel the Workflow** | Jumps to Workflow Cancellation Processing |

---

## Phase 4: Final Production Review

| # | Step | Type | Description |
|---|------|------|-------------|
| 20 | **Start the Final Production Review** | Process | Logs that Content Owner approved the changes |
| 21 | **Replicate to Preview** | Process | Replicates payload to Preview site |
| 22 | **Cache Flush Preview** | Process | Flushes the Preview Dispatcher Cache |
| 23 | **Notify about Final Production** | Process | Conditional email notification to production reviewer |
| 24 | **Review: Final Production** | Participant | Final Production Reviewer reviews the payload |

### Decision Point (3-way)

| Option | Action |
|--------|--------|
| **Approve the Changes** | Sets Delayed Release Date -> proceeds to Production Run |
| **Cancel the Workflow** | Jumps to Workflow Cancellation Processing |
| **Send to Translation** | Enters Translation sub-branch (see below) |

### Translation Sub-Branch

| # | Step | Type | Description |
|---|------|------|-------------|
| T1 | **Place the Delayed Release Date on the Workflow** | Process | Stores the selected Delayed Release Date |
| T2 | **Send Email Notification to Web Ops about Translation** | Process | Notifies Web Ops team about pending translation |
| T3 | **Waiting for Translation** | Participant | Pauses workflow until a user completes it (translation finished) |

#### Translation Decision Point

| Option | Action |
|--------|--------|
| **Translation Done, Start...** | Translation returned successfully -> proceeds to Production Run |
| **Cancel the Translation and...** | Translation cancelled -> jumps to Workflow Cancellation Processing |

---

## Phase 5: Production Run & Scheduled Publishing

| # | Step | Type | Description |
|---|------|------|-------------|
| 25 | **Start the Production Run** | Process | Logs that Final Production Reviewer approved |
| 26 | **Replicate to Preview** | Process | Replicates payload to Preview site |
| 27 | **Cache Flush Preview** | Process | Flushes the Preview Dispatcher Cache |
| 28 | **Check Delayed Release Date** | Process | Checks if a Delayed Release Date is set |
| 29 | **Requests Delayed Release Date** | Process | Allows workflow manager to set the publish date |
| 30 | **Send Email about the Pending Publication** | Process | Sends notification about pending publication |
| 31 | **Waiting to Publish** | Process | Waits until the Delayed Release Date arrives |

### Decision Point

| Option | Action |
|--------|--------|
| **Force the Deployment** | Accepts and proceeds to publish immediately |
| **Cancel the Workflow** | Logs cancellation -> jumps to Workflow Cancellation Processing |

---

## Phase 6: Replication & Completion

| # | Step | Type | Description |
|---|------|------|-------------|
| 32 | **Replicate to Production** | Process | Replicates payload to Production site |
| 33 | **Cache Flush Production** | Process | Flushes the Production Dispatcher Cache |
| 34 | **Send Email about Finished Publication** | Process | Sends final notification that content is live |
| 35 | **Ignore Cancel Workflow Processing** | Process | Jumps to end (skips cancel branch) |

---

## Cancellation Branch

| # | Step | Type | Description |
|---|------|------|-------------|
| 36 | **Cancel Workflow Processing** | Process | Logs start of cancellation |
| 37 | **Inform Content Author about Cancellation** | Process | Sends email to Content Author about the cancellation |
| 38 | **Log End of Workflow** | Process | Logs workflow completion |

**Flow End**

---

## Key Participant Groups

| Group | Phase | Role |
|-------|-------|------|
| **Workflow Author / Initiator** | Rework | Content author who initiated the workflow; handles rework |
| **Designer Reviewer Group** | Phase 2 | Reviews design and UX aspects |
| **Editorial Reviewer Group** | Phase 3 | Reviews editorial/copy quality |
| **Final Production Reviewer** | Phase 4 | Final approval gate before publishing |
| **Web Operations Team** | Phase 5 | Manages production deployment and scheduling |

---

## Key Patterns

- **Preview-first**: Every review stage replicates to Preview + flushes cache before the reviewer sees it
- **Conditional notifications**: All email notifications are parameter-based (only sent if configured)
- **Rework loop**: Design/UX review can reject back to the rework step, creating a loop
- **Cancellation at every gate**: Every participant step offers a Cancel option that routes to the same cancellation handler
- **Delayed release**: Supports scheduled publishing with a configurable release date
- **Translation support**: Optional translation branch after Final Production Review with its own wait/cancel logic
