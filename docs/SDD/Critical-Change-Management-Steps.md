# Critical Change Management Steps: TFS Process Changes for EDS with DA Migration

## Document Purpose

This document identifies and details the critical change management steps required for the Thermo Fisher Scientific (TFS) web team as they transition from AEM 6.4 to Edge Delivery Services (EDS) with Document Authoring (DA). Each use case identifies the current-state process, future-state process, delta/impact, and recommended change management actions.

> **Audience:** TFS Corporate Web Team, Regional Content Authors, Governance & Operations Leads, Adobe Solution Delivery Team

---

## Executive Summary

The migration from AEM 6.4 to EDS with DA represents a fundamental shift in operating model across five key dimensions:

| Dimension | AEM 6.4 (Current) | EDS with DA (Future) |
|-----------|-------------------|---------------------|
| Authoring Model | Component-based in AEM Author UI | Document-based in Google Docs/SharePoint |
| Content Storage | JCR Repository | Google Drive / SharePoint |
| Publishing Model | Replication agents + Dispatcher | Preview & Publish via aem.live |
| Governance | Template policies + component restrictions | Configuration sheets + folder governance |
| Inheritance | MSM with component-level LiveCopy | Page-level inheritance with planned enhancements |

**Critical Success Factors:**
- Phased rollout with pilot validation before full-scale migration
- Dedicated enablement program for ~200 content authors
- Governance model redesign aligned to configuration-driven controls
- Clear escalation and support model during transition

---

## 1. Content Authoring Process Changes

### Use Case 1.1: Page Creation

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Tool** | AEM Author UI (Sites Console) | Google Docs or Microsoft SharePoint | **HIGH** |
| **Method** | Select template > Create page in content tree | Create document from template in shared drive folder | **HIGH** |
| **Template Enforcement** | AEM Template Policies restrict available components | Folder-level document templates; content structure defined by document format | **MEDIUM** |
| **Preview** | AEM Preview mode / Preview instance | Live preview via `.page` URL (near-instant) | **LOW** |
| **Metadata** | Page Properties dialog in AEM | Metadata block within document or sheet-based configuration | **MEDIUM** |

**Change Management Actions:**
1. **Training Program:** Develop role-based training curriculum for document-based authoring (estimated 4-8 hours per author cohort)
2. **Template Library:** Create pre-configured document templates mirroring existing AEM templates to minimize cognitive shift
3. **Quick Reference Guides:** Produce visual comparison guides showing "how you do it today vs. how you'll do it tomorrow"
4. **Sandbox Environment:** Provide practice environment for authors to experiment without production impact
5. **Champion Network:** Identify 10-15 power users across regions as early adopters and peer coaches

---

### Use Case 1.2: Component/Block Authoring

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Adding Content Blocks** | Drag-and-drop components from sidekick/side panel | Insert content sections in document using defined patterns (tables, headings, separators) | **HIGH** |
| **Block Configuration** | Component dialogs with dropdowns, checkboxes, fields | Document structure conventions; block options via table formatting | **HIGH** |
| **Rich Text Editing** | AEM RTE with configured plugins | Native document editor (Google Docs/Word) formatting | **MEDIUM** |
| **Image Management** | DAM asset picker within AEM | Insert images directly in document; assets served from drive or DAM | **MEDIUM** |
| **Variant Selection** | Component dialog dropdowns (e.g., "Hero - Large", "Hero - Compact") | Block name variations in document table headers (e.g., `Hero (large)`) | **MEDIUM** |

**Change Management Actions:**
1. **Block Catalog Documentation:** Produce comprehensive block catalog with visual examples, authoring patterns, and naming conventions
2. **Side-by-Side Mapping:** Document every current AEM component and its corresponding DA block pattern
3. **Authoring Conventions Guide:** Define and socialize the "rules" for document-based block authoring (table formats, naming, separators)
4. **Validation Tooling:** Implement content validation tools or "preflight" checks to catch authoring errors before publish
5. **Phased Block Migration:** Prioritize high-frequency blocks for Day 1, introduce advanced blocks in subsequent phases

---

