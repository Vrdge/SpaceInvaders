export default class PilotControl {


    moveLeft = false
    moveRight = false
    shoot = false
    constructor(canvas, speed, bulletControler) {
        this.canvas = canvas
        this.bulletControler = bulletControler
        this.speed = speed

        this.xPos = window.screen.width / 2 - 42.4
        this.yPos = window.screen.height - 92.4 * 2

        this.width = 94.8
        this.height = 92.4

        this.image = new Image()
        this.image.src = `images/SpaceShip.png`

        // document.addEventListener('keyup', (ev) => {
        //     this.keyUp(ev)
        // })
        // document.addEventListener('keydown', (ev) => {
        //     this.keyDown(ev)
        // })

        document.addEventListener('keyup',this.keyUp)
        document.addEventListener('keydown',this.keyDown)
    }

    keyDown = (ev) => {
        switch (ev.keyCode) {
            case 37:
                this.moveLeft = true
                break
            case 39:
                this.moveRight = true
                break
            case 32:
                this.shoot = true
                break
        }
    }
    keyUp = (ev) => {
        switch (ev.keyCode) {
            case 37:
                this.moveLeft = false
                break
            case 39:
                this.moveRight = false
                break
            case 32:
                this.shoot = false
                break
        }
    }

    move() {
        if (this.moveLeft === true) {
            this.xPos -= this.speed
        } else if (this.moveRight === true) {
            this.xPos += this.speed
        }
    }

    checkBorder() {
        if (this.xPos >= this.canvas.width - 100) {
            this.xPos = this.canvas.width - 100

        } else if (this.xPos <= 0) {
            this.xPos = 0
        }
    }

    draw(ctx) {
        if (this.shoot === true) {
            this.bulletControler.shoot(this.xPos + this.width / 2, this.yPos, 5, 5)
        }
        this.move()
        this.checkBorder()
        ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)

    }
}