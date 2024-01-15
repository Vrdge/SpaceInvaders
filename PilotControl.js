let speed = 3
let xPos = window.screen.width / 2 - 42.4
let yPos = window.screen.height - 92.4 * 2

let image = new Image().src = `images/SpaceShip.png`
let width = 94.8
let height = 92.4

const canvas = document.getElementById("canvas")


let moveLeft = false
let moveRight = false
let shoot = false

const keyDown = (ev) => {
    switch (ev.keyCode) {
        case 37:
            moveLeft = true
            break
        case 39:
            moveRight = true
            break
        case 32:
            shoot = true
            break
    }
}
const keyUp = (ev) => {
    switch (ev.keyCode) {
        case 37:
            moveLeft = false
            break
        case 39:
            moveRight = false
            break
        case 32:
            shoot = false
            break
    }
}

document.addEventListener('keyup', keyUp)
document.addEventListener('keydown', keyDown)




const checkBorder = () => {
    if (xPos >= canvas.width - 100) {
        xPos = canvas.width - 100

    } else if (xPos <= 0) {
        xPos = 0
    }
}

const move = () => {
    if (moveLeft === true) {
        xPos -= speed
    } else if (moveRight === true) {
        xPos += speed
    }
}

export const drawPilot = (ctx,bulletControler,/*shoot */) => {
    if (shoot === true) {
            // shoot(xPos + width / 2, yPos, 5, 5)
            bulletControler.shoot(xPos + width / 2, yPos, 5, 5)
    }
    move()
    checkBorder()
    ctx.drawImage(image, xPos, yPos, width, height)

}