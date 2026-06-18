from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

doc = Document()
style = doc.styles['Normal']; style.font.name = 'Calibri'; style.font.size = Pt(11)

def shade(cell, color):
    e = OxmlElement('w:shd'); e.set(qn('w:fill'), color); e.set(qn('w:val'), 'clear')
    cell._tc.get_or_add_tcPr().append(e)

def table(headers, rows, hc='2C3E50'):
    t = doc.add_table(rows=1+len(rows), cols=len(headers)); t.style = 'Table Grid'; t.alignment = WD_TABLE_ALIGNMENT.LEFT
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.text = h
        for p in c.paragraphs:
            for r in p.runs:
                r.bold = True; r.font.size = Pt(9); r.font.color.rgb = RGBColor(255,255,255)
        shade(c, hc)
    for ri, rd in enumerate(rows):
        for ci, cd in enumerate(rd):
            c = t.rows[ri+1].cells[ci]; c.text = str(cd)
            for p in c.paragraphs:
                for r in p.runs: r.font.size = Pt(9)
            if ri % 2 == 0: shade(c, 'F4F6F7')
    return t

def h(text, lvl=1): return doc.add_heading(text, level=lvl)
def bullet(text, bold=None):
    p = doc.add_paragraph(style='List Bullet')
    if bold: rr = p.add_run(bold); rr.bold = True
    p.add_run(text); return p
def num(text, bold=None):
    p = doc.add_paragraph(style='List Number')
    if bold: rr = p.add_run(bold); rr.bold = True
    p.add_run(text); return p
def note(text, label='Note'):
    p = doc.add_paragraph(); r = p.add_run(f'{label}: '); r.bold = True; r.font.color.rgb = RGBColor(41,128,185); p.add_run(text)
def warn(text):
    p = doc.add_paragraph(); r = p.add_run('Important: '); r.bold = True; r.font.color.rgb = RGBColor(192,57,43); p.add_run(text)

# ---------------- TITLE ----------------
for _ in range(4): doc.add_paragraph()
t = doc.add_paragraph(); t.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = t.add_run('Asset Metadata Schema\nRecommendation'); r.bold = True; r.font.size = Pt(28); r.font.color.rgb = RGBColor(44,62,80)
st = doc.add_paragraph(); st.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = st.add_run('Girl Scouts of the USA (girlscoutshop.com)\nAEM Assets as a Cloud Service'); r.font.size = Pt(15); r.font.color.rgb = RGBColor(52,73,94)
doc.add_paragraph()
m = doc.add_paragraph(); m.alignment = WD_ALIGN_PARAGRAPH.CENTER
for line in ['Prepared as: DAM Strategy - Metadata Schema','Date: June 2026','Inputs: WebDAM metadata, DAM Strategy Workbook, Sprint 0 MOM, Strategy Questions, Council Capabilities','Version: 1.0 (Draft for Monday follow-up review)']:
    rr = m.add_run(line+'\n'); rr.font.size = Pt(11)
doc.add_page_break()

# ---------------- TOC ----------------
h('Contents', 1)
for i, x in enumerate(['Executive Summary & Key Recommendation','How Many Schemas? (Best Practice)','Schema Design Principles','Schema 1: GSUSA Default (Master) Schema','Schema 2: Product / Commerce (Light) Schema','Schema 3: Council Schema (Phase 2)','Field Reference - Standard (OOTB) Fields','Field Reference - Custom (girlscouts:) Fields','Taxonomy & Tag Namespaces','Field-to-AEM Property Mapping','Search Facets','Required vs Optional Matrix','Governance & Open Items','Appendix A: Schema Assignment by Folder']):
    doc.add_paragraph(f'{i+1}. {x}', style='List Number')
doc.add_page_break()

# ---------------- 1. EXEC SUMMARY ----------------
h('1. Executive Summary & Key Recommendation', 1)
doc.add_paragraph(
 'This document proposes the asset metadata schema for the Girl Scouts of the USA (GSUSA) AEM Assets '
 'environment supporting girlscoutshop.com. It consolidates the current-state WebDAM metadata, the GSUSA '
 'DAM Strategy Workbook (custom + OOTB fields, taxonomy), and the decisions captured in the Sprint 0 '
 'refinement meeting (MOM, 17 June 2026).')
