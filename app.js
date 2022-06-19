alert(
    "Don't have smol screenz"
)

var snake = [{ x:375, y:375 }]
const startButton = document.querySelector("#strt")
const size = 25
const gameBoardColor = "#302B27"
const foodColor = "#F28482"
const foodBorderColor = "#F7EDE2"
const foodBorderSize = 2
const snakeColor = "#D6EEFF"
const snakeBorderColor = "#F7EDE2"
const snakeBorderSize = 2
var canvas = document.getElementById('gameBoard')
var ctx = canvas.getContext('2d')


const speed = 200
var score = 0
var food_x, food_y
var dx = 0
var dy = 0

function strtGame() {
    dx = size
}

function started() {
    if (dx || dy) {
        document.getElementById('strt').style.display = 'none'
    }
    clearCanvas()
    updateSnake()
    checkGameEnd()
    drawFood()
    drawSnake()
    collision()
}

function drawSnake() {
    snake.forEach(snakeBody)
}

function snakeBody(segment) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(segment.x, segment.y, size, size);
    ctx.strokeStyle = snakeBorderColor
    ctx.lineWidth = snakeBorderSize
    ctx.strokeRect(segment.x, segment.y, size, size);
}

function drawFood() {
    if (!food_x && !food_y)
        [food_x, food_y] = randomSpot()
    ctx.fillStyle = foodColor;
    ctx.fillRect(food_x, food_y, size, size);
    ctx.strokeSTyle = foodBorderColor
    ctx.lineWidth = foodBorderSize
    ctx.strokeRect(food_x, food_y, size, size);
}

function updateScore() {
    document.getElementById('score').innerHTML = score
}

function checkGameEnd() {
    snake.slice(1).forEach(function (segment) {
        if (snake[0].x === segment.x && snake[0].y === segment.y) {
            document.getElementById('gameOver').style.display = 'block'
            document.getElementById('again').style.display = 'block'
            clearInterval(gameLoop)
        }
    })
}

function collision() {
    if (snake[0].x <= 0 || snake[0].x >= (canvas.width - 24) || 
        snake[0].y <=0 || snake[0].y >= (canvas.height - 24)) {
        document.getElementById('gameOver').style.display = 'block'
        document.getElementById('again').style.display = 'block'
        clearInterval(gameLoop)
    }
}



function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gameBoardColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomSpot() {
    return [Math.floor(Math.random() * canvas.width / size) * size,
        Math.floor(Math.random() * canvas.height / size) * size
    ]
}

function updateSnake() {
    var x, y
    if (snake[0].y + dy >= canvas.height) {
        y = 0
    } else if (snake[0].y + dy <= -size) {
        y = canvas.height - size
    } else {
        y = snake[0].y + dy
    }
    if (snake[0].x + dx >= canvas.width) {
        x = 0
    } else if (snake[0].x + dx <= -size) {
        x = canvas.width - size
    } else {
        x = snake[0].x + dx
    }
    head = {
        x: x,
        y: y
    }
    snake.unshift(head)
    if (head.x === food_x && head.y === food_y) {
        [food_x, food_y] = randomSpot()
        score++
        updateScore()
    } else {
        snake.pop()
    }
}

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        //up
        case 87:
            if (dy === 0) {
                dx = 0
                dy = -size
            }
            break;
        //right
        case 68:
            if (dx === 0) {
                dx = size
                dy = 0
            }
            break;
        //down
        case 83:
            if (dy === 0) {
                dx = 0
                dy = size
            }
            break;
        //left
        case 65:
            if (dx === 0) {
                dx = -size
                dy = 0
            }
            break;
    }
});
const gameLoop = setInterval(started, speed)
startButton.addEventListener("click", strtGame)