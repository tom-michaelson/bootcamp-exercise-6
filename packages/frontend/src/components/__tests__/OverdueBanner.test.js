import React from 'react';
import { render, screen } from '@testing-library/react';
import OverdueBanner from '../OverdueBanner';

describe('OverdueBanner Component', () => {
  it('should display count when count is greater than 0', () => {
    render(<OverdueBanner count={3} />);
    
    expect(screen.getByText(/3 overdue tasks/)).toBeInTheDocument();
  });

  it('should return null when count is 0', () => {
    const { container } = render(<OverdueBanner count={0} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should display singular "task" for count of 1', () => {
    render(<OverdueBanner count={1} />);
    
    expect(screen.getByText(/1 overdue task/)).toBeInTheDocument();
    expect(screen.queryByText(/1 overdue tasks/)).not.toBeInTheDocument();
  });

  it('should display plural "tasks" for count greater than 1', () => {
    render(<OverdueBanner count={5} />);
    
    expect(screen.getByText(/5 overdue tasks/)).toBeInTheDocument();
  });

  it('should have appropriate ARIA role for accessibility', () => {
    render(<OverdueBanner count={2} />);
    
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
  });
});
