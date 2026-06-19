import csv, os, re, unicodedata
import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))

# ---------------------------------------------------------------
# 1) Permission Matrix - Summary CSV
# ---------------------------------------------------------------
summary_headers = ['User Type','Internal / External','Authentication','Access Method',
 'Allowed Activities in Adobe Assets','Folder-Level Permissions','Tag/Metadata Rights',
 'Approx. Users','Notes / Decisions (per MOM)']
summary_rows = [
 ['GSUSA Content Creators','Internal','Okta (SSO)','Direct AEM Assets',
  'Create/upload assets, update & delete assets, modify metadata, apply tags. Full superset access.',
  'Full read/write/create/delete on ALL /content/dam/gsusa folders.',
  'Apply existing tags + metadata. Create new tags: NO (admin-only).','~20 (confirm vs license)',
  'Full superset access to all DAM folders.'],
 ['GSUSA Content Managers','Internal','Okta (SSO)','Direct AEM Assets',
  'Create/update assets & metadata in Marketing; view-only elsewhere; apply tags.',
  'Full read/write on /content/dam/gsusa/marketing. View-only on all other folders.',
  'Apply existing tags. Create new tags: NO.','Subset of internal',
  'Write limited to Marketing; some folders may be hidden.'],
 ['GSUSA Content Users','Internal','Okta (SSO)','Direct AEM Assets / Content Hub',
  'Search, view, and download assets only.',
  'Read + download on all folders (except restricted GSUSA folders).',
  'None (read-only).','Largest internal group','View/download consumers; no edit rights.'],
 ['Admin / IT','Internal','Okta (SSO)','Direct AEM Assets (admin)',
  'Manage users, groups, permissions/ACLs, folder structure, schemas, processing profiles, audit.',
  'Full access (incl. Read-ACL / Edit-ACL / Replicate) on all folders.',
  'Create/manage tags, schemas, taxonomy. Tag creation restricted to 1-2 admins.','1-2',
  'Only admins create new tags & manage configuration.'],
 ['Council Collaborators','External','Okta (separate domain)','Content Hub (no direct AEM)',
  'Upload council-specific assets, update metadata, apply tags on own assets, submit for approval; view/download shared GSUSA assets.',
  'Full RWCD within own council folder only. View shared GSUSA folders. Cannot view other councils.',
  'Apply/update tags + metadata on own council assets. Create new tags: NO.',
  '>=1, likely 2-3 per council','Okta separate domain. No direct AEM. Council 100 shared-readable. Adobe to confirm CH upload.'],
 ['Vendor / Drop-ship Partners','External','Okta (separate domain)','Adobe Commerce (not AEM)',
  'Upload product images/files for their own products via Adobe Commerce only.',
  'Restricted to their own vendor folder. No access to other DAM areas.',
  'Minimal (metadata on own product assets).','2-3 trusted partners',
  'Dedicated vendor folder. Daria reviews offline before approved upload; no AEM review workflow.'],
 ['Agency Partners','External','Okta (separate domain)','Content Hub / assigned',
  'Download select assigned folders only.','Read + download on selected assigned folders only.',
  'None.','Few','Download-only of assigned folders.'],
 ['Creative Partners','External','Okta (separate domain)','Staging folder / Creative Cloud integration',
  'Upload finished assets to a staging folder only.','Restricted to their own staging folder (upload + read).',
  'Minimal (metadata on own uploads).','2-3',
  'Assets created outside & uploaded. Adobe CC (Photoshop) integration available. Approved assets only.'],
]
with open(os.path.join(HERE,'GSUSA-Permission-Matrix-Summary.csv'),'w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(summary_headers); w.writerows(summary_rows)

# ---------------------------------------------------------------
# 2) AEM Group / ACL Matrix CSV
# ---------------------------------------------------------------
acl_headers=['AEM Group','Maps to User Type','Path (jcr)','Read','Modify','Create','Delete',
 'Read ACL','Edit ACL','Replicate','Notes']
acl_rows=[
 ['gsusa-content-creators','GSUSA Content Creators','/content/dam/gsusa','R','M','C','D','','','REPL','Full superset on all folders'],
 ['gsusa-content-managers','GSUSA Content Managers','/content/dam/gsusa/marketing','R','M','C','D','','','REPL','Write only on marketing'],
 ['gsusa-content-managers','GSUSA Content Managers','/content/dam/gsusa','R','','','','','','','View-only on all other folders'],
 ['gsusa-content-users','GSUSA Content Users','/content/dam/gsusa','R','','','','','','','Read + download only'],
 ['gsusa-dam-admins','Admin / IT','/','R','M','C','D','R-ACL','E-ACL','REPL','Full admin incl. ACL + replicate'],
 ['gsusa-tag-admins','Admin / IT (1-2)','/content/cq:tags/girlscouts','R','M','C','D','','','','Tag creation restricted to 1-2'],
 ['council-{code}-collaborators','Council Collaborators','/content/dam/gsusa/councils/{code}','R','M','C','D','','','','Full within OWN council folder (one group per council)'],
 ['council-{code}-collaborators','Council Collaborators','/content/dam/gsusa/global','R','','','','','','','View shared GSUSA global assets'],
 ['council-{code}-collaborators','Council Collaborators','/content/dam/gsusa/products','R','','','','','','','View shared product assets'],
 ['council-{code}-collaborators','Council Collaborators','/content/dam/gsusa/marketing','R','','','','','','','View shared marketing assets'],
 ['council-{code}-collaborators','Council Collaborators','/content/dam/gsusa/councils/100','R','','','','','','','Girl Scout Central (GSUSA-owned, shared read)'],
 ['vendor-{name}','Vendor / Drop-ship','/content/dam/gsusa/vendors/{name}','R','M','C','','','','','Own vendor folder only; primary path is Commerce'],
 ['agency-{name}','Agency Partners','/content/dam/gsusa/{assigned}','R','','','','','','','Download-only, assigned folders'],
 ['creative-{name}','Creative Partners','/content/dam/gsusa/staging/{name}','R','M','C','','','','','Upload to own staging folder only'],
]
with open(os.path.join(HERE,'GSUSA-Permission-Matrix-ACL.csv'),'w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(acl_headers); w.writerows(acl_rows)

# ---------------------------------------------------------------
# 3) Per-Council Group Naming List (all councils)
# ---------------------------------------------------------------
def slug(s):
    s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode('ascii')
    s=s.lower(); s=re.sub(r"[''`]","",s); s=re.sub(r'[^a-z0-9]+','-',s); return s.strip('-')

# read councils from folder structure
src=os.path.join(REPO,'docs','SDD','GSUSA-DAM.xlsx')
wb=openpyxl.load_workbook(src, data_only=True)
ws=wb['Folder Structure']
councils=[]
for r in range(120,239):
    v=ws.cell(r,5).value
    if v and str(v).strip():
        m=re.match(r'^(\d+)\s+(.*)$', str(v).strip())
        if m: councils.append((m.group(1), m.group(2)))

cl_headers=['Council Code','Council Name','AEM Group Name','Council Folder Path','Folder Type','Notes']
cl_rows=[]
for code,name in councils:
    folder=f'/content/dam/gsusa/councils/{code}-{slug(name)}'
    if code=='100':
        cl_rows.append([code,name,'(no council group - GSUSA-owned)',folder,'GSUSA-owned (shared read to all councils)','Treated as GSUSA folder, not a council (MOM). Managed by GSUSA Content Creators.'])
    else:
        grp=f'council-{code}-collaborators'
        cl_rows.append([code,name,grp,folder,'Council','Full RWCD within own folder; view shared GSUSA folders.'])
with open(os.path.join(HERE,'GSUSA-Council-Group-Naming-List.csv'),'w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(cl_headers); w.writerows(cl_rows)

print('Summary rows:',len(summary_rows))
print('ACL rows:',len(acl_rows))
print('Council rows:',len(cl_rows))
print('Sample council groups:')
for row in cl_rows[:5]: print('  ',row[0],row[2],row[3])
