type Graph = Record<string, string[]>;
type Cycles = string[][];

const isGraphValid = (graph: Graph): boolean => {
  const startLocations = Object.keys(graph);
  const destinations = [...new Set(Object.values(graph).flat())];

  return destinations.every(destination => startLocations.includes(destination));
}

const visitLoacation = (location: string, alreadyVisitedLocations: Set<string>, graph: Graph, cycles: Cycles, path: string[] = []) => {
  const currentPath = [...path, location];

  if(alreadyVisitedLocations.has(location)) {
    if(path.includes(location)) {
      cycles.push(currentPath);
    }

    return;
  }

  alreadyVisitedLocations.add(location);

  graph[location].forEach(nextLocation => visitLoacation(nextLocation, alreadyVisitedLocations, graph, cycles, currentPath));
}

export function findCyclesBetweenLocations(graph: Graph): string[][] {
  const cycles: Cycles = [];
  const alreadyVisitedLocations: Set<string> = new Set();

  if (!isGraphValid(graph)) {
    throw new Error('Invalid graph: missing nodes');
  }

  Object.keys(graph).forEach(location => visitLoacation(location, alreadyVisitedLocations, graph, cycles));

  return cycles;
}
