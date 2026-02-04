import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  // US2: Overdue Count Banner Tests
  describe('Overdue count banner integration', () => {
    const currentDate = new Date('2026-02-04');
    
    // Mock the Date constructor to return fixed date
    beforeEach(() => {
      global.Date = class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(currentDate);
          } else {
            super(...args);
          }
        }
        
        static now() {
          return currentDate.getTime();
        }
      };
    });

    it('should calculate overdueCount correctly', () => {
      const todosWithOverdue = [
        { id: 1, title: 'Overdue 1', dueDate: '2026-02-01', completed: 0, createdAt: '2026-01-01T00:00:00Z' },
        { id: 2, title: 'Overdue 2', dueDate: '2026-01-30', completed: 0, createdAt: '2026-01-01T00:00:00Z' },
        { id: 3, title: 'Completed overdue', dueDate: '2026-02-01', completed: 1, createdAt: '2026-01-01T00:00:00Z' },
        { id: 4, title: 'Not overdue', dueDate: '2026-02-10', completed: 0, createdAt: '2026-01-01T00:00:00Z' }
      ];
      
      render(<TodoList todos={todosWithOverdue} {...mockHandlers} isLoading={false} />);
      
      // Should show 2 overdue tasks (completed overdue and future don't count)
      expect(screen.getByText(/2 overdue tasks/)).toBeInTheDocument();
    });

    it('should render OverdueBanner with correct count', () => {
      const todosWithOverdue = [
        { id: 1, title: 'Overdue', dueDate: '2026-02-01', completed: 0, createdAt: '2026-01-01T00:00:00Z' }
      ];
      
      render(<TodoList todos={todosWithOverdue} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/1 overdue task/)).toBeInTheDocument();
    });

    it('should render OverdueBanner above todo cards', () => {
      const todosWithOverdue = [
        { id: 1, title: 'Overdue', dueDate: '2026-02-01', completed: 0, createdAt: '2026-01-01T00:00:00Z' }
      ];
      
      const { container } = render(<TodoList todos={todosWithOverdue} {...mockHandlers} isLoading={false} />);
      
      const banner = screen.getByText(/1 overdue task/);
      const firstCard = screen.getByText('Overdue');
      
      // Banner should appear before the todo card in DOM order
      expect(banner.compareDocumentPosition(firstCard)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('should not render OverdueBanner when count is 0', () => {
      const todosWithNoOverdue = [
        { id: 1, title: 'Not overdue', dueDate: '2026-02-10', completed: 0, createdAt: '2026-01-01T00:00:00Z' },
        { id: 2, title: 'Completed', dueDate: '2026-02-01', completed: 1, createdAt: '2026-01-01T00:00:00Z' }
      ];
      
      render(<TodoList todos={todosWithNoOverdue} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/overdue task/)).not.toBeInTheDocument();
    });
  });
});
