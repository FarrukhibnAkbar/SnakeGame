
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;
var speed;


var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

//result
var result=0;
var resultValueElement;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    resultValueElement = document.getElementById("resultValue");
    var UpButton = document.getElementById("up")
    var DownButton = document.getElementById("down")
    var LeftButton = document.getElementById("left")
    var RightButton = document.getElementById("right")

    placeFood();
    document.addEventListener("keyup", changeDirection);
    UpButton.addEventListener("click", changeUp);
    DownButton.addEventListener("click", changeDown);
    LeftButton.addEventListener("click", changeLeft);
    RightButton.addEventListener("click", changeRight);


    setInterval(update, 200); //200 millisecond
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if ( snakeX == foodX && snakeY==foodY) {
        snakeBody.push([foodX, foodY])
        result += 1;
        resultValueElement.textContent = result;
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX *blockSize;
    snakeY += velocityY *blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }    
    }

}
function changeUp(e) {
    if (velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
}
function changeDown(e) {
    if (velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
}
function changeLeft(e) {
    if (velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}
function changeRight(e) {
    if (velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    //
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    
}