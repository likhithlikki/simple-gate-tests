# TASK-18 — GATE Practice upgrade (Phases 1–7)

## Implemented

- **Phase 1 — Taxonomy:** `subjects.js` defines EC, CS, IT, DA, EE, ME and CE subject/topic groupings, `LEGACY_TOPICS`, `TOPIC_TO_SUBJECT`, and `SUBJECTS_BY_BRANCH`. The obsolete topic-as-subject `GP_SUBJECTS` view has been removed from active source.
- **Phase 2 — Weightage:** `WEIGHT`, `SUBJECT_COUNTS`, `TYPE_SHARE`, and `WEIGHTAGE_SOURCE` are populated from the included 2019–2026 PYQ JSON archive. See `metadata/phase2-weightage-report.md` for per-branch values and caveats. `tools/build_practice_weightage.js` reproduces the analysis JSON, including the explicit DA question-ID review overrides.
- **Phase 3 — Multi-select UI:** reusable `makePicker()` supports search, select-all, clear, grouped topics, counts, custom subjects/topics, de-duplication, trimming and 80-character limits. Create and Take both use it.
- **Phase 4 — Blueprint:** `spreadTopics`, `spreadTypes`, `spreadMarks`, `customBlueprint`, `fullBlueprint`, and `splitParts` are implemented in `subjects.js`.
- **Phase 5 — Prompt builder:** custom tests support up to 65 questions and split into parts of at most 20. Full tests generate four parts of at most 17 slots. Each part has its own copy action and slot table.
- **Phase 6 — Backend/API:** `gatepractise.gs` implements the separate Practice Questions sheet, 100-question upload cap, validation, duplicate detection, metadata reads, ID-based reads and `migrateGpSubjects()`. `Code.gs` routes only the three practice actions and initializes the new tab. `api.js` supports the same data contract in demo mode.
- **Phase 7 — Full-paper assembly:** Take mode can assemble a 65-slot paper from the shared practice bank, match subject/marks and prefer type/topic matches, prefer locally unattempted IDs, and report shortages with an explicit “Use available questions” action.

## Automated checks performed

- JavaScript syntax checks passed for `subjects.js`, `api.js`, `Code.gs`, `gatepractise.gs`, and the inline script in `index.html`.
- 1,000 randomized full-paper runs per branch passed; additional custom spread, type, marks, subject-coverage and part-splitting checks passed.
- For every branch, `fullBlueprint(branch)` returned exactly 65 questions, 30 one-mark questions, 35 two-mark questions, 100 total marks and 10 GA questions.
- For every branch, `WEIGHT[branch]` totals exactly 85; `SUBJECT_COUNTS[branch]` totals exactly 25 one-mark and 30 two-mark core slots; and each subject satisfies `one + 2 × two = WEIGHT[subject]`. `TYPE_SHARE[branch]` sums to 1.
- Topic lookup uniqueness passed; all 426 original branch/topic labels from the previous picker remain mapped through `TOPIC_TO_SUBJECT` or `LEGACY_TOPICS`.
- Existing `exam.html`, `upload.html`, `config.js`, `style.css`, images, PYQ JSON files, `image-map.json` and the previous-year exam UI were not changed in this upgrade.

## Important provenance and limitations

- The uploaded archive does not contain the remote Google Sheets `Questions` tab. Weightage was therefore derived from the included JSON bank, not directly from the live sheet.
- IT has no 2019–2026 papers in its local archive; CS weights are used as an explicit proxy.
- 71 DA records with blank topic labels were classified from question text; this is a manual inference documented in the Phase 2 report.
- 28 CE records and small numbers of legacy/unlabelled records in other branches are excluded from subject weights.
- The local browser's attempted-question IDs are used for freshness preference. This preference is per browser/candidate and is not synchronized across devices.
- Full-paper assembly only has as many questions as the shared bank contains. Shortages are shown; “Use available questions” creates a partial paper and does not pretend it is a complete 100-mark paper.
- The existing Apps Script web app is public-access and the repository contains its URL in `config.js`; anyone with the URL can read/write the shared bank. This upgrade does not add authentication.

## Deployment and manual verification still required

The Apps Script deployment was not changed. To activate the remote practice bank, add `gatepractise.gs` to the existing Apps Script project, replace `Code.gs` with this version, and deploy a **New version** of the existing web app. Then verify `?action=gpMeta`, upload a test part, confirm the Practice Questions sheet rows, and re-upload to test duplicate skipping.

Manual browser/mobile interaction tests and a live Google Sheets round-trip cannot be executed in this container. Run them after deployment. Do not change the previous-year answer-key/scoring paths as part of this activation.
