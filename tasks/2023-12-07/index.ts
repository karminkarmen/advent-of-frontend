type Letter = { [key: string]: number };

export function createTrackedLetter(letter: Letter, tracker: (key: string, change:  number) => void): Letter {
  const handler = {
    set(obj: Record<string, number>, prop: string, value: number) {
      tracker(prop, value);
      return Reflect.set(obj, prop, value);
    }
  }
  
  const proxyLetter = new Proxy(letter, handler);
  return proxyLetter;
}
