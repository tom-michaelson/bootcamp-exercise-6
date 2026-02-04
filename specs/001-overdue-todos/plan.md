# Implementation Plan: Overdue Todo Items

**Branch**: `001-overdue-todos` | **Date**: 2026-02-04 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add visual indicators and count display for overdue todo items. Todos with past due dates that are incomplete will be marked with red text, red border, and an "Overdue" badge showing days overdue. A banner above the todo list will display the total count of overdue items. All calculations use client-side date comparison in the user's local timezone.

## Technical Context

**Language/Version**: JavaScript (ES6+) with React 18.2.0 and Node.js 16+  
**Primary Dependencies**: React, React DOM, Express.js, axios (frontend HTTP client), better-sqlite3 (backend storage)  
**Storage**: better-sqlite3 (SQLite database via backend API)  
**Testing**: Jest with @testing-library/react for frontend, Jest with supertest for backend  
**Target Platform**: Web application (desktop-focused, modern browsers)
**Project Type**: Web (monorepo with frontend and backend packages)  
**Performance Goals**: < 500ms for overdue status updates, < 2s for initial render with visual indicators  
**Constraints**: Date-only comparison (no time-of-day), client-side calculation for typical list sizes (< 100 items)  
**Scale/Scope**: Single-user application, typical todo lists < 100 items, no pagination required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with all constitutional principles before proceeding:

- [x] **Test-First Development**: Tests will be written before implementation for overdue logic, TodoCard updates, and OverdueBanner component following TDD cycle. Quickstart.md documents TDD approach (Red-Green-Refactor).
- [x] **Code Quality**: DRY principle applied by extracting date comparison logic to dateUtils.js utility; KISS maintained by keeping calculations client-side with native Date API; error handling not critical (date operations are deterministic).
- [x] **Single Responsibility**: dateUtils.js handles date logic; TodoCard displays overdue state; OverdueBanner displays count; TodoList orchestrates; each has single purpose.
- [x] **Code Style Standards**: Will follow existing camelCase (functions/variables), PascalCase (components) conventions; ESLint rules enforced; consistent with existing codebase patterns.
- [x] **User-Centric Simplicity**: Clear user value (P1: visual indicators, P2: count, P3: days); YAGNI applied (no sorting/filtering/notifications/backend changes); each user story independently testable.

**Post-Design Re-evaluation**: All checks still pass. Design confirmed:
- ✅ No backend changes (YAGNI)
- ✅ Native Date API (no unnecessary dependencies)
- ✅ Derived state (no sync issues)
- ✅ Multiple new test files with comprehensive coverage
- ✅ CSS classes consistent with existing theme

*All checks pass. No constitutional violations.*

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── todoService.js      # No changes needed (backend data model unchanged)
│   │   ├── app.js
│   │   └── index.js
│   └── __tests__/
│       └── app.test.js
├── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoCard.js         # UPDATE: Add overdue visual styling
    │   │   ├── OverdueBanner.js    # NEW: Display overdue count
    │   │   ├── TodoList.js         # UPDATE: Include OverdueBanner
    │   │   └── __tests__/
    │   │       ├── TodoCard.test.js    # UPDATE: Add overdue tests
    │   │       ├── OverdueBanner.test.js # NEW: Test count display
    │   │       └── TodoList.test.js     # UPDATE: Test banner integration
    │   ├── utils/
    │   │   ├── dateUtils.js        # NEW: Overdue calculation logic
    │   │   └── __tests__/
    │   │       └── dateUtils.test.js    # NEW: Test date logic
    │   ├── App.js
    │   └── App.css                 # UPDATE: Add overdue styles
    └── __tests__/
        └── App.test.js
```

**Structure Decision**: Web application structure (Option 2) selected. This feature is frontend-focused with UI changes only. Backend requires no modifications as the Todo data model (id, title, dueDate, completed, createdAt) already contains all necessary fields. Overdue status is calculated client-side.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Complexity Tracking

> **No constitutional violations - this section is empty**

All constitutional checks passed. No additional complexity or justification needed.
