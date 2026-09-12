import PromptSync from "prompt-sync";
import { shuffleDeck, drawCard } from "./utils.js";
import type { Card } from "./types.js";
import { deck } from "./deck.js";


const playerHand: Card[] = [];
const dealerHand: Card[] = [];

shuffleDeck(deck);

playerHand.push(drawCard(deck));
playerHand.push(drawCard(deck));

dealerHand.push(drawCard(deck));
dealerHand.push(drawCard(deck));


function calculateHandValue(hand: Card[]): number {
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


const prompt = PromptSync();

let playerBlackjack = false;
let dealerBlackjack = false;
let playerBusted = false;
let playerValue = calculateHandValue(playerHand);
let dealerValue = calculateHandValue(dealerHand);

if (playerValue === 21 && playerHand.length === 2) {
  playerBlackjack = true;
}
if (dealerValue === 21 && dealerHand.length === 2) {
  dealerBlackjack = true;
}



if (playerBlackjack || dealerBlackjack) {
  if (playerBlackjack && dealerBlackjack) {
  console.log("Tie.");
} else if (playerBlackjack && !dealerBlackjack) {
  console.log("BlackJack, Player Win -_-");
} else if (dealerBlackjack && !playerBlackjack) {
  console.log("BlackJack, You Lost ):");
}
} else {
  while (true) {

    const action = prompt("Hit or Stand? ");

    if (action === "stand") {
      break;
    }

    if (action === "hit") {
      playerHand.push(drawCard(deck));
      playerValue = calculateHandValue(playerHand);
      if (playerValue > 21) {
        playerBusted = true;
        break;
      }
    }

  }


  if (playerBusted) {
    console.log("You lost ):");
  } else {
    dealerValue = calculateHandValue(dealerHand);
    while (dealerValue < 17) {
      dealerHand.push(drawCard(deck));
      dealerValue = calculateHandValue(dealerHand);
    }

    if (dealerValue > 21) {
      console.log("Player Win -_-");
    } else {
      if (playerValue > dealerValue) {
        console.log("Player Win -_-");
      } else if (playerValue < dealerValue) {
        console.log("Dealers Win ):");
      } else {
        console.log("Tie.");
      }
    }
  }
}





