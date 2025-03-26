export interface Card {
  title: string;
  description: string;
  img: string;
  type: CardType;
}

export enum CardType {
  Paisagem = 1,
  Flor = 2,
  Pizza = 3,
}