### Use Case 1.3: Multi-Language / Regional Content Creation

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Language Copy Creation** | MSM LiveCopy rollout creates localized pages | Copy document to regional folder; modify as needed | **HIGH** |
| **Component-Level Inheritance** | Individual components inherit from blueprint; override selectively | Page-level copy; sections managed independently per locale | **HIGH** |
| **Translation Integration** | AEM Translation Framework with connector (e.g., Smartling, RWS) | Translation connector integration (API-based); translated docs placed in locale folders | **MEDIUM** |
| **Rollout Trigger** | Author triggers rollout from blueprint to LiveCopies | Manual or automated sync via defined process (planned enhancement) | **HIGH** |

**Change Management Actions:**
1. **Inheritance Model Workshop:** Conduct workshops explaining the shift from component-level to page-level content management
2. **Regional Governance Playbook:** Define new processes for how global changes propagate to regional content
3. **Synchronization SOP:** Document standard operating procedures for keeping regional content aligned with global updates
4. **Impact Assessment per Region:** Assess each region's current inheritance usage and quantify the operational delta
5. **Automation Planning:** Identify opportunities for scripted/automated content synchronization to offset manual overhead

---

## 2. Governance & Controls

### Use Case 2.1: Template & Content Governance

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Template Enforcement** | AEM Template policies; allowed components defined per template | Folder-level permissions; document templates as governance layer | **HIGH** |
| **Component Restrictions** | Policy-based component allowlisting per content area | Block validation via automated checks or editorial review | **MEDIUM** |
| **Content Structure Rules** | Paragraph systems with locked/unlocked areas | Document structure conventions enforced through training + validation | **HIGH** |
| **Brand Compliance** | Component designs enforce brand constraints | Style/CSS enforcement at delivery layer; author flexibility in document | **MEDIUM** |
| **Access Control** | AEM user groups + ACLs on content paths | Google Drive / SharePoint permissions on folders | **MEDIUM** |

**Change Management Actions:**
1. **Governance Model Redesign:** Redesign governance framework from "platform-enforced" (AEM policies) to "process-enforced + automated validation"
2. **Folder Structure Strategy:** Design folder hierarchy that maps to governance boundaries (region, brand, content type)
3. **Permission Matrix:** Create detailed permission matrix mapping current AEM groups to Drive/SharePoint access levels
4. **Automated Guardrails:** Implement automated content validation (pre-publish checks) to replace AEM policy enforcement
5. **Governance Dashboard:** Establish monitoring/reporting for content compliance, authoring adherence, and quality metrics
6. **Escalation Procedures:** Define clear escalation paths for governance violations detected post-publish

---

### Use Case 2.2: Approval & Publishing Workflows

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Approval Process** | Custom AEM workflow (43-step Major / 29-step Simple) | Configuration-based approval via Request Publish; multi-step enhancement planned | **HIGH** |
| **Workflow Routing** | Code-based routing with conditional logic | Path-based configuration in admin sheets | **MEDIUM** |
| **Reviewer Experience** | AEM Inbox with task assignment | Email/notification-based with approve/reject actions | **MEDIUM** |
| **Publishing Trigger** | Workflow completion activates replication | Approval triggers publish to `.live` environment | **LOW** |
| **Scheduled Publishing** | AEM Scheduler / workflow-based scheduled activation | Planned enhancement; manual publish timing in interim | **HIGH** |
| **Bulk Operations** | AEM bulk activation tools | Bulk publish via admin API or site-level operations | **MEDIUM** |

**Change Management Actions:**
1. **Workflow Simplification Analysis:** Review current 43-step workflow to identify true business logic steps vs. infrastructure steps; design streamlined future-state approval
2. **Interim Process Design:** Define transitional approval process for Day 1 (single-step) while multi-step enhancement is delivered
3. **Configuration Training:** Train workflow administrators on sheet-based workflow configuration
4. **Notification Design:** Design and implement notification/communication flows for approval requests
5. **Scheduling Workaround:** Document interim manual scheduling process until platform-native scheduling is available
6. **Workflow Migration Playbook:** Step-by-step guide for migrating each workflow variant to the new model

