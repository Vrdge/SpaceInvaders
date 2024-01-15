import Bullet from "./Bullet.js";

export default class BulletControl {
    timeOutUntilNextBullet = 0
    bullets = []
    isSplash = false
    constructor(canvas, maxBullets, colorBullet) {
        this.canvas = canvas; 
        this.maxBullets = maxBullets;
        this.colorBullet = colorBullet
    }


    shoot(xPos,yPos,speed,timeOutUntilNextBullet = 0){
        if(this.timeOutUntilNextBullet <= 0 && this.bullets.length < this.maxBullets){
            const bullet = new Bullet(this.canvas,xPos,yPos,speed,this.colorBullet)
            this.bullets.push(bullet)
        }
        this.timeOutUntilNextBullet = timeOutUntilNextBullet
    }



    collide(enemy){
        const colidedBullet = this.bullets.findIndex(bullet => bullet.collide(enemy));

        if(colidedBullet >= 0){
            if(this.isSplash === false){
                this.bullets.splice(colidedBullet,1)
            }
            return true

        }
        return false
    }



    draw(ctx){
        this.bullets = this.bullets.filter(
            (bullet) => bullet.yPos + bullet.width > 0
          );
          ctx.font = "30px Arial";
          ctx.fillStyle = 'white'
          ctx.fillText(this.maxBullets - this.bullets.length, 30, this.canvas.height - 30)
        this.bullets.forEach((bullet) => {bullet.draw(ctx)})
        if(this.timeOutUntilNextBullet > 0 ){
            this.timeOutUntilNextBullet --
        }

    }
}
