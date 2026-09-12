import type { Card } from "./types";
import { deck } from "./deck";





export function shuffleDeck(deck: Card[]): Card[] {
  return deck.sort(() => Math.random() - 0.5);
}

export function drawCard(deck: Card[]): Card {
  return deck.pop()!;
}