doc.add_paragraph()
h('Headline Recommendation', 2)
table(['#','Recommendation'], [
 ['1','Implement ONE master "GSUSA Default" metadata schema as the primary schema applied to /content/dam/gsusa.'],
 ['2','Add a SECOND lighter "Product / Commerce" schema for product/commerce assets (girlscoutshop.com SKUs) to keep authoring fast.'],
 ['3','Plan a THIRD "Council" schema for Phase 2 once council-specific requirements firm up. Do not build it yet.'],
 ['4','Drive classification with the girlscouts: tag taxonomy (Product, Campaign, Audience, etc.) - NOT with many schemas.'],
 ['5','Keep required fields to a minimum (Title, Asset Type, Usage Rights, Owner) to protect author adoption at ~20 internal + council + vendor users.'],
])
doc.add_paragraph()
note('This directly reflects the MOM decision: "Start with one default schema. A lighter schema variant may be created for product/commerce-specific assets. Future metadata schemas (council-specific or leaders-tool-specific) can be added as requirements evolve."')
doc.add_page_break()

# ---------------- 2. HOW MANY SCHEMAS ----------------
h('2. How Many Schemas? (Best Practice)', 1)
doc.add_paragraph(
 'A common misconception is that each asset type or folder needs its own metadata schema. In AEM Assets best '
 'practice, the opposite is true: minimize the number of schemas. Schemas define the authoring FORM (which fields '
 'appear in the Properties dialog); classification and filtering are handled by TAGS and field values, not by '
 'multiplying schemas.')
doc.add_paragraph()
h('Why few schemas is best practice', 2)
bullet('Every schema is a maintenance surface - more schemas means more forms to keep consistent as fields evolve.', 'Maintainability: ')
bullet('Authors switching folders should see a familiar, consistent form - reduces training and error.', 'Consistency: ')
bullet('Search/facets work uniformly when fields share property names across assets.', 'Findability: ')
bullet('Schemas are assigned per folder; too many create confusion about which form applies where.', 'Governance: ')
doc.add_paragraph()
h('Recommended number for GSUSA: 2 now, 3 over time', 2)
table(['Schema','When','Applies To','Why separate'], [
 ['GSUSA Default (Master)','Now (Phase 1)','/content/dam/gsusa (all folders by default)','Single comprehensive form covering brand, marketing, photography, curriculum, council-shared assets'],
 ['Product / Commerce (Light)','Now (Phase 1)','Product image folders feeding girlscoutshop.com','Product assets need SKU/commerce fields but few marketing fields - a lighter form speeds bulk product authoring'],
 ['Council (Phase 2)','Later (as requirements evolve)','Per-council folders','Only if councils need council-specific fields beyond the shared set; defer until confirmed'],
])
doc.add_paragraph()
warn('Do NOT create a schema per asset type (image/video/document) or per product category. Use the girlscouts: taxonomy and the Asset Type field for that. Aim for 2-3 schemas total, not dozens.')
doc.add_page_break()

# ---------------- 3. DESIGN PRINCIPLES ----------------
h('3. Schema Design Principles', 1)
num('Reuse OOTB first - use Dublin Core / XMP / IPTC standard fields wherever possible; only add gs: custom fields for genuine business needs.', 'Principle 1: ')
num('Tags over fields - classification (product hierarchy, campaign, audience) lives in the girlscouts: taxonomy, surfaced via tag-type fields.', 'Principle 2: ')
num('Minimal required set - only Title, Asset Type, Usage Rights, and Owner are globally required to protect adoption.', 'Principle 3: ')
num('Consistent property names - the same concept maps to the same jcr:content/metadata property across all schemas.', 'Principle 4: ')
num('Commerce fields isolated - SKU/position/role live in commerce: namespace and appear mainly in the Product schema.', 'Principle 5: ')
num('Localization is metadata-driven - Language field + tag, not a folder-per-language (aligns with the folder-structure addendum).', 'Principle 6: ')
num('Migration-friendly - include Legacy Import Date and Legacy Source System so WebDAM/SharePoint/NetSuite provenance is preserved.', 'Principle 7: ')
doc.add_page_break()

