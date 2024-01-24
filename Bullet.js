export default class Bullet {
    constructor(canvas, xPos, yPos, speed, colorBullet, bulletNum,isPenetrating) {
        this.canvas = canvas
        this.xPos = xPos
        this.yPos = yPos
        this.speed = speed
        this.colorBullet = colorBullet
        this.bulletNum = bulletNum
        this.isPenetrating = isPenetrating

        this.width = 7;
        this.height = 14;
    }
    collide(enemy) {
        if (this.xPos + this.width > enemy.x
            && this.xPos < enemy.x + enemy.width
            && this.yPos + this.height > enemy.y
            && this.yPos < enemy.y + enemy.height) {
            return true
        }
        return false
    }

    draw(ctx) {
        switch (this.bulletNum) {
            case 0:
                this.yPos -= this.speed
                this.xPos -= this.speed / 5
                break
            case 1:
                this.yPos -= this.speed
                break
            case 2:
                this.yPos -= this.speed
                this.xPos += this.speed / 5
                break
        }

        ctx.fillStyle = this.colorBullet;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}