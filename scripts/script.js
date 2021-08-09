const canvas = document.querySelector("#can");
let score = document.querySelector("#score");

let game; 

function getStarted(){
    game = new Game(canvas);
    game.gameover = (code) => {
        if (code === 1000) {
            score.innerText = `You hit`;
        }else if(code === 1001) {
            score.innerText = "you bite";
        }
        console.log("Game over");
    }
    game.start();
}

