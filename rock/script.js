// Function to generate computer's choice
function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to play a single round
  function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
  
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
  }
  
  // Function to update game result
  function updateResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = result;
  }
  
  // Function to update player and computer choices
  function updateChoices(playerChoice, computerChoice) {
    const playerChoiceDiv = document.getElementById('player-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');
    
    playerChoiceDiv.src = `${playerChoice}.png`;
    playerChoiceDiv.alt = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
    
    computerChoiceDiv.src = `${computerChoice}.png`;
    computerChoiceDiv.alt = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  }
  
  // Function to play the game
  function game(playerSelection) {
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    
    updateResult(result);
    updateChoices(playerSelection, computerSelection);
  }
  
  // Add click event listeners to the choices
  const choices = document.querySelectorAll('.choices img');
  choices.forEach(choice => {
    choice.addEventListener('click', function() {
      const playerSelection = this.id;
      game(playerSelection);
    });
  });
  