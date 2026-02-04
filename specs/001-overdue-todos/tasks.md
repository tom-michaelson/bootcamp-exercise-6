# Tasks: Overdue Todo Items

**Feature**: 001-overdue-todos  
**Branch**: `001-overdue-todos`  
**Input**: Design documents from `/specs/001-overdue-todos/`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a web application with:
- Frontend: `packages/frontend/src/`
- Backend: No changes needed for this feature
- All tasks are frontend-focused

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure development environment is ready

- [ ] T001 Verify branch is 001-overdue-todos and environment is running
- [ ] T002 Confirm frontend tests pass at baseline: npm test --workspace=frontend
- [ ] T003 [P] Review plan.md, spec.md, data-model.md, and quickstart.md

**Checkpoint**: Environment ready, requirements understood

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create packages/frontend/src/utils/dateUtils.js with isOverdue and getDaysOverdue functions
- [ ] T005 Create packages/frontend/src/utils/__tests__/dateUtils.test.js with comprehensive test cases
- [ ] T006 Run tests for dateUtils: npm test --workspace=frontend dateUtils
- [ ] T007 [P] Add CSS variables for overdue styling in packages/frontend/src/App.css (danger color)

**Checkpoint**: Foundation ready - date utilities tested and available, user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Indicator for Overdue Items (Priority: P1) 🎯 MVP

**Goal**: Display red text, red border, and "Overdue: X days" badge on incomplete todos with past due dates

**Independent Test**: Create todos with past due dates and verify they display with red styling and overdue badge. Complete a todo and verify overdue indicator disappears.

### Tests for User Story 1 (TDD - Write First)

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Add test case to packages/frontend/src/components/__tests__/TodoCard.test.js: overdue todo displays red styling and badge
- [ ] T009 [P] [US1] Add test case to packages/frontend/src/components/__tests__/TodoCard.test.js: completed overdue todo does NOT show overdue styling
- [ ] T010 [P] [US1] Add test case to packages/frontend/src/components/__tests__/TodoCard.test.js: todo due today is NOT overdue
- [ ] T011 [P] [US1] Add test case to packages/frontend/src/components/__tests__/TodoCard.test.js: todo with no due date is NOT overdue
- [ ] T012 [P] [US1] Add test case to packages/frontend/src/components/__tests__/TodoCard.test.js: badge shows correct days count (singular/plural)
- [ ] T013 [US1] Run TodoCard tests to verify they FAIL: npm test --workspace=frontend TodoCard

### Implementation for User Story 1

- [ ] T014 [US1] Update packages/frontend/src/components/TodoCard.js to import dateUtils functions
- [ ] T015 [US1] Update packages/frontend/src/components/TodoCard.js to calculate isOverdue and daysOverdue
- [ ] T016 [US1] Update packages/frontend/src/components/TodoCard.js to apply 'overdue' CSS class conditionally
- [ ] T017 [US1] Update packages/frontend/src/components/TodoCard.js to render overdue badge with days count when isOverdue is true
- [ ] T018 [US1] Add .todo-card.overdue and .overdue-badge CSS rules in packages/frontend/src/App.css
- [ ] T019 [US1] Run TodoCard tests to verify they PASS: npm test --workspace=frontend TodoCard
- [ ] T020 [US1] Manual verification: npm start and test with various overdue scenarios

**Checkpoint**: User Story 1 complete - overdue todos display with visual indicators independently testable

---

## Phase 4: User Story 2 - Overdue Count Summary (Priority: P2)

**Goal**: Display a count banner above the todo list showing "X overdue tasks" (hidden when count is 0)

**Independent Test**: Create multiple overdue todos and verify count displays correctly. Complete todos and verify count updates. Verify banner is hidden when no overdue todos exist.