# ---------------- 4. SCHEMA 1 ----------------
h('4. Schema 1: GSUSA Default (Master) Schema', 1)
doc.add_paragraph('The primary schema, assigned to /content/dam/gsusa. Organized into tabs/sections in the AEM Metadata Schema editor.')
doc.add_paragraph()
h('Tab: Basic', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Title','dc:title','Text','Yes','No'],
 ['Description','dc:description','Text','No','No'],
 ['Asset Type','gs:assetType','Dropdown','Yes','No'],
 ['Tags / Keywords','cq:tags','Tag','No','Yes'],
 ['Language','dc:language','Dropdown','No','Yes'],
 ['Created Date','jcr:created (auto)','Date','Auto','No'],
])
h('Tab: Rights & Conditions', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Owner of Asset','gs:owner','Dropdown (GS/External)','Yes','No'],
 ['Usage Rights','xmpRights:UsageTerms','Dropdown','Yes','Yes'],
 ['License Type','gs:rightsLicenseType','Dropdown','No','No'],
 ['Copyright','dc:rights','Text','No','No'],
 ['Photographer / Creator','dc:creator','Text','No','No'],
 ['Rights Notes','photoshop:Instructions','Text','No','No'],
 ['Expiration Date','prism:expirationDate','Date','No','No'],
])
h('Tab: Marketing & Campaign', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Campaign / Project Name','gs:campaign','Tag','No','Yes'],
 ['Campaign Type','gs:campaignType','Tag','No','Yes'],
 ['Campaign Activation Year','gs:campaignYear','Dropdown','No','No'],
 ['Content Type','gs:contentType','Dropdown (Banner/Email/Social/Landing Page)','No','No'],
 ['Marketing Objective','gs:marketingObjective','Tag','No','Yes'],
 ['Promotion Type','gs:promotionType','Tag','No','Yes'],
 ['Seasonal Type','gs:seasonalType','Tag','No','Yes'],
 ['Event Name','gs:eventName','Tag','No','Yes'],
])
h('Tab: Audience & Program', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Audience Role','gs:audienceRole','Dropdown (Girl Scouts/Leaders/Parents/Volunteers)','No','Yes'],
 ['Gender','gs:genderAudience','Dropdown (Women/Men/Unisex)','No','No'],
 ['Program Level','gs:programLevel','Tag (Daisy..Ambassador)','No','Yes'],
 ['Pillars (themes)','gs:pillars','Tag (Entrepreneurship/Life Skills/Outdoors/STEM)','No','Yes'],
 ['Badge Type','gs:badgeType','Tag','No','Yes'],
 ['Highest Award','gs:highestAward','Tag (Bronze/Silver/Gold)','No','Yes'],
 ['Activity','gs:activity','Tag','No','Yes'],
])
h('Tab: Photography & Location', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Photo Shoot Code','gs:photoShootCode','Text','No','No'],
 ['Mood','gs:mood','Dropdown (Adventurous/Solemn/Sporty)','No','Yes'],
 ['Location Type','gs:locationType','Dropdown (Camp/Dream Lab/Office)','No','No'],
 ['Location Name','gs:locationName','Text','No','No'],
 ['City','photoshop:City','Text','No','No'],
 ['State','photoshop:State','Dropdown','No','No'],
])
h('Tab: Council', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Council Asset?','gs:council','Dropdown (Yes/No)','No','No'],
 ['Council ID','gs:councilIds','Text','No','Yes'],
 ['Council Region','gs:councilRegion','Tag','No','Yes'],
])
h('Tab: Migration / Legacy (hidden or admin-only)', 2)
table(['Field (User-facing)','AEM Property','Type','Req','Multi'], [
 ['Legacy Import Date','gs:legacyImportDate','Date','No','No'],
 ['Legacy Source System','gs:legacySourceSystem','Dropdown (WebDAM/SharePoint/NetSuite)','No','No'],
 ['Sync to AEM','gs:syncToAem','Dropdown','No','No'],
])
doc.add_page_break()