> **Dependency Note:** Multi-step sequential approval requires a planned DA product enhancement. Adobe engineering has confirmed commitment to deliver this capability through direct collaboration with TFS. Timeline and milestone commitments should be documented in the SOW.

---

### Use Case 2.3: Content Rollback & Version Control

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Version History** | AEM Versioning (manual + workflow-triggered) | Document version history (Google Docs/SharePoint native) | **LOW** |
| **Rollback** | Restore specific version in AEM; re-activate | Revert document to prior version; re-publish | **LOW** |
| **Audit Trail** | AEM Audit Log | Document revision history + publish event logs | **MEDIUM** |
| **Comparison** | AEM version diff tool | Document comparison (native to Google Docs/SharePoint) | **LOW** |

**Change Management Actions:**
1. **Version Control SOP:** Document new versioning and rollback procedures using document platform capabilities
2. **Audit Requirements:** Validate that document revision history meets compliance/audit requirements
3. **Training Module:** Include version management in author training curriculum

---

## 3. Intake & Request Management

### Use Case 3.1: Web Request Intake Process

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Request Types** | New page, content update, component config, template change | New document, content update, block addition, style change | **MEDIUM** |
| **Complexity Assessment** | Based on component complexity + workflow requirements | Based on content structure + block patterns | **LOW** |
| **Skill Requirements** | AEM authoring proficiency required | Document editing proficiency (lower barrier to entry) | **MEDIUM** |
| **Self-Service Scope** | Limited by AEM access + training | Broader self-service potential via familiar document tools | **MEDIUM** |
| **Developer Involvement** | Template/component changes require developer | Block/style changes require developer; content changes do not | **LOW** |

**Change Management Actions:**
1. **Intake Form Revision:** Update web request intake forms to reflect new request types and complexity tiers
2. **Triage Criteria Update:** Revise triage criteria based on new platform capabilities (more self-service = fewer centralized requests)
3. **Self-Service Expansion:** Identify content types/requests that can shift from centralized to self-service with DA
4. **SLA Adjustment:** Review and adjust SLAs based on new publishing speed (near-instant publish vs. replication delays)
5. **Capacity Planning:** Model impact on team capacity as authoring becomes more distributed

---

### Use Case 3.2: Request Routing & Assignment

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Routing Logic** | Ticket-based assignment (Jira/ServiceNow) + AEM workflow routing | Ticket-based assignment + folder/path-based approval routing | **LOW** |
| **Skill Matching** | Route to AEM-trained resources | Route based on content type; lower technical barrier | **LOW** |
| **Handoff Process** | Developer builds in AEM > Author reviews > Approve | Author creates in document > Reviewer approves > Publish | **MEDIUM** |

**Change Management Actions:**
1. **RACI Update:** Revise RACI matrix to reflect shifted responsibilities (more author-direct, less developer intermediation)
2. **Handoff Process Redesign:** Simplify handoff process where direct authoring replaces developer intermediation
3. **Skill Matrix Update:** Update team skill matrix and hiring/training profiles for DA-centric workflows

---

## 4. Operational Model Changes

### Use Case 4.1: Day-to-Day Content Operations

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Daily Author Workflow** | Login to AEM Author > Navigate content tree > Edit > Preview > Submit for approval | Open shared document > Edit > Preview via URL > Request publish | **HIGH** |
| **Collaboration** | Limited concurrent editing; check-in/check-out model | Real-time collaborative editing (Google Docs/SharePoint native) | **MEDIUM** (Positive) |
| **Content Discovery** | AEM search + content tree navigation | Drive/SharePoint search + folder navigation | **MEDIUM** |
| **Asset Management** | AEM DAM integration with asset picker | Direct image insertion or DAM connector | **MEDIUM** |
| **Performance Monitoring** | Dispatcher cache + CDN monitoring | Edge delivery performance (built-in Lighthouse 100 optimization) | **LOW** |

