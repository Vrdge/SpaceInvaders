import { drawBullet, shoot } from "./BulletControl.js";
import { drawPilot } from "./PilotControl.js";
import EnemyControl from "./EnemyControl.js";
import { props } from "./props.js";


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");


const backgroundImage = new Image()
backgroundImage.src = "images/Background.png";
let EnemyGrid = [
    [1]
]

const EnemyControler = new EnemyControl(canvas, EnemyGrid)


canvas.width = window.screen.width - 100
canvas.height = window.screen.height - 100
const width = canvas.width
const height = canvas.height
ctx.fillStyle = 'white'
ctx.font = "30px Arial";

const run = () => {
    ctx.drawImage(backgroundImage, 0, 0, width, height)
    EnemyControler.draw(ctx)
    drawPilot(ctx, shoot)
    drawBullet(ctx)
}

const GameRestart = (ev) => {
    if (ev.x > 400 && ev.x < 470 && ev.y > 430 && ev.y < 460) {
        props.GameOver = false
    }
}
export const GameOver = ()=>{
    if(props.GameOver === true){
        ctx.fillText('Restart', width / 2 - 60,  height / 2 + 30)
    }
}

document.addEventListener('click', (ev) => {
    GameRestart(ev)
})


setInterval(() => {
        run()
        GameOver()
    
}, 10);