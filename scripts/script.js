const canvas = document.querySelector("#can");
const score = document.querySelector("#score");
const highScore = document.querySelector("#high-score");
const gameOverCard = document.querySelector("#gameover-card");
const controll = document.querySelector("#controll ul");
const clientWidth = window.innerWidth;
let lev = .1;
if(clientWidth < 601){
    lev = .2; 
    canvas.width = 200;
    canvas.height = 200;
}

controll.addEventListener("click",e=>{
    console.log(e.target.innerText);
    if(e.target.innerText === "RIGHT" && game.dir !== "l")game.dir = 'r';
    else if(e.target.innerText === "LEFT" && game.dir !== "r") game.dir = 'l';
    else if(e.target.innerText === "DOWN" && game.dir !== "u") game.dir = 'd';
    else if(e.target.innerText === "UP" && game.dir !== "d") game.dir = 'u';
});

let game;

function getStarted(){
    game = new Game(canvas,lev);
    game.gameover = (code) => {
        if (code === 1000) {
            score.innerText = `You hit`;
        }else if(code === 1001) {
            score.innerText = "you bite";
        }
        console.log("Game over");
    }
    game.onScore = (s)=>{
        score.innerText = s;
    }  
    game.onHighScore = (hs) =>{
        highScore.innerText = hs;
    }
    game.gameover = (c)=>{
        gameOverCard.classList.remove("hide");
        gameOverCard.querySelector("button").addEventListener('click',()=>{
            score.innerText = 0;
            game.restart();
            gameOverCard.classList.add("hide"); 
        })
    }
    game.start();
}