**Change Management Actions:**
1. **"Day in the Life" Documentation:** Create role-specific "day in the life" guides showing new daily workflows
2. **Collaboration Benefits Communication:** Proactively communicate collaboration improvements (real-time co-editing, familiar tools)
3. **Search & Discovery Training:** Train authors on finding and organizing content in the new storage model
4. **Support Model:** Establish tiered support model (self-service resources > peer champions > central team > Adobe support)

---

### Use Case 4.2: Environment & Deployment Operations

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Environments** | Author > Preview > Publish (AEM instances) | Document (source) > Preview (.page) > Live (.live) | **MEDIUM** |
| **Code Deployment** | AEM packages deployed via Cloud Manager / manual | Git push > automatic code sync to edge | **MEDIUM** |
| **Content Deployment** | Replication (Tree activation, individual activation) | Publish action (instant edge delivery) | **LOW** (Improvement) |
| **Environment Parity** | Often drift between Author and Publish | Preview and Live are architecturally identical | **LOW** (Improvement) |
| **Hotfix Process** | Emergency package deployment; dispatcher flush | Git commit to main branch (instant propagation) | **LOW** (Improvement) |

**Change Management Actions:**
1. **Environment Mapping Guide:** Document environment equivalencies for operations team
2. **Deployment Process Training:** Train DevOps/operations on Git-based deployment model
3. **Incident Response Update:** Update incident response procedures for the new deployment and rollback model

---

### Use Case 4.3: Monitoring, Analytics & Reporting

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Site Performance** | Custom monitoring + CDN analytics | Real User Monitoring (RUM) built into EDS; Lighthouse-optimized | **LOW** (Improvement) |
| **Content Analytics** | AEM + Adobe Analytics integration | Adobe Analytics / Launch integration maintained | **LOW** |
| **Author Activity Reporting** | AEM Audit logs + custom reports | Document activity logs + publish event tracking | **MEDIUM** |
| **Uptime Monitoring** | Infrastructure monitoring (AEM instances) | Edge network monitoring (Adobe-managed infrastructure) | **LOW** (Improvement) |

**Change Management Actions:**
1. **Reporting Migration:** Identify current reports dependent on AEM data and establish equivalents in new model
2. **RUM Onboarding:** Train operations team on EDS Real User Monitoring capabilities
3. **Dashboard Transition:** Build new operational dashboards aligned to EDS metrics and KPIs

---

## 5. MSM & Inheritance Model Changes

### Use Case 5.1: Global-to-Local Content Propagation

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Inheritance Unit** | Component-level (individual components inherit independently) | Page-level (entire document inherits; planned section-level enhancement) | **CRITICAL** |
| **Override Behavior** | Cancel inheritance on specific component; rest continues to inherit | Copy page to locale folder; manage independently or re-sync manually | **CRITICAL** |
| **Rollout Mechanism** | MSM rollout configs (on modification, on activation, manual) | Manual copy/sync or automated scripting (planned platform enhancement) | **HIGH** |
| **Cascade Behavior** | Multi-level cascade (Global > Region > Country > Language) | Folder hierarchy with copy/reference model | **HIGH** |
| **Conflict Resolution** | AEM conflict resolution dialogs on rollout | Manual comparison and merge; tooling under development | **HIGH** |

**Change Management Actions:**
1. **Inheritance Impact Workshop (CRITICAL):** Conduct detailed workshops per region to map current inheritance dependencies and quantify impact
2. **Page Inventory & Classification:** Classify all pages by inheritance complexity:
   - **Simple:** Full page inheritance (low impact to migrate)
   - **Moderate:** 1-3 component overrides per page (medium impact)
   - **Complex:** Heavy component-level overrides (high impact; requires new process design)
3. **New Operating Model Design:** Co-design with regional teams the new model for managing global-to-local content propagation
4. **Automation Investment:** Invest in scripted synchronization tooling to offset loss of automatic component-level inheritance
5. **Pilot Validation (MANDATORY):** Run inheritance pilot on representative page set before committing to full migration
6. **Capacity Impact Modeling:** Model the additional authoring effort required under page-level inheritance vs. component-level

> **Critical Risk:** This is the single highest-impact change for TFS operations. Without adequate tooling, automation, and process redesign, the shift from component-level to page-level inheritance could materially increase operational burden for ~200 content authors managing multi-region content.

