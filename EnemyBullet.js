export default class EnemyBullet {
    constructor(canvas, xPos, yPos, speed, colorBullet) {
        this.canvas = canvas
        this.xPos = xPos
        this.yPos = yPos
        this.speed = speed
        this.colorBullet = colorBullet

        this.width = 12
        this.height = 15;
    }
    collide(x,y,width,height) {
        if (this.xPos + this.width > x
            && this.xPos < x + width
            && this.yPos + this.height > y
            && this.yPos < y + height) {
            return true
        }
        return false
    }

    draw(ctx) {
        
        this.yPos += this.speed
        ctx.fillStyle = this.colorBullet;
        ctx.fillRect(this.xPos , this.yPos, this.width, this.height);
    }
}