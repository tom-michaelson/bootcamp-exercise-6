# Research: Overdue Todo Items

**Feature**: 001-overdue-todos  
**Date**: 2026-02-04  
**Status**: Complete

## Overview

Research findings for implementing overdue todo indicators. This feature is frontend-only with client-side date calculations. No backend changes required.

## Key Research Areas

### 1. JavaScript Date Comparison

**Decision**: Native Date API with date-only comparison (ignore time-of-day)

**Rationale**:
- No external dependencies needed (moment.js, date-fns unnecessary for simple comparison)
- Date-only comparison: normalize both dates to midnight
- Browser local timezone is correct context for user

**Implementation**:
```javascript
function isOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return due < now;
}
```

**Alternatives Considered**:
- date-fns: Unnecessary dependency
- moment.js: Deprecated, large bundle
- String comparison: Error-prone with timezones

### 2. React Conditional Styling

**Decision**: CSS classes with theme variables

**Rationale**:
- Consistent with existing codebase (CSS files, no CSS-in-JS)
- Halloween theme already defines color variables
- Maintainable: CSS separate from component logic

**Pattern**:
```javascript
<div className={`todo-card ${isOverdue ? 'overdue' : ''}`}>
```

**Alternatives Considered**:
- Inline styles: Less maintainable
- styled-components: New dependency
- CSS modules: Inconsistent with existing code

### 3. Derived State vs Stored State

**Decision**: Calculate overdue status during render

**Rationale**:
- Overdue is derived from existing data (dueDate, completed, current date)
- Performance acceptable for < 100 items
- No synchronization issues
- Simpler code

**Alternatives Considered**:
- Stored state: Adds complexity, sync issues
- useMemo: Premature optimization
- Backend calculation: Adds latency, duplicates logic

### 4. Testing Date-Dependent Code

**Decision**: Dependency injection of currentDate parameter

**Rationale**:
- Deterministic tests without mocking system clock
- Simple to test edge cases
- No jest.useFakeTimers complexity

**Pattern**:
```javascript
// Production
isOverdue(todo.dueDate) // uses new Date()

// Tests
isOverdue(todo.dueDate, new Date('2026-02-04')) // controlled date
```

### 5. Accessibility

**Decision**: Multiple visual cues (color + text + border)

**Rationale**:
- WCAG compliance: color alone insufficient for colorblind users
- "Overdue" text label provides semantic meaning
- Red border adds non-color visual distinction
- Screen readers announce badge text

**Pattern**:
```javascript
<span className="overdue-badge" role="status">
  Overdue: {days} {days === 1 ? 'day' : 'days'}
</span>
```

## Technology Decisions

| Area | Choice | Why |
|------|--------|-----|
| Date library | Native JS Date | Sufficient, no dependencies |
| Styling | CSS classes | Existing pattern |
| State | Derived/calculated | Simple, no sync issues |
| Testing | Dependency injection | Deterministic |
| Accessibility | Multi-cue indicators | WCAG compliant |

## Resolved Questions

All technical unknowns from plan.md resolved:
- ✅ Date comparison approach defined
- ✅ React patterns identified
- ✅ Testing strategy clarified
- ✅ Accessibility requirements met
- ✅ No backend changes confirmed