---

### Use Case 5.2: Regional Content Independence

| Aspect | Current State (AEM 6.4) | Future State (EDS + DA) | Impact Level |
|--------|------------------------|------------------------|--------------|
| **Non-MSM Countries** | Independent content trees (no inheritance) | Independent folder structures (minimal change) | **LOW** |
| **Hybrid Models** | Mix of inherited and independent pages | Folder-based organization with clear separation | **LOW** |
| **Regional Autonomy** | Controlled by MSM configuration + permissions | Controlled by folder permissions + governance process | **MEDIUM** |

**Change Management Actions:**
1. **Regional Autonomy Mapping:** Document which regions are independent vs. inherited; plan accordingly
2. **Folder Governance Design:** Design folder structures that balance regional autonomy with corporate oversight

---

## 6. Training & Enablement Plan

### Recommended Training Phases

| Phase | Audience | Content | Duration | Timing |
|-------|----------|---------|----------|--------|
| **Phase 0: Awareness** | All 200+ authors | What's changing, why, timeline, benefits | 1 hour (webinar) | 8 weeks before Go-Live |
| **Phase 1: Foundation** | Pilot group (15-20 authors) | Hands-on document authoring, blocks, preview, publish | 2 days | 6 weeks before Go-Live |
| **Phase 2: Validation** | Pilot group | Real content migration exercises, feedback capture | 2 weeks (ongoing) | 4-6 weeks before Go-Live |
| **Phase 3: Core Training** | All authors (cohorts of 20-25) | Role-specific training, hands-on exercises, Q&A | 1.5 days per cohort | 2-4 weeks before Go-Live |
| **Phase 4: Advanced** | Power users, workflow admins, regional leads | Governance configuration, advanced blocks, troubleshooting | 1 day | 1-2 weeks before Go-Live |
| **Phase 5: Hypercare** | All authors | Office hours, 1:1 support, FAQ updates | 4 weeks | Go-Live + 4 weeks |

### Training Artifacts Required

- Video library (short-form, task-specific)
- Visual quick-reference cards (printable/digital)
- Interactive sandbox environment
- Block catalog with authoring examples
- FAQ document (living, updated during hypercare)
- Governance and process reference guide
- "AEM 6.4 to DA" translation cheat sheet

---

## 7. Risk Register & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Component-level inheritance loss increases operational burden beyond capacity | High | Critical | Invest in automation tooling; conduct capacity modeling before committing; mandatory pilot |
| R2 | Multi-step approval enhancement not delivered on timeline | Medium | High | Define interim manual process; document SOW milestone with Adobe engineering commitment |
| R3 | Scheduled publishing gap causes missed launch windows | Medium | High | Document manual workaround; confirm Adobe roadmap timeline for native scheduling |
| R4 | Author adoption resistance due to unfamiliar tools | Medium | Medium | Early engagement, champion network, demonstrate collaboration benefits, extended hypercare |
| R5 | Governance gaps during transition from policy-enforced to process-enforced model | Medium | High | Implement automated validation tooling; define clear governance escalation paths |
| R6 | Regional teams unprepared for changed content propagation model | High | High | Region-specific impact assessments; dedicated regional workshops; phased rollout by region |
| R7 | Self-service expansion creates content quality issues | Low | Medium | Automated quality checks; editorial review layer; clear publishing permissions |
| R8 | Platform immaturity introduces unexpected limitations during implementation | Medium | High | Pilot-first approach; documented feature dependency tracker with Adobe; contractual commitments |

---

## 8. Recommended Pilot Approach

Before full-scale migration, TFS should execute a structured pilot to validate process changes:

### Pilot Scope
- **Page Set:** 20-30 representative pages spanning simple, moderate, and complex inheritance patterns
- **Regions:** 2-3 regions with different inheritance models
- **Authors:** 15-20 authors across roles (global, regional, local)
- **Duration:** 4-6 weeks

### Pilot Validation Criteria

