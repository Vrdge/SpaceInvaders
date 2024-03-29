import { drawBullet, shoot } from "./BulletControl.js";
import { drawPilot } from "./PilotControl.js";
import EnemyControl from "./EnemyControl.js";
import { props } from "./props.js";
import { drawEnemyBullet } from "./EnemyBulletControl.js";


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const Btn =  document.getElementById('Restart')

const backgroundImage = new Image()
backgroundImage.src = "images/Background.png";


let EnemyControler = new EnemyControl(canvas)


canvas.width = window.innerWidth
canvas.height = window.innerHeight
const width = canvas.width
const height = canvas.height
ctx.fillStyle = 'white'
ctx.font = "30px Arial";

const run = () => {
    EnemyControler.endTheGame()
    ctx.drawImage(backgroundImage, 0, 0, width, height)
    ctx.fillRect(70,height - 70,props.health * 2,50)
    ctx.fillStyle = 'white'
    ctx.fillText(props.health,70,height - 90,)
    EnemyControler.draw(ctx)
    drawPilot(ctx, shoot)
    drawBullet(ctx)
    drawEnemyBullet(ctx)
    checkHealtr()

}
const checkHealtr = ()=>{
    if(props.health === 0){
        props.IsGameOver = true
    }
}
const GameRestart = (ev) => {
    // if (ev.x > props.width / 2 - 100 && ev.x < props.width / 2 + 100 && ev.y > props.height / 2 -100 && ev.y < props.height / 2 + 100) {

        
    //  }
     Btn.addEventListener('click', ()=>{
        Btn.style.display = 'none'
        EnemyControler = new EnemyControl(canvas)
        props.splashAttack =  false
        props.allowed = false
        props.IsGameOver = false
        props.health = 100
     })
}
export const GameOver = () => {
    Btn.style.display= 'block'
}

document.addEventListener('click', (ev) => {
    if(props.IsGameOver){
        GameRestart(ev)
    }
})


setInterval(() => {
    if (props.IsGameOver === false) {
        run()
    } else if (props.IsGameOver === true) {
        GameOver()
    }
}, 1);