# ---------------- 5. SCHEMA 2 ----------------
h('5. Schema 2: Product / Commerce (Light) Schema', 1)
doc.add_paragraph(
 'Assigned to product-image folders that feed girlscoutshop.com. Contains the shared Basic + Rights tabs PLUS a '
 'Commerce tab, and omits the heavier Marketing/Audience/Photography tabs to keep bulk product authoring fast.')
doc.add_paragraph()
h('Tab: Basic (shared)', 2)
table(['Field','AEM Property','Type','Req'], [
 ['Title','dc:title','Text','Yes'],
 ['Description','dc:description','Text','No'],
 ['Asset Type','gs:assetType','Dropdown','Yes'],
 ['Product Category','gs:productCategory','Tag','No'],
 ['Collection','gs:collection','Tag','No'],
])
h('Tab: Commerce', 2)
table(['Field','AEM Property','Type','Req'], [
 ['Eligible for Commerce','commerce:isCommerce','Dropdown (Yes/No)','Yes'],
 ['Product SKU','commerce:skus','Text','No'],
 ['Position','commerce:positions','Number','No'],
 ['Role','commerce:roles','Dropdown','No'],
])
h('Tab: Rights (shared)', 2)
table(['Field','AEM Property','Type','Req'], [
 ['Owner of Asset','gs:owner','Dropdown','Yes'],
 ['Usage Rights','xmpRights:UsageTerms','Dropdown','Yes'],
 ['Expiration Date','prism:expirationDate','Date','No'],
])
note('Shared fields use the SAME AEM property names as the Default schema, so an asset moving between schemas keeps its metadata and remains searchable on the same facets.')
doc.add_page_break()

# ---------------- 6. SCHEMA 3 ----------------
h('6. Schema 3: Council Schema (Phase 2 - Deferred)', 1)
doc.add_paragraph(
 'Recommended only for Phase 2, once council-specific authoring needs are confirmed. Likely identical to the '
 'Default schema with the Council tab promoted and made required, plus any council-only fields. Defer build until '
 'council requirements are validated (open item in Strategy Questions Q13-Q19).')
table(['Candidate Field','AEM Property','Notes'], [
 ['Council ID','gs:councilIds','Promote to required for council-uploaded assets'],
 ['Council Region','gs:councilRegion','Required for council assets'],
 ['Council Asset','gs:council','Default Yes within council folders'],
])
doc.add_page_break()

# ---------------- 7. OOTB FIELDS ----------------
h('7. Field Reference - Standard (OOTB) Fields', 1)
doc.add_paragraph('Reuse these AEM out-of-the-box fields rather than recreating them as custom. Sourced from the workbook Metadata OOTB sheet.')
table(['Field','Standard Property','Namespace','Typical Use'], [
 ['Title','dc:title','Dublin Core','Caption/Title (maps from WebDAM Headline)'],
 ['Description','dc:description','Dublin Core','Long Description (maps from WebDAM Caption/Abstract)'],
 ['Creator','dc:creator','Dublin Core','Photographer/Creator (WebDAM By-line)'],
 ['Rights','dc:rights','Dublin Core','Copyright Notice'],
 ['Language','dc:language','Dublin Core','Language Identifier'],
 ['Keywords / Tags','cq:tags','AEM','Controlled taxonomy tags'],
 ['Usage Terms','xmpRights:UsageTerms','XMP Rights','Asset usage / rights'],
 ['Expiration','prism:expirationDate','PRISM','Valid-to / expiry date'],
 ['Date Created','xmp:CreateDate','XMP','Original creation date'],
 ['Headline','photoshop:Headline','Photoshop','IPTC headline'],
 ['City / State','photoshop:City / photoshop:State','Photoshop','Location'],
 ['Review Status','dam:status','AEM','Approval/review state'],
])
doc.add_page_break()

