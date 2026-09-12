import type { Card } from "./types.js";
import { deck } from "./deck.js";





export function shuffleDeck(deck: Card[]): Card[] {
  return deck.sort(() => Math.random() - 0.5);
}

export function drawCard(deck: Card[]): Card {
  return deck.pop()!;
}

