import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2025-12-25',
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 25, 2025/)).toBeInTheDocument();
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  // US1: Overdue Visual Indicators Tests
  describe('Overdue functionality', () => {
    const currentDate = new Date('2026-02-04');
    
    // Mock the dateUtils module to use fixed date
    beforeEach(() => {
      // Save the original Date
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

    it('should display red styling and overdue badge for overdue incomplete todo', () => {
      const overdueTodo = {
        ...mockTodo,
        dueDate: '2026-02-01', // 3 days ago
        completed: 0
      };
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).toHaveClass('overdue');
      expect(screen.getByText(/Overdue:/)).toBeInTheDocument();
      expect(screen.getByText(/3 days/)).toBeInTheDocument();
    });

    it('should NOT show overdue styling for completed overdue todo', () => {
      const completedOverdueTodo = {
        ...mockTodo,
        dueDate: '2026-02-01', // 3 days ago
        completed: 1
      };
      const { container } = render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText(/Overdue:/)).not.toBeInTheDocument();
    });

    it('should NOT be overdue for todo due today', () => {
      const todayTodo = {
        ...mockTodo,
        dueDate: '2026-02-04', // today
        completed: 0
      };
      const { container } = render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText(/Overdue:/)).not.toBeInTheDocument();
    });

    it('should NOT be overdue for todo with no due date', () => {
      const noDueDateTodo = {
        ...mockTodo,
        dueDate: null,
        completed: 0
      };
      const { container } = render(<TodoCard todo={noDueDateTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText(/Overdue:/)).not.toBeInTheDocument();
    });

    it('should show singular "day" for 1 day overdue', () => {
      const oneDayOverdue = {
        ...mockTodo,
        dueDate: '2026-02-03', // yesterday
        completed: 0
      };
      render(<TodoCard todo={oneDayOverdue} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/Overdue:/)).toBeInTheDocument();
      expect(screen.getByText(/1 day/)).toBeInTheDocument();
      expect(screen.queryByText(/1 days/)).not.toBeInTheDocument();
    });

    it('should show plural "days" for multiple days overdue', () => {
      const multipleDaysOverdue = {
        ...mockTodo,
        dueDate: '2026-01-30', // 5 days ago
        completed: 0
      };
      render(<TodoCard todo={multipleDaysOverdue} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/Overdue:/)).toBeInTheDocument();
      expect(screen.getByText(/5 days/)).toBeInTheDocument();
    });
  });
});
