# API Contracts: Overdue Todo Items

**Feature**: 001-overdue-todos  
**Date**: 2026-02-04

## Overview

This feature requires **NO API changes**. The existing GET /api/todos endpoint provides all necessary data. This document confirms the existing contract.

## Existing Endpoints (Unchanged)

### GET /api/todos

**Purpose**: Retrieve all todos for the user

**Request**:
```http
GET /api/todos HTTP/1.1
Host: localhost:3030
```

**Response** (200 OK):
```json
[
  {
    "id": "1",
    "title": "Complete project documentation",
    "dueDate": "2026-02-01",
    "completed": false,
    "createdAt": "2026-01-15T10:30:00Z"
  },
  {
    "id": "2",
    "title": "Review pull requests",
    "dueDate": null,
    "completed": true,
    "createdAt": "2026-01-20T14:22:00Z"
  }
]
```

**Response Schema**:
```typescript
type Todo = {
  id: string;
  title: string;
  dueDate: string | null;  // ISO 8601 date (YYYY-MM-DD) or null
  completed: boolean;
  createdAt: string;       // ISO 8601 timestamp
}

type Response = Todo[];
```

**Fields Used by Overdue Feature**:
- `dueDate`: Used to calculate if overdue
- `completed`: Completed todos are never overdue
- All fields displayed in UI

**Status Codes**:
- 200: Success
- 500: Server error

### Other Endpoints (Unchanged)

The following endpoints are unchanged and not impacted by this feature:

- **POST /api/todos**: Create new todo
- **PUT /api/todos/:id**: Update todo
- **DELETE /api/todos/:id**: Delete todo

## Client-Side Contract

### Date Utilities

**New module**: `frontend/src/utils/dateUtils.js`

```typescript
/**
 * Check if a todo is overdue
 * @param dueDate - ISO date string (YYYY-MM-DD) or null
 * @param completed - Whether todo is completed
 * @param currentDate - Current date (default: now, injectable for testing)
 * @returns true if overdue, false otherwise
 */
function isOverdue(
  dueDate: string | null,
  completed: boolean,
  currentDate?: Date
): boolean

/**
 * Calculate days overdue
 * @param dueDate - ISO date string (YYYY-MM-DD)
 * @param currentDate - Current date (default: now, injectable for testing)
 * @returns Number of days overdue (0 if not overdue)
 */
function getDaysOverdue(
  dueDate: string,
  currentDate?: Date
): number
```

### Component Props

**OverdueBanner Component** (new):
```typescript
type OverdueBannerProps = {
  count: number;  // Number of overdue todos
}
```

**TodoCard Component** (updated):
```typescript
type TodoCardProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
  // No new props needed - uses todo.dueDate and todo.completed
}
```

## Data Flow Contract

```
1. Frontend: GET /api/todos
   ← Backend: Todo[] (unchanged schema)

2. Frontend: Calculate derived properties
   - For each todo: isOverdue(todo.dueDate, todo.completed)
   - For each todo: getDaysOverdue(todo.dueDate)
   - Overall: overdueCount = count of overdue todos

3. Frontend: Render with visual indicators
   - TodoCard: Apply .overdue class if isOverdue
   - TodoCard: Display "Overdue: X days" badge if isOverdue
   - OverdueBanner: Display count if > 0

4. User interactions (toggle, edit, delete)
   - Existing API calls unchanged
   - Frontend recalculates overdue status after state update
```

## Backward Compatibility

✅ **Fully backward compatible**

- No API changes
- No database schema changes
- No breaking changes to existing components
- Feature works with existing backend

## Testing Contract

### Mock API Responses

```javascript
// Test fixture: overdue todo
const overdueTodo = {
  id: '1',
  title: 'Overdue task',
  dueDate: '2026-01-01',
  completed: false,
  createdAt: '2025-12-01T00:00:00Z'
};

// Test fixture: completed overdue todo (should NOT show as overdue)
const completedOverdueTodo = {
  id: '2',
  title: 'Completed task',
  dueDate: '2026-01-01',
  completed: true,
  createdAt: '2025-12-01T00:00:00Z'
};

// Test fixture: no due date
const noDueDateTodo = {
  id: '3',
  title: 'No due date',
  dueDate: null,
  completed: false,
  createdAt: '2026-01-15T00:00:00Z'
};
```

## Assumptions

- Backend continues to return `dueDate` in ISO 8601 format (YYYY-MM-DD)
- Backend continues to return `completed` as boolean
- No new query parameters needed (no filtering/sorting)
- All date calculations happen client-side
