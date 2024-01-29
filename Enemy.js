
export default class Enemy {
    constructor(x, y, ImageNum) {
        this.x = x
        this.y = y
        this.type = ImageNum
        this.width = 44;
        this.height = 44;

        this.image = new Image()
        this.image.src = `images/sprite${ImageNum}.png`

    }
    move(YSpeed,goDown) {
        this.x = this.x + YSpeed
        if(goDown){
            this.y = this.y + 44
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    
}