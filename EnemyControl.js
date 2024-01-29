import { collide } from "./BulletControl.js";
import Enemy from "./Enemy.js"
import { EnemyShoot } from "./EnemyShoot.js";
import { props } from "./props.js";
const MovingState = {
    down: 0,
    stand: 1,
    left: 2,
    right: 3,
    goDown: 4,
    goDownBool:false
}

export default class EnemyControl {
    EnemyGrid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


    ]




    RandomX = 200;
    BottomMostEnemy;
    EnemyRows = []
    xSpeed = 0
    YSpeed = 0
    YPosition = 0

    Score = 0;

    currentState = MovingState.right

    StartingSpeed = 1
    constructor(canvas) {
        this.canvas = canvas
        this.InitializeEnemies()
    }

    InitializeEnemies() {
        this.EnemyGrid.forEach((row, rowIndex) => {
            this.EnemyRows[rowIndex] = []
            row.forEach((EnemyNumber, EnemyIndex) => {
                if (EnemyNumber > 0) {
                    this.EnemyRows[rowIndex].push(new Enemy(EnemyIndex * 66, rowIndex * 44, EnemyNumber))
                }
            })
        })
    }
    bulletColliderect() {
        this.EnemyRows.forEach(EnemyRow => {

            EnemyRow.forEach((Enemy, EnemyIndex) => {
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
                            this.Score += 90
                            break;

                        default:
                            break;
                    }
                    console.log(this.EnemyRows);

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
        EnemyShoot(this.EnemyRows)

    }
    endTheGame() {
        if (this.EnemyRows.length === 0 && props.IsGameOver === false) {
            props.IsGameOver = true
        }
    }

    ChangeStats() {
        if (this.currentState === MovingState.right) {
            MovingState.goDownBool = false
            this.XSpeed = this.StartingSpeed
            const lengths = this.EnemyRows.map(row => row.length);
            let longestOnesIndex = lengths.indexOf(Math.max(...lengths));
            let RightMostEnemy = this.EnemyRows[longestOnesIndex][this.EnemyRows[longestOnesIndex].length - 1]
            if (RightMostEnemy.x === props.width - 44) {
                this.currentState = MovingState.left
                MovingState.goDownBool = true
            }
        } else if (this.currentState === MovingState.left) {
            MovingState.goDownBool = false
            this.XSpeed = this.StartingSpeed * -1
            for (let i = 0; i < this.EnemyRows.length; i++) {
                const leftMostEnemy = this.EnemyRows[i][0]
                if (leftMostEnemy.x  <=0) {
                    this.currentState = MovingState.right
                    MovingState.goDownBool = true
                }
            }
        }
        else if (this.currentState === MovingState.stand) {
            props.isDoneMoving = true
        }
        else if (this.currentState = MovingState.goDown) {
            if (this.currentState === MovingState.right) {
                this.currentState = MovingState.left
            } else if (this.currentState === MovingState.left) {
                this.currentState = MovingState.right
            }
        }

    }
    drawEnemies(ctx) {
        this.EnemyRows.flat().forEach((enemy) => {
            if (props.isDoneMoving === false) {
                enemy.move(this.XSpeed,MovingState.goDownBool) /*this.XSpeed */
            }
            enemy.draw(ctx);
        })
    }


}








