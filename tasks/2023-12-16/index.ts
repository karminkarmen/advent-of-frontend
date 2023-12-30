type GalacticHistoryTracer<T> = {
  add: (location: T) => void;
  undo: () => void;
  redo: () => void;
  current: () => T | null;
};

export function createTracer<T>(): GalacticHistoryTracer<T> {
  const currentTrace: Array<T> = [];
  const traceChangeHistory: Array<T> = [];

  return {
    add: (location: T) => {
      currentTrace.push(location);
      traceChangeHistory.length = 0;
    },
    undo: () => {
      const lastLocation = currentTrace.pop();
      lastLocation && traceChangeHistory.push(lastLocation);
    },
    redo: () => {      
      if (!traceChangeHistory.length) {
        throw new Error('No more galaxies to explore');
      };

      const lastHistoryLocation = traceChangeHistory.pop();
      lastHistoryLocation && currentTrace.push(lastHistoryLocation);
    },
    current: () => currentTrace[currentTrace.length - 1] ?? null,
  };
}
