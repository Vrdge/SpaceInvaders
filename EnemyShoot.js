import { EnemyShootBullet } from "./EnemyBulletControl.js";

let x,y;
export const EnemyShoot = (EnemyRows) => {

    let randomRow = Math.floor(Math.random() * 7);
    let randomRowLength = EnemyRows[randomRow].length
    let randomEnemyIndex = Math.floor(Math.random() *(randomRowLength) );
    let randomEnemy = EnemyRows[randomRow][randomEnemyIndex]
    x = randomEnemy.x
    y = randomEnemy.y

    EnemyShootBullet(x,y,2,50)
}