# ---------------- 8. CUSTOM FIELDS ----------------
h('8. Field Reference - Custom (girlscouts:) Fields', 1)
doc.add_paragraph('Custom fields use the gs: (girlscouts) or commerce: namespace. These were defined/confirmed in the GSUSA workbook.')
table(['User-facing','AEM Property','Format'], [
 ['Asset Type','gs:assetType','Dropdown'],
 ['Owner of Asset','gs:owner','Dropdown (GS/External)'],
 ['License Type','gs:rightsLicenseType','Dropdown'],
 ['Campaign Type','gs:campaignType','Tag'],
 ['Content Type','gs:contentType','Dropdown'],
 ['Marketing Objective','gs:marketingObjective','Tag'],
 ['Promotion Type','gs:promotionType','Tag'],
 ['Seasonal Type','gs:seasonalType','Tag'],
 ['Audience Role','gs:audienceRole','Dropdown'],
 ['Gender','gs:genderAudience','Dropdown'],
 ['Product Category','gs:productCategory','Tag'],
 ['Collection','gs:collection','Tag'],
 ['Eligible for Commerce','commerce:isCommerce','Dropdown'],
 ['Product SKU','commerce:skus','Text'],
 ['Position','commerce:positions','Number'],
 ['Role','commerce:roles','Dropdown'],
 ['Council','gs:council','Dropdown'],
 ['Council Region','gs:councilRegion','Tag'],
 ['Council ID','gs:councilIds','Text'],
 ['Legacy Import Date','gs:legacyImportDate','Date'],
 ['Legacy Source System','gs:legacySourceSystem','Dropdown'],
])
warn('Open item (Strategy Questions Q8/Q9): several dropdown VALUE lists and the productCategory/marketing taxonomy are still incomplete. These must be supplied by GSUSA before schema build.')
doc.add_page_break()

# ---------------- 9. TAXONOMY ----------------
h('9. Taxonomy & Tag Namespaces', 1)
doc.add_paragraph('Classification is driven by the girlscouts: tag taxonomy (workbook Taxonomy v2). Tags - not extra schemas - express the product hierarchy and campaign/audience dimensions.')
table(['Facet','Namespace root','Example'], [
 ['Product','girlscouts:product','girlscouts:product/apparel/t-shirt'],
 ['Campaign','girlscouts:campaign','girlscouts:campaign/volunteer-appreciation'],
 ['Activity','girlscouts:activity','girlscouts:activity/outdoor'],
 ['Subject','girlscouts:subject','girlscouts:subject/stem'],
 ['Channel','girlscouts:channel','girlscouts:channel/social'],
 ['Collection','girlscouts:collection','girlscouts:collection/...'],
 ['Council','girlscouts:council','girlscouts:council/603-alaska'],
 ['Historical','girlscouts:historical','girlscouts:historical/1900-1950 (manually curated)'],
 ['Language','girlscouts:language','girlscouts:language/en'],
])
note('MOM decision: use a single parent campaign tag rather than duplicate tags (the Volunteer Appreciation duplicate was flagged). Historical tags are MANUALLY curated, not date-derived.')
doc.add_page_break()

# ---------------- 10. MAPPING ----------------
h('10. Field-to-AEM Property Mapping (from WebDAM)', 1)
doc.add_paragraph('Migration mapping from current WebDAM fields to the proposed AEM properties.')
table(['WebDAM Field','AEM Property','Schema'], [
 ['Headline (Caption/Title)','dc:title','Default + Product'],
 ['Caption/Abstract (Long Description)','dc:description','Default + Product'],
 ['Campaign/Project Name','gs:campaign','Default'],
 ['Campaign/Project Activation Year','gs:campaignYear','Default'],
 ['Department','gs:department','Default'],
 ['Image Type (Asset Type)','gs:assetType','Default + Product'],
 ['Rights Usage Terms (Asset Usage)','xmpRights:UsageTerms','Default + Product'],
 ['By-line (Photographer)','dc:creator','Default'],
 ['Copyright Notice','dc:rights','Default'],
 ['Special Instructions (Rights Notes)','photoshop:Instructions','Default'],
 ['Event Name','gs:eventName','Default'],
 ['Pillars','gs:pillars','Default'],
 ['City / State','photoshop:City / photoshop:State','Default'],
 ['Language Identifier','dc:language','Default + Product'],
 ['Product SKU Number','commerce:skus','Product'],
])
note('Per Phase 1 recap, the only metadata currently in NetSuite is ALT text; richer metadata lives in WebDAM. ALT text should map to dc:title or the assets accessibility description on import.')
doc.add_page_break()

