export function* storageQuery(range: number, gift: string, resolver: (n: number, gift: string) => boolean): Generator<number> {
  if (resolver(range, gift)) {
    const giftSize = gift.length;
    const sectionsCount = range/giftSize;

    for(let i = 1; i <= sectionsCount; i++) {
      yield i*giftSize;
    }
  }
}

export function storageResolver(n: number, gift: string): boolean {
  return gift.length > n ? false : true;
}
