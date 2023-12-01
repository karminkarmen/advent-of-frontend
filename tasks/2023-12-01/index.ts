export class GiftRegistry {
  registry = new Map<number, Set<string>>();

  addGift(childId: number, giftName: string): void {
    const giftsList = this.registry.get(childId) || new Set();

    if (!giftsList.has(giftName)) {
      giftsList.add(giftName);
      this.registry.set(childId, giftsList)
    }
  }

  removeGift(childId: number, giftName: string): void {
    const giftsList = this.registry.get(childId);

    if (!giftsList) {
      throw Error('There is no list of gifts for child with specified id');
    }

    if (!giftsList.has(giftName)) {
      throw Error('Gift not found');
    }

    giftsList.delete(giftName);

    if (giftsList.size) {
      this.registry.set(childId, giftsList);
    } else {
      this.registry.delete(childId);
    }
  }

  getGiftsForChild(childId: number): string[] {
    const giftsList = this.registry.get(childId);

    if (!giftsList) {
      throw Error('There is no list of gifts for child with specified id');
    }

    return Array.from(giftsList);
  }
}