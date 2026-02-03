# Feature Specification: Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Indicator for Overdue Items (Priority: P1)

As a user viewing my todo list, I need to immediately see which incomplete todos are past their due date through clear visual indicators (color, styling, or badge), so I can quickly identify urgent tasks without manually checking dates.

**Why this priority**: Core value of the feature - enables quick identification of overdue items at a glance. Without this, users must manually compare each due date against today's date.

**Independent Test**: Can be fully tested by creating todos with past due dates and verifying they display with distinct visual treatment. Delivers immediate value by making overdue status obvious.

**Acceptance Scenarios**:

1. **Given** I have an incomplete todo with a due date of yesterday, **When** I view my todo list, **Then** the todo item is displayed with red text, red border, and an "Overdue" badge
2. **Given** I have an incomplete todo with a due date of today, **When** I view my todo list, **Then** the todo item is displayed normally (not marked as overdue)
3. **Given** I have an incomplete todo with a due date of tomorrow, **When** I view my todo list, **Then** the todo item is displayed normally (not marked as overdue)
4. **Given** I have a completed todo with a due date in the past, **When** I view my todo list, **Then** the todo item is NOT marked as overdue (completion status overrides overdue status)
5. **Given** I have a todo with no due date, **When** I view my todo list, **Then** the todo item is displayed normally (cannot be overdue without a due date)

---

### User Story 2 - Overdue Count Summary (Priority: P2)

As a user, I want to see a count or summary of how many todos are overdue at the top of my list, so I can understand the scope of overdue tasks without scrolling through the entire list.

**Why this priority**: Provides additional context and helps users prioritize, but the core value is delivered by P1 (visual indicators). This enhances the experience but isn't essential for identifying overdue items.

**Independent Test**: Can be tested by creating multiple overdue todos and verifying the count displays accurately. Delivers value by providing an overview of overdue task volume.

**Acceptance Scenarios**:

