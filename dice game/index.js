function rollDice() {
  var playerDice = document.getElementById("playerDiceImage");
  var computerDice = document.getElementById("computerDiceImage");
  var playerRandomNumber = Math.floor(Math.random() * 6) + 1;
  var computerRandomNumber = Math.floor(Math.random() * 6) + 1;
  playerDice.src = "images/dice" + playerRandomNumber + ".png";
  computerDice.src = "images/dice" + computerRandomNumber + ".png";

  var resultDiv = document.getElementById("result");
  if (playerRandomNumber > computerRandomNumber) {
      document.querySelector("h1").innerHTML = "🏆You Win!";
  } else if (playerRandomNumber < computerRandomNumber) {
      document.querySelector("h1").innerHTML = "Computer Wins!";
  } else {
      document.querySelector("h1").innerHTML = "It's a Tie!";
  }
}