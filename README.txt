IMAGE FIX - copy these files into the ROOT of your GitHub repo (same level as index.html), replacing the old ones:

  api.js                    (image lookup rewritten)
  config.js                 (new setting IMAGE_MAP; your API_URL is kept)
  exam.html                 (passes the question to the image lookup)
  upload.html               (the image checker now uses the same lookup)
  image-map.json            (NEW - tells the site where every picture really is)
  image-map-report.txt      (NEW - what was matched / not matched, for you to read)
  tools/build_image_map.py  (NEW - rebuilds image-map.json)

Your images folder stays exactly as it is. Nothing is renamed or moved.

After you add or rename pictures:
    python tools/build_image_map.py
then upload the new image-map.json (and image-map-report.txt).

If you ever rename the picture files so every name matches its question, delete image-map.json
and set IMAGE_MAP: "" in config.js so the names are used directly.


GATE Practice upgrade
---------------------
New/updated files:

  subjects.js          Canonical branch taxonomy, reverse topic lookup, empirical
                       subject weights, per-subject 1/2-mark counts and blueprint functions.
  gatepractise.gs      New Apps Script Practice Questions tab handlers, validation,
                       duplicate detection, metadata reads and one-time legacy migration.
  Code.gs              Only the gpMeta/gpGetByIds/gpUpload dispatch routes and setup
                       sheet creation were added. Existing PYQ upload, answer-key,
                       scoring, candidate and Results paths were not rewritten.
  api.js               Practice-bank demo/remote API support, including multi-part uploads.
  index.html           Multi-select Create/Take pickers, custom values, full/custom modes,
                       65-slot full-paper prompts, part splitting and bank assembly.

Apps Script deployment (manual)
-------------------------------
1. Open the Apps Script project used by config.js.
2. Keep the existing Code.gs and add the new gatepractise.gs file alongside it.
3. Replace Code.gs with this repository's updated Code.gs. Do not remove the existing
   project files or change the web-app deployment identity/access settings.
4. Save, then Deploy -> Manage deployments -> Edit -> New version -> Deploy.
   The existing /exec URL should remain unchanged; config.js API_URL is preserved.
5. Open <API_URL>?action=gpMeta. The first call creates the separate Practice Questions
   tab if it does not exist and should return {"meta":[]} when the bank is empty.
6. Upload a small test JSON through the website, then verify the Practice Questions tab.
   Re-upload the same file: duplicate question text should be skipped.
7. If the Practice Questions tab already contains legacy topic-as-subject rows, run
   migrateGpSubjects() manually once from the Apps Script editor. Do not run it on the
   previous-year Questions tab.

The Apps Script deployment is not performed by this ZIP build. Production stays on its
current deployed version until you manually deploy the new version.

Weightage provenance
--------------------
Rebuild the auditable weightage analysis from the bundled PYQ data with:

    node tools/build_practice_weightage.js

This refreshes the analysis JSON and Markdown report. If the PYQ data changes,
review those outputs and synchronize WEIGHT, SUBJECT_COUNTS and TYPE_SHARE in
subjects.js before deployment.

Weights are calculated from the 2019–2026 branch JSON files present in this archive.
The external Google Sheets Questions tab was not included. Coverage caveats and full
subject/type/count tables are in metadata/phase2-weightage-report.md and
metadata/phase2-weightage-analysis.json.

Known qualifications:
- IT weights are a CS proxy because no 2019–2026 IT papers are in this archive.
- 71 DA unlabeled questions were manually classified from question text.
- 28 CE questions and a small number of other legacy/unlabelled records are excluded.
- The GA blueprint is fixed at 10 questions / 15 marks; core is 55 questions / 85 marks.

Validation
----------
See TASK-18-GATE-PRACTICE-UPGRADE.md for the automated checks and remaining manual
checks (Apps Script deployment, real Sheet round-trip and browser/mobile testing).

Public deployment / repository warning
--------------------------------------
The existing config.js contains the deployed Apps Script web-app URL, and Code.gs
contains the Drive folder identifier already present in the original project. The
existing Apps Script web app is configured for public access; anyone with its URL
can call its read/write endpoints, including the new shared Practice Questions API.
This upgrade does not add authentication. Do not publish the ZIP/repository as-is if
you need the backend endpoint or sheet protected; first change the deployment access
model and remove/replace public configuration values using a secure deployment setup.
