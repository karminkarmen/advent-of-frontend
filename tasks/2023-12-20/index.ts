type Gifts = string[];

export class GiftStream {
  constructor(
    private giftsList: Gifts
  ) {}

  map(cb: (giftName: string) => string): GiftStream {
    return new GiftStream(this.giftsList.map(cb));
  }

  skip(giftsCountToSkip: number): GiftStream {
    return new GiftStream(this.giftsList.slice(giftsCountToSkip));
  }

  take(giftsCountToTake: number): GiftStream {
    return new GiftStream(this.giftsList.slice(0, giftsCountToTake))
  }

  getGifts(): Gifts {
    return this.giftsList;
  }
}
