export class ChristmasQueue<T> {
  #lettersQueue: Array<{ letter: T, priority: number}> = [];

  public enqueue(letter: T, priority: number): void {
    this.#lettersQueue.push({ letter, priority });
    this.#lettersQueue = this.#lettersQueue.sort((a, b) => b.priority-a.priority);
  }

  public dequeue(): T {
    const mostImportantLetter = this.#lettersQueue.shift()?.letter;

    if (!mostImportantLetter) {
      throw Error('There are no letters in the queue!');
    }

    return mostImportantLetter;
  }

  public isEmpty(): boolean {
    return !this.#lettersQueue.length;
  }

}