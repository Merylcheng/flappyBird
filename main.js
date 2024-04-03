  /*----- constants -----*/


  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/


    document.addEventListener('DOMContentLoaded', () => {
        const fish = document.querySelector('.fish');
        const gameDisplay = document.querySelector('.game-container');
        const ground = document.querySelector('.ground');
        const gameOverModal = document.getElementById('gameOverModal');
        const startModal = document.getElementById('startModal');
        const startButton = document.getElementById('startButton');
        const restartButton = document.getElementById('restartButton');
        
    
    let fishX = 220 // location of fish on X-axis
    let fishY = 200 //location of fish on Y-axis
    let gravity = 1.5 // can change direction with -=/+=
    let isGameOver = false
    let isGameRunning = false; // flag to track whether the game is running
    let gap = 430 //fixed pixel amount between pipes
    let score = 0
    let gameTimerId = setInterval(startGame, 20) 

    
    startModal.style.display = 'block'; // Show the start modal initially

    startButton.onclick = function() {
        startModal.style.display = 'none'; // Hide the start modal
        isGameRunning = true; // Set the game running flag to true
        document.addEventListener('click', jump)
        gameTimerId = setInterval(startGame, 20); // Start the game loop
        generatePipe(); 

    };

    restartButton.onclick = function() {
        gameOverModal.style.display = "none";
        restartGame(); // Restart the game when Start button is clicked
        document.addEventListener('click', jump);
      }


    function startGame() { //fish drop when game starts
        if (!isGameRunning) return; 
        fishY -= gravity
        fish.style.bottom = fishY + 'px' //add 100px 
        fish.style.left= fishX + 'px'
    }
   
    // let gameTimerId = setInterval(startGame, 20) 

    function jump() {
        if (!isGameRunning) return; 
        if (fishY < 500) fishY += 50 //fish moves up 50 pixels at every jump and stops it from jumping out of top screen
        fish.style.bottom = fishY + 'px'
        console.log(fishY)
    }

    document.addEventListener('keyup', jump)

function generatePipe() {
    if (!isGameRunning) return; 
    let pipeX = 500
    let randomHeight = Math.random() *60 //pipe generate from 0 to 60 from the ground
    let pipeY = randomHeight
    const pipe = document.createElement('div')
    const topPipe = document.createElement('div')

    if (!isGameOver) {
        pipe.classList.add('pipe')
        topPipe.classList.add('topPipe')
    }
    gameDisplay.appendChild(pipe)
    gameDisplay.appendChild(topPipe)
    pipe.style.left = pipeX + 'px'
    topPipe.style.left =pipeX + 'px'
    pipe.style.bottom = pipeY + 'px'
    topPipe.style.bottom = pipeY + gap + 'px'

    
   function movePipe() {
    if (!isGameRunning) return; 
    pipeX -=2
    pipe.style.left = pipeX + 'px'
    topPipe.style.left = pipeX + 'px'

        if (pipeX === -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(pipe)
            gameDisplay.removeChild(topPipe)
        }

        if (!pipe.passed && pipeX < fishX - 20) {
            score++; // Increase the score by 1
            console.log('score',score);
            document.querySelector('.score').innerText = 'Score: ' + score; // Update the score display
            pipe.passed = true;
          }
    
        //Conditions of GameOver//
        if (
            pipeX > 220 && pipeX < 280 && fishX ===220 &&
            (fishY < pipeY + 145 || fishY > pipeY + gap -200)||
            (fishY > 570 || fishY < 0) 
        ) {
           
            gameOver()
            clearInterval(timerId)
        }
    }        
    let timerId = setInterval(movePipe, 20)    
    setTimeout(generatePipe, 3000)
    }

    function restartGame() {
        isGameOver = false; // Reset game over flag
        fishY = 200; // Reset bird position
        window.location.reload();
    }

generatePipe();

function gameOver() {
    clearInterval(gameTimerId)
    console.log('gameover')
    isGameOver = true
    isGameRunning = false; // Set game running flag to false
    document.removeEventListener('click', jump)
    gameOverModal.style.display = 'block'
}

    }

);