### Tests for User Story 2 (TDD - Write First)

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T021 [P] [US2] Create packages/frontend/src/components/__tests__/OverdueBanner.test.js with test: displays count when count > 0
- [ ] T022 [P] [US2] Add test case to OverdueBanner.test.js: returns null when count is 0
- [ ] T023 [P] [US2] Add test case to OverdueBanner.test.js: displays correct singular/plural text ("task" vs "tasks")
- [ ] T024 [P] [US2] Add test cases to packages/frontend/src/components/__tests__/TodoList.test.js: calculates overdueCount correctly
- [ ] T025 [P] [US2] Add test case to TodoList.test.js: renders OverdueBanner with correct count
- [ ] T026 [P] [US2] Add test case to TodoList.test.js: OverdueBanner is rendered above todo cards
- [ ] T027 [US2] Run OverdueBanner and TodoList tests to verify they FAIL: npm test --workspace=frontend OverdueBanner TodoList

### Implementation for User Story 2

- [ ] T028 [P] [US2] Create packages/frontend/src/components/OverdueBanner.js component with count prop
- [ ] T029 [P] [US2] Implement OverdueBanner.js to display count with proper singular/plural text
- [ ] T030 [P] [US2] Implement OverdueBanner.js to return null when count is 0
- [ ] T031 [US2] Add .overdue-banner and .overdue-banner-text CSS rules in packages/frontend/src/App.css
- [ ] T032 [US2] Update packages/frontend/src/components/TodoList.js to import OverdueBanner and dateUtils
- [ ] T033 [US2] Update TodoList.js to calculate overdueCount by filtering todos array
- [ ] T034 [US2] Update TodoList.js to render OverdueBanner above todo cards with count prop
- [ ] T035 [US2] Run OverdueBanner and TodoList tests to verify they PASS: npm test --workspace=frontend OverdueBanner TodoList
- [ ] T036 [US2] Manual verification: npm start and test count display with various scenarios

**Checkpoint**: User Stories 1 AND 2 complete - visual indicators and count banner both work independently

---

## Phase 5: User Story 3 - Overdue Duration Display (Priority: P3)

**Goal**: Display "Overdue: X days" in the badge (already implemented in US1, verify and enhance if needed)

**Independent Test**: Create todos with various past due dates and verify days-overdue calculation displays correctly in badges.

### Verification for User Story 3

> **NOTE**: Core functionality implemented in User Story 1. This phase verifies edge cases.

- [ ] T037 [P] [US3] Add test case to packages/frontend/src/utils/__tests__/dateUtils.test.js: 1 day overdue calculates correctly
- [ ] T038 [P] [US3] Add test case to dateUtils.test.js: 5 days overdue calculates correctly
- [ ] T039 [P] [US3] Add test case to dateUtils.test.js: edge case for leap year boundary
- [ ] T040 [P] [US3] Add test case to dateUtils.test.js: edge case for month boundary
- [ ] T041 [US3] Run dateUtils tests to verify edge cases: npm test --workspace=frontend dateUtils
- [ ] T042 [US3] Manual verification: npm start and test with todos 1, 5, 30+ days overdue

**Checkpoint**: All user stories (US1, US2, US3) are independently functional with comprehensive edge case coverage

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and improvements

- [ ] T043 [P] Run full test suite: npm test
- [ ] T044 [P] Verify test coverage meets 80% threshold: npm test -- --coverage
- [ ] T045 [P] Run ESLint and fix any errors: npm run lint --workspace=frontend (if script exists)
- [ ] T046 Verify all acceptance scenarios from spec.md manually
- [ ] T047 Test accessibility: verify screen readers announce overdue status
- [ ] T048 Test dark mode compatibility (if applicable)
- [ ] T049 Performance check: verify overdue calculations are fast with 50+ todos
- [ ] T050 Review quickstart.md and verify all examples work
- [ ] T051 Final manual testing: complete user journey through all scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories CAN proceed in parallel once Phase 2 is done
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends only on Foundational (Phase 2) - Can start in parallel with US1, but references TodoCard from US1
- **User Story 3 (P3)**: Already integrated into US1 - This phase adds edge case verification only

### Within Each User Story

1. Tests MUST be written FIRST and FAIL
2. Implementation follows TDD Red-Green-Refactor cycle
3. Tests MUST PASS before moving to next task
4. Manual verification before marking story complete

### Parallel Opportunities

**Within Foundational (Phase 2)**:
- T007 (CSS variables) can run in parallel with T004-T006 (dateUtils)

