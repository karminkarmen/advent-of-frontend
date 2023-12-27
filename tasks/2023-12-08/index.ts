enum Country {
  us = 0,
  de = 1,
  pl = 2,
}

enum Priority {
  low = 0,
  medium = 1,
  high = 2,
}

export interface Letter {
  content: string;
  country: keyof typeof Country;
  priority: keyof typeof Priority;
}

type Letters = Letter[];

interface Sorter {
  sort(letters: Letters): Letters;
}

export class PriorityStrategy implements Sorter {
  sort(letters: Letters) {
    return letters.sort((a, b) => Priority[b.priority] - Priority[a.priority]);
  }
}

export class CountryStrategy implements Sorter {
  sort(letters: Letters) {
    return letters.sort((a, b) => Country[b.country] - Country[a.country]);
  }
}

export class LengthStrategy implements Sorter {
  sort(letters: Letters) {
    return letters.sort((a, b) => a.content.length - b.content.length);
  }
}

export class LetterSorter {
  #sorter: Sorter;

  constructor(sorter: Sorter) {
    this.#sorter = sorter;
  }

  sortLetters(letters: Letters): Letters {
    return this.#sorter.sort(letters);
  }
}
