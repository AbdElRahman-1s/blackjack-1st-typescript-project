import type { Suit, Card } from "./types";


const suit: Suit[] = ["♠", "♥", "♦", "♣"];

const values = [
  "A", "2", "3", "4", "5", "6", "7",
  "8", "9", "10", "J", "Q", "K"
];


const deck: Card[] = [];


for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < suit.length; j++) {
    deck.push({
      value: values[i],
      suit: suit[j]
    });
  }
}