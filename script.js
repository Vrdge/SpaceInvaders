import { drawBullet, shoot } from "./BulletControl copy.js";
import BulletControl from "./BulletControl.js";
import EnemyControl from "./EnemyControl.js";

import { drawPilot } from "./PilotControl.js";


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const maxBullets = 5

const background = new Image()
background.src =  "images/Background.png";

const BulletControler = new BulletControl(canvas,maxBullets,'red')
const EnemyControler = new EnemyControl(canvas,BulletControler)


canvas.width = window.screen.width -100
canvas.height = window.screen.height -100
const width = canvas.width
const height = canvas.height


const run = ()=>{

    ctx.drawImage(background, 0, 0, width, height)

    EnemyControler.draw(ctx)
    
    drawPilot(ctx,BulletControler)
    // drawPilot(ctx,shoot)

    BulletControler.draw(ctx)
    // drawBullet(ctx)
}

setInterval(() => {
        run()
}, 10);