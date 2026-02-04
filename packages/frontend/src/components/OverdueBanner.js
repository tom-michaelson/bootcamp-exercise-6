import React from 'react';

/**
 * OverdueBanner displays a count of overdue todo items
 * Returns null when count is 0 (banner is hidden)
 */
function OverdueBanner({ count }) {
  // Don't render anything if count is 0
  if (count === 0) {
    return null;
  }

  const taskText = count === 1 ? 'task' : 'tasks';

  return (
    <div className="overdue-banner" role="alert">
      <span className="overdue-banner-text">
        ⚠️ {count} overdue {taskText}
      </span>
    </div>
  );
}

export default OverdueBanner;
