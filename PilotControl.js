import { EnemyCollide } from "./EnemyBulletControl.js"
import { props } from "./props.js"

let speed = 3

let image = new Image()
image.src = `images/SpaceShip.png`
let width = 65.25
let height = 80

let xPos = window.screen.width / 2 + width
let yPos = window.screen.height - 200





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


const checkBulletColliderect = ()=>{
    EnemyCollide(xPos,yPos,width,height)
}

const checkBorder = () => {
    if (xPos >= props.width ) {
        xPos = props.width 

    } else if (xPos <=0) {
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
    checkBulletColliderect()
    checkBorder()
    ctx.drawImage(image, xPos, yPos, width, height)
}
