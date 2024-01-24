import { collide } from "./BulletControl.js";
import Enemy from "./Enemy.js"
import { props } from "./props.js";
const MovingState = {
    down: 0,
    stand: 1,
}

export default class EnemyControl {
    EnemyGrid = [
        [1,2]
    ]



    RandomX;
    BottomMostEnemy
    EnemyRows = []
    xSpeed = 0
    YSpeed = 0
    YPosition = 0

    Score = 0;

    currentState = MovingState.down
    
    StartingSpeed = 1
    constructor(canvas, BulletControler) {
        this.BulletControler = BulletControler
        this.canvas = canvas
        this.InitializeEnemies()
    }
        
    InitializeEnemies() {
        this.GetRandomValue(0, this.canvas.width / 1.5)
        this.EnemyGrid.forEach((row, RowIndex) => {
            this.EnemyRows[RowIndex] = []
            row.forEach((EnemyNumber, EnemyIndex) => {
                if (EnemyNumber > 0) {
                    this.EnemyRows[RowIndex].push(new Enemy(EnemyIndex * 66 + this.RandomX, RowIndex * 44 - 44 * this.EnemyGrid.length, EnemyNumber))
                }
            })
        })
    }
    bulletColliderect() {

        this.EnemyRows.forEach(EnemyRow => {

            EnemyRow.forEach((Enemy, EnemyIndex) => {
                // if (collide(Enemy)) {

                if (collide(Enemy)) {
                    EnemyRow.splice(EnemyIndex, 1)
                    switch (Enemy.type) {
                        case 1:
                            this.Score += 5
                            break;
                        case 2:
                            this.Score += 10
                            break;
                        case 3:
                            this.Score += 50
                            break;

                        default:
                            break;
                    }
                }

            })
        });
        this.EnemyRows = this.EnemyRows.filter((enemyRow) => enemyRow.length > 0)
    }

    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.font = "30px Arial";
        ctx.fillText(this.Score, 30, 40)
        this.ChangeStats()
        this.bulletColliderect()
        this.drawEnemies(ctx);

    }
    endTheGame (){
        if(this.EnemyRows.length === 0 && props.IsGameOver === false ){
            props.IsGameOver = true
        }
    }

    GetRandomValue(min, max) {
        this.RandomX = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ChangeStats() {
        if (this.currentState === MovingState.down) {
            for (let index = 0; index < this.EnemyRows.length; index++) {
                this.YSpeed = this.StartingSpeed
                const BottomRowEnemy = this.EnemyRows[this.EnemyRows.length - 1][0]

                if (BottomRowEnemy.y + this.canvas.height / 1.7 >= this.canvas.height) {
                    this.currentState = MovingState.stand
                    break
                }
            }
        } else if (this.currentState === MovingState.stand) {
            this.YSpeed = 0
        } else if (this.currentState = MovingState.goBack) {

        }

    }
    drawEnemies(ctx) {
        this.EnemyRows.flat().forEach((enemy) => {
            if (this.YSpeed > 0) {
                enemy.move(this.YSpeed)
            }
            enemy.draw(ctx);
        })
    }


}