export default class Bullet{
    constructor(canvas,xPos,yPos,speed,colorBullet){
        this.canvas = canvas
        this.xPos = xPos
        this.yPos = yPos
        this.speed = speed
        this.colorBullet = colorBullet

        this.width = 5;
        this.height = 7;
    }
    collide(enemy){
        if(this.xPos + this.width > enemy.x
            && this.xPos < enemy.x + enemy.width 
            && this.yPos + this.height > enemy.y 
            && this.yPos < enemy.y + enemy.height){
                return true
        }
        return false
    }

    draw(ctx){
        this.yPos -= this.speed
        ctx.fillStyle = "red";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}