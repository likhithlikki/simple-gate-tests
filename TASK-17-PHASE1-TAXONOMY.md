# TASK-17 — GATE Practice Phase 1: Taxonomy (historical checkpoint)

## Original Phase 1 scope

This document records the Phase 1 checkpoint before the subsequent Phase 2–7 implementation. The complete current implementation and final validation status are in `TASK-18-GATE-PRACTICE-UPGRADE.md`.

## Decisions applied

- Subject weightage was to be calculated from previous-year questions.
- The proposed branch subject lists were accepted.
- CS and IT share the same 11 canonical subject names, while retaining branch-specific topic/legacy mappings.
- Unclassifiable legacy labels are retained in `LEGACY_TOPICS` and resolve to the pseudo-subject `Other / Legacy Topics`; they are not counted as canonical syllabus subjects.
- Full-paper assembly uses the shared bank and prefers locally unattempted questions.

## Canonical subject counts

| Branch | Canonical subjects | Original topic labels preserved |
|---|---:|---:|
| EC | 10 | 57 |
| CS | 11 | 96 |
| IT | 11 | 68 |
| DA | 8 | 10 |
| EE | 11 | 66 |
| ME | 5 | 57 |
| CE | 9 | 72 |

All 426 original branch/topic labels from the previous picker remain mapped through the current taxonomy or `LEGACY_TOPICS`.

## Backups

- `backup-before-upgrade/` contains the original uploaded versions of `index.html`, `api.js`, `Code.gs`, and `config.js`.
- `backup-before-phase2-7/` contains the Phase 1 checkpoint files before the remaining upgrade phases.

## Current status

Phase 1 is complete and superseded by the full implementation described in `TASK-18-GATE-PRACTICE-UPGRADE.md`. The temporary `GP_SUBJECTS` compatibility view described in the original checkpoint was removed when the Create/Take UI moved to subject/topic chip pickers.