| Category | Validation Question | Success Criteria |
|----------|-------------------|-----------------|
| Authoring | Can authors create and edit content with acceptable efficiency? | Task completion time within 120% of current AEM time after training |
| Inheritance | Can global-to-local propagation be managed operationally? | Regional sync achievable within defined SLA |
| Governance | Are governance controls adequate without AEM policies? | Zero unauthorized content published during pilot |
| Workflows | Does approval process meet business requirements? | All required approvals captured before publish |
| Performance | Does publishing meet speed requirements? | Content live within X minutes of approval |
| Scale | Can the model support daily request volume? | Process handles simulated peak load without degradation |

### Pilot Decision Gate
At pilot completion, TFS leadership will have data to make an informed go/no-go decision for full migration based on empirical evidence rather than assumptions.

---

## 9. Implementation Sequencing Recommendation

```
Phase 0: Foundation & Planning (Weeks 1-4)
  ├── Governance model redesign
  ├── Folder structure & permissions design
  ├── Training curriculum development
  └── Automation tooling requirements

Phase 1: Pilot (Weeks 5-10)
  ├── Migrate representative page set
  ├── Author enablement (pilot cohort)
  ├── Validate inheritance model
  ├── Validate governance controls
  └── Capture metrics & feedback

Phase 2: Decision Gate (Week 11)
  ├── Pilot results review
  ├── Capacity impact assessment
  ├── Go/No-Go decision
  └── SOW/scope adjustments if needed

Phase 3: Scaled Migration (Weeks 12-24+)
  ├── Region-by-region rollout
  ├── Author training (all cohorts)
  ├── Content migration execution
  ├── Governance activation
  └── Hypercare support

Phase 4: Optimization (Ongoing)
  ├── Process refinement based on operational data
  ├── Automation enhancements
  ├── Advanced capability adoption
  └── Platform enhancement uptake
```

---

## 10. Summary: Critical Process Changes at a Glance

| # | Process Area | Change Severity | Key Action Required |
|---|-------------|----------------|-------------------|
| 1 | Content Authoring Tool | HIGH | Train 200+ authors on document-based authoring |
| 2 | Block/Component Authoring | HIGH | Document all block patterns; create authoring guides |
| 3 | Inheritance Model | CRITICAL | Redesign operating model; pilot mandatory; automation investment |
| 4 | Approval Workflows | HIGH | Design interim process; confirm multi-step enhancement timeline |
| 5 | Governance Enforcement | HIGH | Shift from platform-enforced to process + automation-enforced |
| 6 | Regional Content Management | HIGH | Region-specific impact assessment; new propagation SOPs |
| 7 | Intake & Request Management | MEDIUM | Update intake forms, triage criteria, SLAs |
| 8 | Scheduled Publishing | HIGH | Interim manual process; roadmap dependency |
| 9 | Environment Operations | MEDIUM | Retrain operations on Git-based deployment |
| 10 | Reporting & Monitoring | MEDIUM | Transition dashboards to EDS/RUM metrics |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **DA (Document Authoring)** | Adobe's document-based authoring model where content is created in Google Docs or Microsoft SharePoint |
| **EDS (Edge Delivery Services)** | Adobe's edge-optimized delivery platform providing near-instant page loads |
| **MSM (Multi-Site Manager)** | AEM feature enabling content inheritance and rollout across site hierarchies |
| **LiveCopy** | An AEM page that inherits content from a blueprint/source page via MSM |
| **Universal Editor** | Adobe's next-generation visual editor supporting in-context editing across content sources |
| **RUM (Real User Monitoring)** | Built-in EDS performance monitoring based on actual user page load data |
| **JCR (Java Content Repository)** | The content storage layer in traditional AEM (AEM 6.x and AEM Cloud) |
| **xWalk** | AEM Cloud with Universal Editor using JCR as the content backend |

## Appendix B: Document References

- [Approval & Publishing Workflows Comparison](./Approval-Publishing-Workflows-Comparison.md)
- [AEM Edge Delivery Services Documentation](https://www.aem.live/docs/)
- [Universal Editor Documentation](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction.html)

---

*Document Version: 1.0*
*Last Updated: May 28, 2026*
*Status: Draft for Internal Review*
