import PromptSync from "prompt-sync";
import { shuffleDeck, drawCard, displayHand } from "./utils.js";
import type { Card } from "./types.js";
import { deck } from "./deck.js";


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

let money = 100;
while(money > 0){
let bet = Number(prompt("Place your bet: "));
while (bet > money || bet<= 0) {
  console.log("Bet must be greater than 0 and less than or equal to your money!");
  bet = Number(prompt("Please change your bet to valid value: "));
}


const playerHand: Card[] = [];
const dealerHand: Card[] = [];

shuffleDeck(deck);

playerHand.push(drawCard(deck));
playerHand.push(drawCard(deck));

dealerHand.push(drawCard(deck));
dealerHand.push(drawCard(deck));



let playerBlackjack = false;
let dealerBlackjack = false;
let playerBusted = false;
let playerValue = calculateHandValue(playerHand);
let dealerValue = calculateHandValue(dealerHand);
displayHand(playerHand);
console.log("Total:", playerValue);
console.log("Dealer:", dealerHand[0].value, dealerHand[0].suit);
console.log("Dealer: Hidden");

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
    money += (1.5*bet);
  } else if (dealerBlackjack && !playerBlackjack) {
    console.log("BlackJack, You Lost ):");
    money -= bet;
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
      displayHand(playerHand);
      console.log("Total:", playerValue);
      if (playerValue > 21) {
        playerBusted = true;
        break;
      }
    }

  }


  if (playerBusted) {
    console.log("You lost ):");
    money -= bet;
  } else {
    dealerValue = calculateHandValue(dealerHand);
    displayHand(dealerHand);
    console.log("Total:", dealerValue);
    while (dealerValue < 17) {
      dealerHand.push(drawCard(deck));
      dealerValue = calculateHandValue(dealerHand);
      displayHand(dealerHand);
      console.log("Total:", dealerValue);
    }

    if (dealerValue > 21) {
      console.log("Player Win -_-");
      money += bet;
    } else {
      if (playerValue > dealerValue) {
        console.log("Player Win -_-");
        money += bet;
      } else if (playerValue < dealerValue) {
        console.log("Dealers Win ):");
        money -= bet;
      } else {
        console.log("Tie.");
      }
    }
  }
}


console.log("Your Money: ",money);


}


if (money <= 0) {
  console.log("Your money is finished! Game Over.");
}