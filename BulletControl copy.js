import Bullet from "./Bullet.js";

const maxBullets = 5
const canvas = document.getElementById("canvas")
const colorBullet = 'red'
let timeOutUntilNextBullet = 0
let bullets = []
let isSplash = false

export const shoot = (xPos, yPos, speed, timeOutUntilNextBullet = 0) => {
    if (timeOutUntilNextBullet <= 0 && bullets.length < maxBullets) {
        const bullet = new Bullet(canvas, xPos, yPos, speed, colorBullet)
        bullets.push(bullet)
    }
    timeOutUntilNextBullet = timeOutUntilNextBullet
}
export const collide = (enemy) => {
    const colidedBullet = bullets.findIndex(bullet => bullet.collide(enemy));

    if (colidedBullet >= 0) {
        if (isSplash === false) {
            bullets.splice(colidedBullet, 1)
        }
        return true

    }
    return false
}
export const drawBullet = (ctx) => {
    bullets = bullets.filter(
        (bullet) => bullet.yPos + bullet.width > 0
    );
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white'
    ctx.fillText(maxBullets - bullets.length, 30, canvas.height - 30)
    bullets.forEach((bullet) => { bullet.draw(ctx) })
    if (timeOutUntilNextBullet > 0) {
        timeOutUntilNextBullet--
    }

}


