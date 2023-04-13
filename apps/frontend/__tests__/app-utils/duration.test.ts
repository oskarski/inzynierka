import { Duration } from '@fe/utils';

describe(Duration.name, () => {
  describe('correctly formats duration', () => {
    it('[H:MM]', () => {
      expect(Duration.fromSeconds(5).format('H:MM')).toBe('0:00');
      expect(Duration.fromSeconds(59).format('H:MM')).toBe('0:00');
      expect(Duration.fromSeconds(60).format('H:MM')).toBe('0:01');
      expect(Duration.fromSeconds(5 * 60).format('H:MM')).toBe('0:05');
      expect(Duration.fromSeconds(59 * 60 + 59).format('H:MM')).toBe('0:59');
      expect(Duration.fromSeconds(60 * 60).format('H:MM')).toBe('1:00');
      expect(Duration.fromSeconds(2 * 60 * 60 + 15 * 60).format('H:MM')).toBe(
        '2:15'
      );
      expect(Duration.fromSeconds(14 * 60 * 60 + 12 * 60).format('H:MM')).toBe(
        '14:12'
      );
    });
  });
});
