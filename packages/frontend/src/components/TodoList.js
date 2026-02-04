import React from 'react';
import TodoCard from './TodoCard';
import OverdueBanner from './OverdueBanner';
import { isOverdue } from '../utils/dateUtils';

function TodoList({ todos, onToggle, onEdit, onDelete, isLoading }) {
  // Calculate overdue count
  const overdueCount = todos.filter(todo => 
    isOverdue(todo.dueDate, todo.completed === 1)
  ).length;

  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <p className="empty-state-message">
          No todos yet. Add one to get started! 👻
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <OverdueBanner count={overdueCount} />
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default TodoList;