**Within User Story 1 Tests**:
- T008, T009, T010, T011, T012 can all be written in parallel

**Within User Story 2 Tests**:
- T021, T022, T023 (OverdueBanner tests) can run in parallel
- T024, T025, T026 (TodoList tests) can run in parallel
- OverdueBanner tests and TodoList tests are independent

**Within User Story 2 Implementation**:
- T028, T029, T030 (OverdueBanner component) can be developed in parallel with T031 (CSS)

**Within User Story 3**:
- T037, T038, T039, T040 (edge case tests) can all be written in parallel

**Across User Stories** (if multiple developers):
- Once Foundational complete, US1, US2, US3 can all start in parallel
- US2 should wait for US1's TodoCard updates before T032-T034 (TodoList integration)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (T008-T012):
Task: "Add overdue styling test to TodoCard.test.js"
Task: "Add completed overdue test to TodoCard.test.js"
Task: "Add due today test to TodoCard.test.js"
Task: "Add no due date test to TodoCard.test.js"
Task: "Add days count test to TodoCard.test.js"

# Then verify all fail (T013):
Task: "Run TodoCard tests to verify they FAIL"

# Implementation can proceed serially through T014-T018
# CSS can be done in parallel (T018)
```

---

## Parallel Example: User Story 2

```bash
# Launch OverdueBanner tests together (T021-T023):
Task: "Add count display test to OverdueBanner.test.js"
Task: "Add hidden when zero test to OverdueBanner.test.js"
Task: "Add singular/plural test to OverdueBanner.test.js"

# Launch TodoList tests together (T024-T026):
Task: "Add overdueCount calculation test to TodoList.test.js"
Task: "Add banner rendering test to TodoList.test.js"
Task: "Add banner position test to TodoList.test.js"

# Component and CSS can be developed in parallel (T028-T031)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T007) - CRITICAL
3. Complete Phase 3: User Story 1 (T008-T020)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - MVP delivers core value!

**MVP Delivers**: Visual indicators for overdue todos - users can immediately see which tasks are overdue

### Incremental Delivery

1. Setup + Foundational (T001-T007) → Foundation ready
2. User Story 1 (T008-T020) → Test independently → **Deploy MVP!**
3. User Story 2 (T021-T036) → Test independently → Deploy enhanced version
4. User Story 3 (T037-T042) → Test independently → Deploy complete version
5. Polish (T043-T051) → Final validation → Production ready

### Parallel Team Strategy

With 2-3 developers:

1. **Together**: Complete Setup + Foundational (T001-T007)
2. **Once Foundational is done**:
   - Developer A: User Story 1 (T008-T020)
   - Developer B: User Story 2 tests (T021-T027), wait for US1 TodoCard, then implementation (T028-T036)
   - Developer C: Can start User Story 3 tests (T037-T040) or help with US1/US2
3. Stories integrate smoothly as US2 builds on US1 foundation

---

## Task Summary

- **Total Tasks**: 51 tasks
- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 4 tasks (blocks all user stories)
- **Phase 3 (User Story 1 - P1)**: 13 tasks (7 tests + 6 implementation + verification)
- **Phase 4 (User Story 2 - P2)**: 16 tasks (7 tests + 9 implementation + verification)
- **Phase 5 (User Story 3 - P3)**: 6 tasks (5 tests + 1 verification)
- **Phase 6 (Polish)**: 9 tasks

- **Parallelizable Tasks**: 24 tasks marked [P]
- **User Story Labels**: US1 (13 tasks), US2 (16 tasks), US3 (6 tasks)

### MVP Scope (Recommended)
**Just User Story 1**: 20 tasks total (T001-T020)
- Delivers core value: Visual indicators for overdue todos
- Independently testable and deployable
- Foundation for US2 and US3

---

## Notes

- **TDD Mandatory**: Tests written first per constitution requirement
- **[P] tasks**: Different files, no dependencies, can run in parallel
- **[Story] labels**: Map tasks to user stories for traceability
- Each user story is independently completable and testable
- Backend requires NO changes - all frontend work
- Verify tests fail before implementing (Red-Green-Refactor)
- Manual verification at each checkpoint
- Stop at any checkpoint to validate story independently
