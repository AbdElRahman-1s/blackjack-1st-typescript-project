import { shuffleDeck , drawCard } from "./utils";
import type { Card } from "./types";
import { deck } from "./deck";


const playerHand: Card[] = [];
const dealerHand: Card[] = [];

shuffleDeck(deck);

playerHand.push(drawCard(deck));
playerHand.push(drawCard(deck));

dealerHand.push(drawCard(deck));
dealerHand.push(drawCard(deck));