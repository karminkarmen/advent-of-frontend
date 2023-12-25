export class ChristmasEmitter {
  #events: Record<string, any[]> = {};

  on<T>(eventName: string, eventCb: T) {
    const eventCallbacks = this.#events[eventName];

    this.#events[eventName] = eventCallbacks ? [...eventCallbacks, eventCb] : [eventCb];
  }

  off<T>(eventName: string, eventCb: T) {
    const eventCallbacks = this.#events[eventName];

    if (!eventCallbacks) {
      throw new Error('There is no event with this name to remove provided callback');
    }

    const filteredCbs = eventCallbacks.filter(callback => callback !== eventCb);
    this.#events[eventName] = filteredCbs;
  }

  emit(eventName: string) {
    const currentEventCbs = this.#events[eventName];

    if (!currentEventCbs) {
      throw new Error('There is no event with this name to emit');
    }

    currentEventCbs.forEach(callback => callback());
  }
}