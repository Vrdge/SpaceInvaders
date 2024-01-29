import { EnemyShootBullet } from "./EnemyBulletControl.js";

let x,y;
export const EnemyShoot = (EnemyRows) => {
    let EnemyRowsLength = EnemyRows.length
    let randomRow = Math.floor(Math.random() * EnemyRowsLength);
    let randomRowLength = EnemyRows[randomRow].length
    let randomEnemyIndex = Math.floor(Math.random() *(randomRowLength) );
    let randomEnemy = EnemyRows[randomRow][randomEnemyIndex]
    x = randomEnemy.x
    y = randomEnemy.y

    EnemyShootBullet(x,y,2,75)
}


