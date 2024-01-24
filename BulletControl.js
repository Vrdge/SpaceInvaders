import Bullet from "./Bullet.js";
import { props } from "./props.js";

const maxBullets = 5
const canvas = document.getElementById("canvas")
const colorBullet = 'red'
let timeOutUntilNextBulletOutSide = 0
let bullets = []
let timeUntilNextSplashDamage = 15
let splashAttackLimit = 3

const Ulta = () => {
    setInterval(() => {
        timeUntilNextSplashDamage -= 1
        if (timeUntilNextSplashDamage === -1) {
            clearInterval(Ulta)
            props.allowed = true
            timeUntilNextSplashDamage = 15
        }
    }, 1000);
}
Ulta()

export const shoot = (xPos, yPos, speed, timeOutUntilNextBullet = 0, splashAttack) => {
    const newBullet = (bulletNum, isPenetrating) => {
        const bullet = new Bullet(canvas, xPos, yPos, speed, colorBullet, bulletNum, isPenetrating)
        bullets.push(bullet)
        bullets.push('')
    }
    if (timeOutUntilNextBulletOutSide <= 0 && bullets.length < maxBullets) {
        if (splashAttack === true && bullets.length < maxBullets/2) {
            for (let bulletNum = 0; bulletNum < splashAttackLimit; bulletNum++) {
                newBullet(bulletNum, true)

            }
            props.allowed = false
        } else if (!splashAttack) {
            newBullet(1)
        }


    }
    timeOutUntilNextBulletOutSide = timeOutUntilNextBullet
}
export const collide = (enemy) => {
    const colidedBullet = bullets.findIndex(bullet => bullet.collide(enemy));
    let isPenetratingBullet = bullets.filter(bullet => bullet.isPenetrating === true)
    if (colidedBullet >= 0) {

        if (isPenetratingBullet.length === 0) {
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
    ctx.fillText(timeUntilNextSplashDamage, canvas.width - 60, canvas.height - 30)
    bullets.forEach((bullet) => { bullet.draw(ctx); })
    if (timeOutUntilNextBulletOutSide > 0) {
        timeOutUntilNextBulletOutSide--
    }

}



