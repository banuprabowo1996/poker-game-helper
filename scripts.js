document.addEventListener("DOMContentLoaded", function () {
  // Function to handle bet logic
  function handleBet(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const profileCard = event.target.closest(".profile-card");
    const betInput = profileCard.querySelector(".bet-input");
    const betAmount = parseInt(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    // Update the player's score
    const scoreElement = profileCard.querySelector(".score-value");
    const currentScore = parseInt(scoreElement.textContent);
    const newScore = currentScore - betAmount;

    if (newScore < 0) {
      alert("Insufficient score to place this bet.");
      return;
    }

    scoreElement.textContent = newScore;

    // Update the bet container
    const betTempElement = document.getElementById("bet-temp");
    const currentBetTemp = parseInt(betTempElement.textContent);
    betTempElement.textContent = currentBetTemp + betAmount;

    // Clear the bet input field
    betInput.value = "";
  }

  // Function to handle winning a round
  function handleWinRound(event) {
    const profileCard = event.target.closest(".profile-card");
    const scoreElement = profileCard.querySelector(".score-value");
    const currentScore = parseInt(scoreElement.textContent);

    // Get the bet container amount
    const betTempElement = document.getElementById("bet-temp");
    const currentBetTemp = parseInt(betTempElement.textContent);

    // Update the player's score with the bet container amount
    scoreElement.textContent = currentScore + currentBetTemp;

    // Reset the bet container amount to 0
    betTempElement.textContent = 0;
  }

  // Function to add a new player
  document.getElementById("addPlayerButton").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get the player name from the input
    const playerName = document.getElementById("playerNameInput").value;

    // Create a new profile card element
    const newProfileCard = document.createElement("div");
    newProfileCard.classList.add("profile-card");
    newProfileCard.innerHTML = `
      <button class="delete-player" style="border: none; background: none; padding: 0;">
        <i class="material-icons" style="color: rgb(224, 224, 224);">delete</i>
      </button>
      <img src="profile-icon-9.png" alt="Profile Picture" class="profile-picture">
      <div class="profile-details">
        <h2 class="profile-name">${playerName}</h2>
        <div class="profile-score">
          <span class="score-label">Saldo:</span>
          <span class="score-value">0</span>
        </div>
      </div>
      <div class="masukan-saldo">
        <input type="text" class="bet-input" />
        <input type="submit" value="BET" class="bet-button" />
      </div>
      <button class="win-round-button" style="padding: 4px;">WIN THIS ROUND</button>
    `;

    // Add the new profile card to the player container
    document.getElementById("playerContainer").appendChild(newProfileCard);

    // Clear the input field
    document.getElementById("playerNameInput").value = "";

    // Add event listener to the delete button of the new profile card
    newProfileCard.querySelector(".delete-player").addEventListener("click", function () {
      newProfileCard.remove();
    });

    // Add event listener to the bet button of the new profile card
    newProfileCard.querySelector(".bet-button").addEventListener("click", handleBet);

    // Add event listener to the win round button of the new profile card
    newProfileCard
      .querySelector(".win-round-button")
      .addEventListener("click", handleWinRound);
  });

  // Function to set initial score for all players
  document
    .getElementById("setInitialScoreButton")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form from submitting the traditional way

      // Get the initial score from the input
      const initialScore = parseInt(document.getElementById("initialScoreInput").value);

      if (isNaN(initialScore) || initialScore < 0) {
        alert("Please enter a valid initial score.");
        return;
      }

      // Get all the score value elements
      const scoreElements = document.querySelectorAll(".score-value");

      // Update the score for each player
      scoreElements.forEach(function (scoreElement) {
        scoreElement.textContent = initialScore;
      });

      // Clear the input field
      document.getElementById("initialScoreInput").value = "";
    });

  // Add event listeners to existing delete buttons (if any)
  document.querySelectorAll(".delete-player").forEach(function (button) {
    button.addEventListener("click", function () {
      button.parentElement.remove();
    });
  });

  // Add event listeners to existing bet buttons (if any)
  document.querySelectorAll(".bet-button").forEach(function (button) {
    button.addEventListener("click", handleBet);
  });

  // Add event listeners to existing win round buttons (if any)
  document.querySelectorAll(".win-round-button").forEach(function (button) {
    button.addEventListener("click", handleWinRound);
  });
});
