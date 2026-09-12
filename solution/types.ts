export type Suit = "♠" | "♥" | "♦" | "♣";

export interface Card {
  suit: Suit;
  value: string;
}