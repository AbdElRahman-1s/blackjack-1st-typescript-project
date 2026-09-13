import type { Card } from "./types.js";
import { deck } from "./deck.js";





export function shuffleDeck(deck: Card[]): Card[] {
  return deck.sort(() => Math.random() - 0.5);
}

export function drawCard(deck: Card[]): Card {
  return deck.pop()!;
}


export function displayHand(hand: Card[]): void {
  for(const card of hand){
    console.log("Player:",card.value,card.suit);
  }
}
