export class ChristmasEmitter {
  #events: Record<string, any[]> = {};

  public on<T>(eventName: string, eventCb: T) {
    const currentEventCbs = this.#events[eventName];
    this.#events[eventName] = currentEventCbs ? [...currentEventCbs, eventCb] : [eventCb];
  }

  public off<T>(eventName: string, eventCb: T) {
    const currentEventCbs = this.#events[eventName];

    if (!currentEventCbs) {
      throw new Error('There is no event with this name to remove this callback');
    }

    const filteredCbs = currentEventCbs.filter(fn => fn !== eventCb);
    
    this.#events[eventName] = filteredCbs;
  }

  public emit(eventName: string) {
    const currentEventCbs = this.#events[eventName];

    if (!currentEventCbs) {
      throw new Error('There is no event with this name to emit');
    }

    currentEventCbs.forEach(fn => fn());
  }
}