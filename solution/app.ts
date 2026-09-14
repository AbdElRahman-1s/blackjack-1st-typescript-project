import PromptSync from "prompt-sync";
import { shuffleDeck, drawCard, displayHand , calculateHandValue} from "./utils.js";
import type { Card } from "./types.js";
import { deck } from "./deck.js";



function getBet(money: number): number {
  let bet = Number(prompt("Place your bet: "));
  while (bet > money || bet <= 0) {
    console.log("Bet must be greater than 0 and less than or equal to your money!");
    bet = Number(prompt("Please change your bet to valid value: "));
  }
  return bet;
}
function dealCards() {
  const playerHand: Card[] = [];
  const dealerHand: Card[] = [];

  shuffleDeck(deck);

  playerHand.push(drawCard(deck));
  playerHand.push(drawCard(deck));

  dealerHand.push(drawCard(deck));
  dealerHand.push(drawCard(deck));

  return {
    playerHand,
    dealerHand
  };
}

function playerTurn(playerHand: Card[]) {
  let playerBusted = false;
  let playerValue = calculateHandValue(playerHand);

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

  return {
    playerBusted,
    playerValue
  };
}

function dealerTurn(dealerHand: Card[]): number {
  let dealerValue = calculateHandValue(dealerHand);
  displayHand(dealerHand);
  console.log("Total:", dealerValue);
  while (dealerValue < 17) {
    dealerHand.push(drawCard(deck));
    dealerValue = calculateHandValue(dealerHand);
    displayHand(dealerHand);
    console.log("Total:", dealerValue);
  }
  return dealerValue;
}

function checkWinner(playerValue: number, dealerValue: number): string {
  if (dealerValue > 21) {
    return "Player Win -_-";

  } else {
    if (playerValue > dealerValue) {
      return "Player Win -_-";

    } else if (playerValue < dealerValue) {
      return "Dealers Win ):";

    } else {
      return "Tie.";
    }
  }
}

function isBlackjack(hand: Card[]): boolean {
  return calculateHandValue(hand) === 21 && hand.length === 2;
}

function handleBlackjack(
  playerBlackjack: boolean,
  dealerBlackjack: boolean,
  money: number,
  bet: number
): number {
  if (playerBlackjack && dealerBlackjack) {
    console.log("Tie.");
  } else if (playerBlackjack && !dealerBlackjack) {
    console.log("BlackJack, Player Win -_-");
    money += 1.5 * bet;
  } else if (dealerBlackjack && !playerBlackjack) {
    console.log("BlackJack, You Lost ):");
    money -= bet;
  }

  return money;
}

function handleRoundResult(
  playerBusted: boolean,
  playerValue: number,
  dealerValue: number,
  money: number,
  bet: number
): number {
  if (playerBusted) {
    console.log("You lost ):");
    money -= bet;
  } else {
    const result = checkWinner(playerValue, dealerValue);
    console.log(result);

    if (result === "Player Win -_-") {
      money += bet;
    } else if (result === "Dealers Win ):") {
      money -= bet;
    }
  }

  return money;
}

const prompt = PromptSync();

let money = 100;
while (money > 0) {

  let bet = getBet(money);


  const { playerHand, dealerHand } = dealCards();



  let playerValue = calculateHandValue(playerHand);
  let dealerValue = calculateHandValue(dealerHand);
  displayHand(playerHand);
  console.log("Total:", playerValue);
  console.log("Dealer:", dealerHand[0].value, dealerHand[0].suit);
  console.log("Dealer: Hidden");

  const playerBlackjack = isBlackjack(playerHand);
  const dealerBlackjack = isBlackjack(dealerHand);



  if (playerBlackjack || dealerBlackjack) {
    money = handleBlackjack(
      playerBlackjack,
      dealerBlackjack,
      money,
      bet
    );
  } else {
    const { playerBusted, playerValue } = playerTurn(playerHand);


    if (!playerBusted) {
      dealerValue = dealerTurn(dealerHand);
    }

    money = handleRoundResult(
      playerBusted,
      playerValue,
      dealerValue,
      money,
      bet
    );
  }


  console.log("Your Money: ", money);


}


if (money <= 0) {
  console.log("Your money is finished! Game Over.");
}