1. **Given** I have 3 incomplete todos with past due dates, **When** I view my todo list, **Then** I see "3 overdue tasks" displayed in a banner above the todo list
2. **Given** I have 0 incomplete todos with past due dates, **When** I view my todo list, **Then** the overdue banner is not displayed
3. **Given** I complete an overdue todo, **When** the todo list refreshes, **Then** the overdue count decreases by 1
4. **Given** a todo becomes overdue (due date passes while I'm viewing the list), **When** I refresh or reload the page, **Then** the overdue count increases by 1

---

### User Story 3 - Overdue Duration Display (Priority: P3)

As a user viewing an overdue todo, I want to see how many days it's been overdue (e.g., "2 days overdue"), so I can gauge the urgency and how far behind I am on that task.

**Why this priority**: Nice-to-have enhancement that provides additional detail, but not essential for the core functionality. P1 and P2 already enable users to identify and count overdue items.

**Independent Test**: Can be tested by creating todos with various past due dates and verifying the days-overdue calculation is accurate. Adds detail but P1/P2 deliver the core value.

**Acceptance Scenarios**:

1. **Given** I have a todo that was due 1 day ago, **When** I view the todo, **Then** I see "Overdue: 1 day" displayed in the badge
2. **Given** I have a todo that was due 5 days ago, **When** I view the todo, **Then** I see "Overdue: 5 days" displayed in the badge
3. **Given** I have a todo that was due today, **When** I view the todo, **Then** I do not see an overdue badge
4. **Given** the system clock advances past midnight, **When** I refresh my todo list, **Then** overdue durations are recalculated to reflect the new date

---

### Edge Cases

- What happens when a todo's due date is today at a specific time (e.g., 2:00 PM), and it's currently 3:00 PM? (Decision: Use date-only comparison - due date is the entire day, not a specific time)
- What happens when the user's system clock is incorrect or they're in a different timezone? (Decision: Use browser's local date for calculation - date comparison is relative to user's local time)
- What happens when multiple todos have the same past due date? (Decision: All are marked as overdue with equal priority; no special ordering)
- What happens when a user edits a todo's due date from past to future? (Decision: Overdue indicator is removed immediately upon save)
- What happens when there are 100+ overdue todos? (Decision: Count displays normally; no special handling needed - this is a data reality, not an edge case that requires special UI treatment)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST identify a todo as overdue when its due date is before the current date AND the todo is not marked as completed
- **FR-002**: System MUST visually distinguish overdue todos from non-overdue todos using ALL of the following: red text color, red border, and an "Overdue" badge with text label
- **FR-003**: System MUST calculate overdue status using the current date in the user's local timezone
- **FR-004**: System MUST exclude completed todos from overdue status regardless of their due date
- **FR-005**: System MUST exclude todos without a due date from overdue calculations
- **FR-006**: System MUST recalculate overdue status when a todo's completion status changes
- **FR-007**: System MUST recalculate overdue status when a todo's due date is modified
- **FR-008**: System MUST display an overdue count in a dedicated banner/alert section above the todo list with a subtle gray background and red accent border, showing the total number of incomplete todos past their due date; the banner MUST be hidden entirely when the count is 0
- **FR-009**: System MUST update the overdue count when todos are added, completed, deleted, or have their due dates changed
- **FR-010**: System MUST display the number of days a todo is overdue inline within the overdue badge (e.g., "Overdue: 2 days"), calculated as current date minus due date

### Key Entities

- **Todo**: Existing entity with attributes: id, title, dueDate, completed, createdAt
  - New derived attribute: `isOverdue` (boolean, calculated based on dueDate, completed, and current date)
  - New derived attribute: `daysOverdue` (integer, calculated as current date minus due date, only when isOverdue is true)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 2 seconds of viewing the todo list (visual indicators are immediately apparent)
- **SC-002**: 95% of users can correctly identify which todos are overdue without manually checking dates
- **SC-003**: Overdue count accurately reflects the number of incomplete todos with past due dates within 1 second of any status change
- **SC-004**: Overdue status updates immediately (< 500ms) when a user completes a todo or changes its due date
- **SC-005**: Users can see overdue duration (days overdue) for each overdue todo without requiring additional actions or navigation

## Assumptions

- **Date Comparison**: Overdue status is based on date-only comparison (not time-of-day). A todo due "today" is not overdue until tomorrow.
- **Timezone**: All date calculations use the browser's local timezone. No server-side timezone conversion is needed for a single-user application.
- **Visual Design**: Specific colors and styling will follow the existing UI guidelines (Halloween theme with orange/red for overdue indicators).
- **Performance**: Date calculations are performed client-side for each render. With typical todo list sizes (< 100 items), this has negligible performance impact.
- **No Sorting**: This feature does not introduce sorting or filtering. Overdue todos remain in their current position (newest first) but are visually highlighted.

## Out of Scope

- Sorting or filtering todos by overdue status
- Notifications or reminders when a todo becomes overdue
- Snoozing or rescheduling overdue todos
- Bulk actions on overdue todos (e.g., "complete all overdue")
- Historical tracking of how long todos were overdue before completion
- Priority levels or urgency scoring beyond basic overdue status
- Time-of-day due dates (e.g., "due at 3:00 PM today")

## Clarifications

### Session 2026-02-03

- Q: Visual Indicator Style Specificity - Which specific visual treatment should be used for overdue todos? → A: Red text + red border + "Overdue" badge text (strongest visual, multiple cues, most accessible)
- Q: Overdue Count Display Position - Where exactly should the overdue count be displayed? → A: Dedicated banner/alert section above todo list (most prominent)
- Q: Overdue Duration Display Location - Where should the "X days overdue" information be displayed? → A: Inline within the overdue badge (e.g., "Overdue: 2 days")
- Q: Overdue Banner Styling & Color - What styling should be used for the overdue count banner? → A: Subtle gray background with red accent border
- Q: Zero Overdue State Handling - Should the banner display when there are zero overdue tasks? → A: Hide banner entirely when count is 0 (cleaner, no visual clutter)
