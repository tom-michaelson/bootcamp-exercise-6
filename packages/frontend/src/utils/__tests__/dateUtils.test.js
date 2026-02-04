import { isOverdue, getDaysOverdue } from '../dateUtils';

describe('dateUtils', () => {
  describe('isOverdue', () => {
    const currentDate = new Date('2026-02-04');

    test('should return false for completed todos', () => {
      const dueDate = '2026-02-01'; // 3 days ago
      const completed = true;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(false);
    });

    test('should return false for todos without due date', () => {
      const dueDate = null;
      const completed = false;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(false);
    });

    test('should return false for todo due today', () => {
      const dueDate = '2026-02-04'; // today
      const completed = false;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(false);
    });

    test('should return false for todo due in the future', () => {
      const dueDate = '2026-02-10'; // 6 days from now
      const completed = false;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(false);
    });

    test('should return true for incomplete todo with past due date', () => {
      const dueDate = '2026-02-03'; // yesterday
      const completed = false;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(true);
    });

    test('should return true for todo 5 days overdue', () => {
      const dueDate = '2026-01-30'; // 5 days ago
      const completed = false;
      expect(isOverdue(dueDate, completed, currentDate)).toBe(true);
    });
  });

  describe('getDaysOverdue', () => {
    const currentDate = new Date('2026-02-04');

    test('should return 0 for due date today', () => {
      const dueDate = '2026-02-04';
      expect(getDaysOverdue(dueDate, currentDate)).toBe(0);
    });

    test('should return 0 for future due date', () => {
      const dueDate = '2026-02-10';
      expect(getDaysOverdue(dueDate, currentDate)).toBe(0);
    });

    test('should return 1 for todo 1 day overdue', () => {
      const dueDate = '2026-02-03'; // yesterday
      expect(getDaysOverdue(dueDate, currentDate)).toBe(1);
    });

    test('should return 5 for todo 5 days overdue', () => {
      const dueDate = '2026-01-30'; // 5 days ago
      expect(getDaysOverdue(dueDate, currentDate)).toBe(5);
    });

    test('should handle month boundary correctly', () => {
      const dueDate = '2026-01-31';
      const testDate = new Date('2026-02-02');
      expect(getDaysOverdue(dueDate, testDate)).toBe(2);
    });

    test('should handle year boundary correctly', () => {
      const dueDate = '2025-12-31';
      const testDate = new Date('2026-01-02');
      expect(getDaysOverdue(dueDate, testDate)).toBe(2);
    });

    test('should return 0 for null due date', () => {
      const dueDate = null;
      expect(getDaysOverdue(dueDate, currentDate)).toBe(0);
    });

    // US3: Edge Case Tests
    test('should calculate 1 day overdue correctly (US3)', () => {
      const dueDate = '2026-02-03'; // yesterday
      expect(getDaysOverdue(dueDate, currentDate)).toBe(1);
    });

    test('should calculate 5 days overdue correctly (US3)', () => {
      const dueDate = '2026-01-30'; // 5 days ago
      expect(getDaysOverdue(dueDate, currentDate)).toBe(5);
    });

    test('should handle leap year boundary correctly (US3)', () => {
      const dueDate = '2024-02-29'; // leap year date
      const testDate = new Date('2024-03-02');
      expect(getDaysOverdue(dueDate, testDate)).toBe(2);
    });

    test('should handle month boundary with different month lengths (US3)', () => {
      const dueDate = '2026-01-31'; // 31-day month
      const testDate = new Date('2026-03-02'); // crossing February (28 days)
      expect(getDaysOverdue(dueDate, testDate)).toBe(30); // 31 Jan + 28 Feb + 2 Mar - 31 = 30
    });

    test('should handle large day differences (30+ days overdue) (US3)', () => {
      const dueDate = '2025-12-01'; // ~2 months ago
      const testDate = new Date('2026-02-04');
      expect(getDaysOverdue(dueDate, testDate)).toBe(65); // Dec(30) + Jan(31) + Feb(4)
    });
  });
});
