import { Location, SpaceTimeMap, findBag } from './index';

describe('findBag', () => {
  test('should return location with higher map value', () => {
    const locations: Location[] = [
      { x: 1, y: 2, z: 3, time: 4 },
      { x: 5, y: 6, z: 7, time: 8 },
      { x: 9, y: 10, z: 11, time: 12 },
    ];
    const map: SpaceTimeMap = (x, y, z, time) => x + y + z + time;
    const result = findBag(locations, map);
    expect(result).toEqual({ x: 9, y: 10, z: 11, time: 12 });
  });

  test('should return null when locations list is empty', () => {
    const locations: Location[] = [];
    const map: SpaceTimeMap = jest.fn();
    const result = findBag(locations, map);
    expect(result).toBeNull();
  });

  test('should handle not valid values', () => {
    const locations: Location[] = [
      { x: -1, y: -2, z: -3, time: -4 },
      { x: 0, y: 0, z: 0, time: 0 },
    ];
    const map: SpaceTimeMap = () => NaN;
    const result = findBag(locations, map);
    expect(result).toBeNull();
  });
});