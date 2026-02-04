# Quickstart: Overdue Todo Items

**Feature**: 001-overdue-todos  
**For**: Developers implementing this feature  
**Date**: 2026-02-04

## Overview

Add visual indicators for overdue todo items. This is a **frontend-only** feature with no backend changes. Overdue status is calculated client-side based on due date and completion status.

## What's Being Built

### User-Facing Changes

1. **Visual Indicators** (P1): Overdue todos display with:
   - Red text color
   - Red border (2px)
   - "Overdue: X days" badge

2. **Count Banner** (P2): Banner above todo list showing "X overdue tasks" (hidden when count is 0)

3. **Days Display** (P3): Badge shows number of days overdue (e.g., "Overdue: 3 days")

### Technical Implementation

**What changes**:
- Frontend: New utility functions, updated components, new styles
- Backend: **No changes** (existing API sufficient)

**Files to create**:
- `frontend/src/utils/dateUtils.js` - Date comparison logic
- `frontend/src/utils/__tests__/dateUtils.test.js` - Date utility tests
- `frontend/src/components/OverdueBanner.js` - Count display component
- `frontend/src/components/__tests__/OverdueBanner.test.js` - Banner tests

**Files to modify**:
- `frontend/src/components/TodoCard.js` - Add overdue styling
- `frontend/src/components/__tests__/TodoCard.test.js` - Add overdue tests
- `frontend/src/components/TodoList.js` - Include OverdueBanner
- `frontend/src/components/__tests__/TodoList.test.js` - Test banner integration
- `frontend/src/App.css` - Add overdue CSS styles

## Prerequisites

- Node.js 16+
- npm 7+
- Existing todo app running (backend + frontend)
- Basic understanding of React and Jest

## Development Workflow

### Step 1: Set Up Branch

```bash
git checkout 001-overdue-todos
cd /workspaces/bootcamp-exercise-6
npm install
```

### Step 2: TDD Approach (MANDATORY)

Follow Test-Driven Development for each component:

1. **Red**: Write failing tests first
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

### Step 3: Implementation Order

**Phase A: Date Utilities** (foundation)
1. Write tests: `frontend/src/utils/__tests__/dateUtils.test.js`
2. Implement: `frontend/src/utils/dateUtils.js`
3. Verify: `npm test --workspace=frontend dateUtils`

**Phase B: TodoCard Updates** (visual indicators)
1. Write tests: Update `TodoCard.test.js` with overdue scenarios
2. Update component: `TodoCard.js` to show badge and apply styles
3. Add styles: Update `App.css` with `.overdue` and `.overdue-badge` classes
4. Verify: `npm test --workspace=frontend TodoCard`

**Phase C: OverdueBanner** (count display)
1. Write tests: `OverdueBanner.test.js`
2. Implement: `OverdueBanner.js`
3. Verify: `npm test --workspace=frontend OverdueBanner`

**Phase D: TodoList Integration** (wire it together)
1. Update tests: `TodoList.test.js` to include banner
2. Update component: `TodoList.js` to calculate count and render banner
3. Verify: `npm test --workspace=frontend TodoList`

**Phase E: Integration Testing**
1. Run all tests: `npm test`
2. Manual testing: `npm start` and verify visually
3. Coverage check: `npm test -- --coverage`

## Key Implementation Details

### Date Utilities

```javascript
// frontend/src/utils/dateUtils.js

/**
 * Check if a todo is overdue
 * @param {string|null} dueDate - ISO date string (YYYY-MM-DD)
 * @param {boolean} completed - Whether todo is completed
 * @param {Date} currentDate - Current date (default: now)
 * @returns {boolean} - True if overdue
 */
export function isOverdue(dueDate, completed, currentDate = new Date()) {
  if (completed || !dueDate) return false;
  
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}

/**
 * Calculate days overdue
 * @param {string} dueDate - ISO date string (YYYY-MM-DD)
 * @param {Date} currentDate - Current date (default: now)
 * @returns {number} - Days overdue (0 if not overdue)
 */
export function getDaysOverdue(dueDate, currentDate = new Date()) {
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  if (due >= now) return 0;
  
  const diffMs = now - due;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
```

### TodoCard Updates

```javascript
// In TodoCard.js
import { isOverdue, getDaysOverdue } from '../utils/dateUtils';

function TodoCard({ todo, onToggle, onDelete, onEdit }) {
  const todoIsOverdue = isOverdue(todo.dueDate, todo.completed);
  const daysOverdue = todoIsOverdue ? getDaysOverdue(todo.dueDate) : 0;
  
  return (
    <div className={`todo-card ${todoIsOverdue ? 'overdue' : ''}`}>
      {/* existing content */}
      {todoIsOverdue && (
        <span className="overdue-badge">
          Overdue: {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
        </span>
      )}
    </div>
  );
}
```

