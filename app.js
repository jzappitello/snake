alert(
    "Don't have smol screenz"
)

let render = 0
let boardElem = document.getElementById('gameBoard')
const snakeSpeed = 1
const slitheryBody = [{ x:15, y:15}]

function main(timeStamp){
    window.requestAnimationFrame(main)
    const secSinceRender = (timeStamp - render) / 1000
    if (secSinceRender < 1 / snakeSpeed)
    return

    console.log("render")
    render = timeStamp

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    const input = inputDirection;
    for (let i = slitheryBody.length - 2; i >= 0; i--) {
        slitheryBody[i + 1] = { ...slitheryBody[i] }
        slitheryBody[0].x += 0
        slitheryBody[0].y += 1
    }
}
function draw(gameBoard){
    boardElem.innerHTML = ''
    slitheryBody.forEach(segment => {
        const snakeElem = document.createElement('div')
        snakeElem.style.gridRowStart = segment.y
        snakeElem.style.gridColumnStart = segment.x
        snakeElem.classList.add('snake')
        boardElem.appendChild(snakeElem);
    })
}

// let inputDirection = {x: 0, y:0}
// window.addEventListener('keydown', function(e) {
//     if (!['arrowUp', 'arrowRight', 'arrowDown', 'arrowLeft',].includes(e.key))
//     return;
//     e.preventDefault();
//     if (e.key == 'arrowUp') {
//         input.push('up');
//         inputDirection = {x: 0, y: -1}
//         return;
//     }
//     if (e.key == 'arrowRight') {
//         input.push('right');
//         inputDirection = {x: 1, y: 0}
//         return;
//     }
//     if (e.key == 'arrowDown') {
//         input.push('down');
//         inputDirection = {x: 0, y: 1}
//         return;
//     }
//     if (e.key == 'arrowLeft') {
//         input.push('left');
//         inputDirection = {x: -1, y: 0}
//         return;
//     }
// });



// function snake() {
//     this.x = 0;
//     this.y = 0;
//     this.xSpeed = scale * 1;
//     this.ySpeed = 0;
//     this.total = 0;
//     this.tail = [];
    
//     this.draw = function () {
//         for (let i = 0; i < this.tail.length; i++) {}
//     }
// }
