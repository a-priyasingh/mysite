---
title: "AEM Web Forms vs Adaptive Forms"
subtitle: "Comparison and Migration Strategy for AEM as a Cloud Service"
date: "May 8, 2026"
author:
  - name: "Adobe Professional Services"
    affiliation: "Edge Delivery Services"
---

# AEM Web Forms vs Adaptive Forms

## 1. Overview

AEM provides two distinct approaches to form authoring. Web Forms (Foundation Forms) are the legacy approach, while Adaptive Forms represent the modern, actively developed solution. Understanding the differences is critical for migration planning from AEM 6.4 to AEM as a Cloud Service with Edge Delivery Services.

---

## 2. Comparative Matrix

| Aspect | Web Forms (Foundation Forms) | Adaptive Forms |
|---|---|---|
| **Architecture** | Built on Foundation Components (Classic/Coral UI) | Built on modern Form Container with Sling Models |
| **Introduced** | AEM 6.0 (legacy) | AEM 6.1+ (actively developed) |
| **Responsive** | No (fixed layout) | Yes (auto-adapts to device/screen) |
| **Schema Support** | Basic (no data binding) | XSD, JSON Schema, Form Data Model, XFA |
| **Rule Editor** | None | Visual rule editor (show/hide, enable/disable, calculate, validate) |
| **Prefill Service** | Not supported | Supported (prefill from CRM, DB, REST) |
| **Submit Actions** | Basic (email, store) | Extensible (REST, workflow, Forms Portal, custom) |
| **Fragments** | Not supported | Reusable form fragments across forms |
| **Themes** | CSS only | Theme editor + client libraries |
| **Document of Record** | Not available | Auto-generated PDF from form |
| **E-Signatures** | Not supported | Adobe Sign integration |
| **Analytics** | Basic | Adobe Analytics integration built-in |
| **Lazy Loading** | No | Yes (loads panels on demand) |
| **Authoring** | Drag and drop components on page | Dedicated form editor with panels/tabs/wizards |
| **Validation** | Client-side only | Client + server-side, pattern-based |
| **Accessibility** | Limited | WCAG 2.0 AA compliant by design |
| **Status** | Deprecated (removed in AEMaaCS) | Active (recommended approach) |

---

## 3. Key Differences in Detail

### 3.1 Layout and Responsiveness

**Web Forms:**
- Fixed-width table/grid layout
- Does not reflow on mobile devices
- Authors must create separate mobile versions or rely on generic zoom behavior
- No panel or section concept — all fields render in a single column or fixed grid

**Adaptive Forms:**
- Fluid panels with responsive grid system
- Authors choose layout patterns: wizard, tabs, accordion, or single panel
- Auto-adjusts to any viewport (mobile, tablet, desktop)
- Supports responsive breakpoints for field arrangement
- Panel-level lazy loading reduces initial page weight

### 3.2 Data Integration

**Web Forms:**
- Store data in CRX repository or send via email
- No structured data model binding
- Custom servlets required for any backend integration
- No pre-fill capability from external systems

**Adaptive Forms:**
- Bind to Form Data Model (FDM) connecting to:
  - REST APIs
  - JDBC databases
  - OData services
  - SOAP web services
- Supports pre-fill from CRM, database, or custom data sources
- Post-submit data operations (create, update, invoke service)
- JSON Schema or XSD-based data binding for structured submissions

### 3.3 Authoring Experience

**Web Forms:**
- Authors drag form components (text field, checkbox, dropdown) onto a page like any other AEM component
- No dedicated form editing interface
- Limited component palette
- No visual preview of form behavior or validation

**Adaptive Forms:**
- Dedicated form editor with:
  - Drag-and-drop into a form container
  - Panel/section organization
  - Repeatable sections (add/remove rows dynamically)
  - File attachment components
  - CAPTCHA integration
  - E-signature fields
  - Date picker, rich text, and custom components
- Real-time preview mode
- Mobile preview within the editor

### 3.4 Business Logic

**Web Forms:**
- Requires custom JSP, Sling servlet, or JavaScript for any conditional logic
- No visual authoring of business rules
- Validation limited to basic required/pattern checks
- Show/hide logic requires developer involvement

**Adaptive Forms:**
- Visual Rule Editor allows authors to create if/then logic without code:
  - "If country = US, show state dropdown"
  - "If order total > $1000, enable free shipping checkbox"
  - "Calculate total from quantity x unit price"
  - "Validate email format before submit"
- Server-side validation rules prevent bypass
- Custom functions can extend rule editor capabilities
- Expression editor for advanced scenarios

### 3.5 Workflow Integration

**Web Forms:**
- Manual integration with AEM Workflows via custom code
- No built-in review/approval routing
- No submission tracking or portal

**Adaptive Forms:**
- Native integration with AEM Workflows:
  - Review and approval flows
  - E-sign routing (Adobe Sign)
  - Multi-step approval chains
- Forms Portal for:
  - Draft saving and resumption
  - Submission tracking
  - Search across submitted forms
- Automated email notifications at each workflow stage

### 3.6 Document of Record

**Web Forms:**
- Not available
- Must manually create PDF templates for record-keeping

**Adaptive Forms:**
- Auto-generated PDF Document of Record from the form layout
- Customizable DOR templates
- Branded output with company logos and formatting
- Useful for compliance, audit trails, and customer confirmation

### 3.7 Accessibility