### OverdueBanner Component

```javascript
// frontend/src/components/OverdueBanner.js
import React from 'react';

function OverdueBanner({ count }) {
  if (count === 0) return null;
  
  return (
    <div className="overdue-banner">
      <span className="overdue-banner-text">
        {count} overdue {count === 1 ? 'task' : 'tasks'}
      </span>
    </div>
  );
}

export default OverdueBanner;
```

### CSS Styles

```css
/* Add to App.css */

/* Overdue todo card */
.todo-card.overdue {
  border: 2px solid var(--danger-color, #c62828);
  color: var(--danger-color, #c62828);
}

/* Overdue badge */
.overdue-badge {
  background-color: var(--danger-color, #c62828);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

/* Overdue banner */
.overdue-banner {
  background-color: #f5f5f5;
  border: 2px solid var(--danger-color, #c62828);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
}

.overdue-banner-text {
  color: var(--danger-color, #c62828);
  font-weight: 600;
  font-size: 16px;
}

/* Dark mode adjustments (if applicable) */
@media (prefers-color-scheme: dark) {
  .overdue-banner {
    background-color: #2d2d2d;
  }
}
```

## Testing Guidelines

### Test Structure

Each test file should follow Arrange-Act-Assert pattern:

```javascript
describe('Component/Function Name', () => {
  it('should [expected behavior]', () => {
    // Arrange: Set up test data
    const testData = { ... };
    
    // Act: Execute the code under test
    const result = functionUnderTest(testData);
    
    // Assert: Verify the outcome
    expect(result).toBe(expectedValue);
  });
});
```

### Key Test Cases

**dateUtils.js**:
- isOverdue returns true for past date + incomplete
- isOverdue returns false for future date
- isOverdue returns false for completed todos
- isOverdue returns false for null dueDate
- getDaysOverdue calculates correctly
- Edge cases: today, yesterday, leap years

**TodoCard.js**:
- Displays overdue badge for overdue todo
- No badge for completed todo
- No badge for future due date
- Badge shows correct days count
- CSS class applied correctly

**OverdueBanner.js**:
- Displays count when > 0
- Hidden when count = 0
- Correct singular/plural text

**TodoList.js**:
- Banner included in render
- Count calculated correctly
- Banner hidden when no overdue todos

## Running the Code

### Development Mode

```bash
# Terminal 1: Start backend
cd /workspaces/bootcamp-exercise-6
npm run start:backend

# Terminal 2: Start frontend
npm run start:frontend

# Or use concurrently (from root)
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run frontend tests only
npm test --workspace=frontend

# Run specific test file
npm test --workspace=frontend dateUtils

# Watch mode
npm test --workspace=frontend -- --watch

# Coverage report
npm test -- --coverage
```

### Verification Checklist

Before marking as complete:
- [ ] All tests pass (`npm test`)
- [ ] Coverage ≥ 80% (`npm test -- --coverage`)
- [ ] No ESLint errors
- [ ] Manual testing: overdue todos display correctly
- [ ] Manual testing: banner shows correct count
- [ ] Manual testing: completing overdue todo removes indicator
- [ ] Manual testing: editing due date updates overdue status
- [ ] Accessibility: badge text readable by screen readers

## Common Issues & Solutions

### Issue: Date comparison off by one day

**Cause**: Not normalizing time components
**Solution**: Always use `.setHours(0, 0, 0, 0)` on both dates

### Issue: Completed todos showing as overdue

**Cause**: Not checking `completed` status first
**Solution**: Check `completed` before date comparison

### Issue: Tests failing with different dates

**Cause**: Tests using system date (`new Date()`)
**Solution**: Pass `currentDate` parameter in tests

### Issue: Banner not hiding when count is 0

**Cause**: Rendering empty div instead of null
**Solution**: Use early return `if (count === 0) return null;`

## Performance Considerations

- Date calculations are O(1) per todo
- For lists < 100 items, no optimization needed
- useMemo not required (premature optimization)
- React handles re-renders efficiently

## Accessibility Notes

- Use `role="status"` on overdue badge
- Ensure color contrast meets WCAG AA
- Text labels provide semantic meaning
- Red border provides non-color visual cue

## Resources

- [Spec Document](./spec.md) - Full requirements
- [Data Model](./data-model.md) - Entity definitions
- [API Contracts](./contracts/api.md) - API documentation
- [Research](./research.md) - Technical decisions

## Next Steps

After completing implementation:
1. Create pull request to `main` branch
2. Request code review
3. Address review feedback
4. Merge when approved and tests pass
