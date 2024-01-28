import EnemyBullet from "./EnemyBullet.js";
import { props } from "./props.js";

const canvas = document.getElementById("canvas")
const colorBullet = "red"
let TimeUntilNextBulletAllowed = 0
let bullets = []


export const EnemyShootBullet = (xPos, yPos, speed, timeOutUntilNextBullet = 0) => {
    if (TimeUntilNextBulletAllowed <= 0) {
        const bullet = new EnemyBullet(canvas, xPos, yPos, speed, colorBullet)
        bullets.push(bullet)
        TimeUntilNextBulletAllowed = timeOutUntilNextBullet

    }
    
}


export const EnemyCollide = (xPos,yPos,width,height) => {
    const colidedBullet = bullets.findIndex(bullet => bullet.collide(xPos,yPos,width,height));
    if (colidedBullet >= 0) {
            bullets.splice(colidedBullet, 1)
            props.health -=10
        return true

    }
    return false
}


export const drawEnemyBullet = (ctx) => {
    bullets.forEach((bullet) => { bullet.draw(ctx); })
    if (TimeUntilNextBulletAllowed > 0) {
        TimeUntilNextBulletAllowed--
    }
    if(props.IsGameOver) {
        bullets = []
    }

}



