import { props } from "./props.js"

let speed = 3
let xPos = window.screen.width / 2 - 42.4
let yPos = window.screen.height - 92.4 * 2

let image = new Image()
image.src = `images/SpaceShip.png`
let width = 94.8
let height = 92.4

const canvas = document.getElementById("canvas")


let moveLeft = false
let moveRight = false
let shootBool = false

const keyDown = (ev) => {
    switch (ev.keyCode) {
        case 37:
            moveLeft = true
            break
        case 39:
            moveRight = true
            break
        case 32:
            shootBool = true
            break
        case 71:
            if (props.allowed) {
                props.splashAttack = true
                break
            }


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
            shootBool = false
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

export const drawPilot = (ctx, shoot) => {
    if (shootBool || props.splashAttack) {
        shoot(xPos + width / 2, yPos, 5, 5, props.splashAttack)
        props.splashAttack = false
    }
    move()
    checkBorder()
    ctx.drawImage(image, xPos, yPos, width, height)
}