**Web Forms:**
- Limited ARIA support
- No built-in screen reader optimization
- Tab order not guaranteed
- Error messaging not linked to fields

**Adaptive Forms:**
- WCAG 2.0 AA compliant by design
- Proper ARIA labels and roles
- Keyboard navigable (all interactions)
- Error messages linked to fields via aria-describedby
- Focus management on validation errors
- High-contrast theme support

---

## 4. Migration Context: AEM 6.4 to AEMaaCS (EDS)

### 4.1 Current State Impact

| Consideration | Impact |
|---|---|
| Existing Web Forms | Must be rebuilt — Web Forms (Foundation Components) do not exist in AEMaaCS |
| Existing Adaptive Forms | Can migrate to AEMaaCS Adaptive Forms (Core Components) with the migration utility |
| Custom submit actions | Must be reviewed — some may need refactoring for cloud deployment |
| Form Data Models | Can be recreated in AEMaaCS; cloud-native data sources may differ |
| Workflows attached to forms | Must be rebuilt using AEMaaCS workflow engine |

### 4.2 Target State Options in EDS

| Form Complexity | Recommended Approach | Use Cases |
|---|---|---|
| **Simple** (1–5 fields, no logic) | EDS Form Block (spreadsheet-based) | Contact us, newsletter signup, event registration |
| **Moderate** (5–15 fields, basic logic) | EDS Form Block with custom rules | Quote requests, feedback forms, basic applications |
| **Complex** (multi-step, conditional, data integration) | Adaptive Forms (Core Components) via Universal Editor | Account registration, custom chemical orders, compliance forms, multi-step wizards |
| **Highly regulated** (e-signatures, DOR, audit trail) | Adaptive Forms + Adobe Sign | Legal agreements, medical consent, regulatory submissions |

### 4.3 EDS Form Block

The EDS Form Block provides a lightweight, high-performance approach to forms:

- Form fields defined in a spreadsheet (Google Sheets or SharePoint)
- Rendered as native HTML form elements (fast, accessible)
- Submissions stored in spreadsheet or forwarded via webhook
- No server-side AEM dependency
- Custom validation via JavaScript
- Ideal for lead generation and simple data collection

**Limitations:**
- No visual rule editor
- No Form Data Model binding
- No Document of Record generation
- No native workflow integration
- No form fragments or reuse across forms

### 4.4 Adaptive Forms with Core Components (Universal Editor)

For complex forms requiring business logic, data integration, or compliance features:

- Full rule editor for conditional logic
- Bind to external APIs and databases
- Multi-step wizard with save/resume
- Document of Record generation
- Adobe Sign integration
- Forms Portal for draft/submission management
- Embedded in EDS pages via Universal Editor

---

## 5. Migration Decision Matrix

```
┌─────────────────────────────────────────────────────────┐
│              Form Migration Decision Tree                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Is it a Foundation/Web Form?                           │
│  ├── YES → Must rebuild (not available in AEMaaCS)     │
│  │         ├── Simple? → EDS Form Block                 │
│  │         └── Complex? → Adaptive Forms (Core Comp.)   │
│  │                                                      │
│  Is it an existing Adaptive Form?                       │
│  ├── YES → Use migration utility to Core Components     │
│  │         ├── Review submit actions for cloud compat.  │
│  │         ├── Recreate Form Data Models if needed      │
│  │         └── Rebuild attached workflows               │
│  │                                                      │
│  Is it a new form requirement?                          │
│  └── YES                                                │
│        ├── ≤5 fields, no logic → EDS Form Block         │
│        ├── Conditional logic needed → Adaptive Forms    │
│        ├── E-signatures needed → AF + Adobe Sign        │
│        └── Data integration → AF + Form Data Model      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Thermo Fisher Specific Recommendations

Based on the thermofisher.com site analysis, the following form types were identified:

| Form Type | Current Location | Complexity | Recommended Target |
|---|---|---|---|
| Contact Us | `/home/technical-resources/contact-us.html` | Moderate | EDS Form Block |
| Bulk Chemical Quote | `/home/global/forms/lab-solutions/bulk-fine-chemicals.html` | Complex | Adaptive Forms |
| Bioprocessing Contact | `/home/global/forms/bioprocessing/contact.html` | Moderate | EDS Form Block |
| Event Registration | Various event pages | Simple | EDS Form Block |
| Newsletter Signup | Header/footer | Simple | EDS Form Block |
| Account Registration | `/store/` pages | Complex | Adaptive Forms |
| Custom Product Requests | Various product pages | Complex | Adaptive Forms |
| Download Gated Content | `/home/global/forms/*/download-*.html` | Simple | EDS Form Block |

---

## 7. Summary

| Decision Factor | Choose EDS Form Block | Choose Adaptive Forms |
|---|---|---|
| Number of fields | 1–10 | 10+ |
| Conditional logic | None or minimal | Required |
| Data prefill | Not needed | Required |
| Multi-step wizard | Not needed | Required |
| E-signatures | Not needed | Required |
| Document of Record | Not needed | Required |
| Backend integration | Webhook/spreadsheet sufficient | REST API/database binding needed |
| Performance priority | Maximum (no AEM dependency) | Good (AEM-rendered) |
| Authoring simplicity | Spreadsheet-based | Form editor UI |
| Form reuse (fragments) | Not needed | Required |
| Submission tracking | Basic (spreadsheet) | Full portal with search |
