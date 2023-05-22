      // Initialize the canvas and context
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      // Player object
      const player = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        width: 50,
        height: 50,
        color: "#0095DD",
      };

      // Variables for tracking the score and game state
      let score = 0;
      let gameOver = false;
      let objectSpeed = 1;
      let objectInterval = null;
      let powerUpInterval = null;
      let obstacles = [];

      // Event listener for tracking the mouse movement
      canvas.addEventListener("mousemove", (e) => {
        if (!gameOver) {
          const rect = canvas.getBoundingClientRect();
          player.x = e.clientX - rect.left - player.width / 2;
        }
      });

      // Object creation
      function createObject() {
        const object = {
          x: Math.random() * (canvas.width - 30),
          y: 0,
          width: 30,
          height: 30,
          color: "#FF0000",
          speed: objectSpeed,
        };

        return object;
      }

      // Power-up creation
      function createPowerUp() {
        const powerUp = {
          x: Math.random() * (canvas.width - 30),
          y: 0,
          width: 20,
          height: 20,
          color: "#00FF00",
          effect: "increaseSpeed", // Example effect, customize as desired
        };

        return powerUp;
      }

      // Obstacle creation
      function createObstacle() {
        const obstacle = {
          x: Math.random() * (canvas.width - 50),
          y: 0,
          width: 50,
          height: 10,
          color: "#000000",
          speed: objectSpeed,
        };

        return obstacle;
      }

      // Array to store falling objects and power-ups
      const objects = [];
      const powerUps = [];

      // Function for updating the game
      function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the player
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw falling objects
        for (let i = 0; i < objects.length; i++) {
          const obj = objects[i];
          ctx.fillStyle = obj.color;
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

          // Update object position
          obj.y += obj.speed;

          // Check collision with player
          if (
            obj.y + obj.height >= player.y &&
            obj.x >= player.x &&
            obj.x <= player.x + player.width
          ) {
            score++;
            objects.splice(i, 1);
          }

          // Check if the object reached the bottom
          if (obj.y + obj.height > canvas.height) {
            objects.splice(i, 1);
          }
        }

        // Draw power-ups
        for (let i = 0; i < powerUps.length; i++) {
          const powerUp = powerUps[i];
          ctx.fillStyle = powerUp.color;
          ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);

          // Update power-up position
          powerUp.y += objectSpeed;

          // Check collision with player
          if (
            powerUp.y + powerUp.height >= player.y &&
            powerUp.x >= player.x &&
            powerUp.x <= player.x + player.width
          ) {
            activatePowerUp(powerUp);
            powerUps.splice(i, 1);
          }

          // Check if the power-up reached the bottom
          if (powerUp.y + powerUp.height > canvas.height) {
            powerUps.splice(i, 1);
          }
        }

        // Draw obstacles
        for (let i = 0; i < obstacles.length; i++) {
          const obstacle = obstacles[i];
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

          // Update obstacle position
          obstacle.y += obstacle.speed;

          // Check collision with player
          if (
            obstacle.y + obstacle.height >= player.y &&
            obstacle.x >= player.x &&
            obstacle.x <= player.x + player.width
          ) {
            handleCollisionWithObstacle();
            obstacles.splice(i, 1);
          }

          // Check if the obstacle reached the bottom
          if (obstacle.y + obstacle.height > canvas.height) {
            obstacles.splice(i, 1);
          }
        }

        // Display the score
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);

        if (score >= 50) {
          endGame();
        } else {
          requestAnimationFrame(update);
        }
      }

      // Start the game
      function startGame() {
        score = 0;
        gameOver = false;
        objects.length = 0;
        powerUps.length = 0;
        obstacles.length = 0;

        // Disable difficulty buttons during gameplay
        const difficultyButtons = document.querySelectorAll(
          "#easyButton, #mediumButton, #hardButton"
        );
        difficultyButtons.forEach((button) => {
          button.disabled = true;
        });

        // Enable the restart button
        const restartButton = document.getElementById("restartButton");
        restartButton.disabled = false;
        restartButton.addEventListener("click", restartGame);

        // Generate falling objects at an interval
        objectInterval = setInterval(() => {
          if (!gameOver) {
            objects.push(createObject());
          }
        }, 1000 / objectSpeed);

        // Generate power-ups at an interval
        powerUpInterval = setInterval(() => {
          if (!gameOver) {
            powerUps.push(createPowerUp());
          }
        }, 10000);

        // Generate obstacles at an interval
        setInterval(() => {
          if (!gameOver) {
            obstacles.push(createObstacle());
          }
        }, 5000);

        update();
      }

      // Restart the game
      function restartGame() {
        clearInterval(objectInterval);
        clearInterval(powerUpInterval);
        startGame();
      }

      // Activate power-up
      function activatePowerUp(powerUp) {
        // Customize power-up effects based on the chosen effect property
        if (powerUp.effect === "increaseSpeed") {
          objectSpeed += 1;
        }
      }

      // Handle collision with obstacle
      function handleCollisionWithObstacle() {
        // Customize the penalty or negative effects on collision
        player.width -= 10;
        player.height -= 10;
      }

      // Game over function
      function endGame() {
        clearInterval(objectInterval);
        clearInterval(powerUpInterval);
        gameOver = true;
        const difficultyButtons = document.querySelectorAll(
          "#easyButton, #mediumButton, #hardButton"
        );
        difficultyButtons.forEach((button) => {
          button.disabled = false;
        });
        const restartButton = document.getElementById("restartButton");
        restartButton.disabled = true;
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
      }

      // Event listeners for difficulty buttons
      const easyButton = document.getElementById("easyButton");
      easyButton.addEventListener("click", () => {
        objectSpeed = 1;
        startGame();
      });

      const mediumButton = document.getElementById("mediumButton");
      mediumButton.addEventListener("click", () => {
        objectSpeed = 2;
        startGame();
      });

      const hardButton = document.getElementById("hardButton");
      hardButton.addEventListener("click", () => {
        objectSpeed = 3;
        startGame();
      });