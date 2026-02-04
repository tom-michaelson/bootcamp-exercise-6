/**
 * Check if a todo is overdue
 * @param {string|null} dueDate - ISO date string (YYYY-MM-DD) or null
 * @param {boolean} completed - Whether todo is completed
 * @param {Date} currentDate - Current date (default: now, injectable for testing)
 * @returns {boolean} - True if overdue, false otherwise
 */
export function isOverdue(dueDate, completed, currentDate = new Date()) {
  // Completed todos are never overdue
  if (completed) return false;
  
  // Todos without due dates cannot be overdue
  if (!dueDate) return false;
  
  // Date-only comparison (ignore time of day)
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}

/**
 * Calculate days overdue
 * @param {string|null} dueDate - ISO date string (YYYY-MM-DD) or null
 * @param {Date} currentDate - Current date (default: now, injectable for testing)
 * @returns {number} - Number of days overdue (0 if not overdue)
 */
export function getDaysOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return 0;
  
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  // Not overdue if due date is today or in the future
  if (due >= now) return 0;
  
  const diffMs = now - due;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
