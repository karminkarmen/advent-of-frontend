export type Location = { x: number, y: number, z: number, time: number };
export type SpaceTimeMap = (x: number, y: number, z: number, time: number) => number;

interface LocationData {
  result: number;
  location: Location | null;
}

export const findBag = (locations: Location[], spaceTimeMap: SpaceTimeMap): Location | null => {
  const bestLocationData = locations.reduce<LocationData>((acc, location) => {
    const { x, y, z, time } = location;
    const mapResult = spaceTimeMap(x, y, z, time);

    return mapResult > acc.result ? { result: mapResult, location } : acc;
  }, { result: 0, location: null });

  return bestLocationData.location;
}
