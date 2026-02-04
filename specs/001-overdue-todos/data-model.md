# Data Model: Overdue Todo Items

**Feature**: 001-overdue-todos  
**Date**: 2026-02-04

## Overview

This feature adds no new entities or persistent fields. Overdue status is a derived/calculated property based on existing Todo fields.

## Entities

### Todo (Existing - No Changes)

**Stored Fields** (backend database):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| title | string | Yes | Todo description (max 255 chars) |
| dueDate | string (ISO 8601) | No | Due date in YYYY-MM-DD format |
| completed | boolean | Yes | Completion status |
| createdAt | string (ISO 8601) | Yes | Creation timestamp |

**Derived Fields** (calculated client-side, not stored):

| Field | Type | Calculation | Description |
|-------|------|-------------|-------------|
| isOverdue | boolean | `!completed && dueDate < currentDate` | Whether todo is overdue |
| daysOverdue | integer | `currentDate - dueDate` (in days) | Number of days past due date (0 if not overdue) |

## Calculation Rules

### isOverdue

```javascript
function calculateIsOverdue(todo, currentDate = new Date()) {
  // Not overdue if completed
  if (todo.completed) return false;
  
  // Not overdue if no due date
  if (!todo.dueDate) return false;
  
  // Date-only comparison (ignore time)
  const due = new Date(todo.dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}
```

**Rules**:
- Completed todos are NEVER overdue (completion takes precedence)
- Todos without a due date CANNOT be overdue
- Date comparison is date-only (time ignored)
- Due date = today is NOT overdue (becomes overdue tomorrow)
- Uses browser's local timezone

### daysOverdue

```javascript
function calculateDaysOverdue(todo, currentDate = new Date()) {
  if (!calculateIsOverdue(todo, currentDate)) return 0;
  
  const due = new Date(todo.dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffMs = now - due;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
```

**Rules**:
- Returns 0 if not overdue
- Calculates full days (not hours/minutes)
- Always positive integer
- Uses same date normalization as isOverdue

## Data Flow

```
Backend Storage (SQLite)
  ↓
GET /api/todos (unchanged)
  ↓
Frontend receives Todo[]
  ↓
Client-side calculation:
  - For each todo: isOverdue = calculateIsOverdue(todo)
  - For each todo: daysOverdue = calculateDaysOverdue(todo)
  - Overall: overdueCount = todos.filter(t => isOverdue(t)).length
  ↓
Render with visual indicators
```

## Validation Rules (Unchanged)

Existing validation rules remain:
- title: required, max 255 characters
- dueDate: optional, ISO 8601 date string (YYYY-MM-DD)
- completed: required, boolean (default: false)

No new validation needed for derived fields.

## State Management

**No New State Required**:
- Overdue status derived from existing `todos` array
- Current date obtained from `new Date()` during render
- Count calculated by filtering todos array

**Single Source of Truth**: The `todos` array from backend API

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Due date is today | NOT overdue (becomes overdue tomorrow) |
| Due date is yesterday | Overdue (daysOverdue = 1) |
| Todo completed after due date | NOT overdue (completed takes precedence) |
| No due date | NOT overdue (cannot be overdue without due date) |
| Due date edited from past to future | Overdue status recalculated immediately |
| System clock incorrect | Uses browser's local date (user's context) |
| Leap year / month boundaries | Native Date handles correctly |

## Performance Considerations

**Calculations per render**:
- isOverdue: O(1) per todo
- daysOverdue: O(1) per todo
- overdueCount: O(n) where n < 100

**Total**: < 1ms for typical workloads

**No optimization needed**: React's reconciliation handles efficiently at this scale
