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


export function calculateHandValue(hand: Card[]): number {
  let total = 0;
  for (const card of hand) {
    if (card.value === "J" ||
      card.value === "Q" ||
      card.value === "K") {
      total += 10;
    } else if (card.value === "A") {
      if (11 + total <= 21) {
        total += 11;
      } else if (11 + total > 21) {
        total++;
      }
    } else {
      total += Number(card.value);
    }
  }

  return total;
}