# ---------------- 11. FACETS ----------------
h('11. Search Facets', 1)
doc.add_paragraph('Recommended search facets (fields marked searchable). Note Strategy Questions Q12: only fields explicitly marked searchable are facets; the legacy Search Facets sheet is disregarded.')
table(['Facet','Property','Tier'], [
 ['File Type','dc:format','OOTB'],
 ['Tags','cq:tags','OOTB'],
 ['Asset Type','gs:assetType','Custom'],
 ['Product Category','gs:productCategory','Custom'],
 ['Campaign','gs:campaign','Custom'],
 ['Content Type','gs:contentType','Custom'],
 ['Audience Role','gs:audienceRole','Custom'],
 ['Usage Rights','xmpRights:UsageTerms','OOTB'],
 ['Language','dc:language','OOTB'],
 ['Council','gs:council / gs:councilRegion','Custom'],
 ['Created Date','jcr:created','OOTB'],
 ['Eligible for Commerce','commerce:isCommerce','Custom'],
])
doc.add_page_break()

# ---------------- 12. REQUIRED MATRIX ----------------
h('12. Required vs Optional Matrix', 1)
doc.add_paragraph('Keeping the globally-required set small protects adoption across ~20 internal users plus council and vendor uploaders.')
table(['Field','Default','Product','Council (P2)'], [
 ['Title','Required','Required','Required'],
 ['Asset Type','Required','Required','Required'],
 ['Owner of Asset','Required','Required','Required'],
 ['Usage Rights','Required','Required','Required'],
 ['Eligible for Commerce','-','Required','-'],
 ['Council ID','Optional','-','Required'],
 ['Council Region','Optional','-','Required'],
 ['Description','Optional','Optional','Optional'],
 ['All other fields','Optional','Optional','Optional'],
])
doc.add_page_break()

# ---------------- 13. GOVERNANCE / OPEN ----------------
h('13. Governance & Open Items', 1)
h('Governance', 2)
bullet('Tag creation restricted to 1-2 admins (per MOM); all authors can apply existing tags.')
bullet('Schema assignment is per folder: Default on /content/dam/gsusa; Product schema on product-image folders.')
bullet('Required-field enforcement validates at upload/properties save.')
bullet('Legacy/migration fields are admin-only or hidden from standard authors.')
h('Open Items to Resolve Before Build', 2)
table(['Ref','Open Item'], [
 ['Q8','Provide missing dropdown values (License Type, Product Data Role, etc.).'],
 ['Q9','Provide missing taxonomy for gs:productCategory and marketing tags.'],
 ['Q10','Confirm Required / Multivalue / Searchable flags for all custom fields.'],
 ['Q11','Confirm: same schema across all asset types/folders? (Recommendation: yes - Default - with Product as the only light variant in Phase 1.)'],
 ['Q20','Confirm whether any language beyond English/Spanish is needed.'],
 ['MOM','GSUSA + Adobe to each review OOTB vs custom fields independently before Monday follow-up.'],
])
doc.add_page_break()

# ---------------- APPENDIX A ----------------
h('Appendix A: Schema Assignment by Folder', 1)
table(['DAM Folder','Assigned Schema'], [
 ['/content/dam/gsusa (root default)','GSUSA Default'],
 ['/content/dam/gsusa/global/brand','GSUSA Default'],
 ['/content/dam/gsusa/products/* (product images)','Product / Commerce (Light)'],
 ['/content/dam/gsusa/marketing','GSUSA Default'],
 ['/content/dam/gsusa/cirriculum','GSUSA Default'],
 ['/content/dam/gsusa/photoshoots','GSUSA Default'],
 ['/content/dam/gsusa/councils/*','GSUSA Default (Council schema in Phase 2)'],
 ['/content/dam/gsusa/vendors/*','GSUSA Default (upload-only access)'],
])
doc.add_paragraph()
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('- End of Document -'); r.italic = True; r.font.color.rgb = RGBColor(127,140,141)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'GSUSA-Asset-Metadata-Schema-Recommendation.docx')
doc.save(out); print('Saved:', out)
