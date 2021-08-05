let canvas,
    WIDTH,
    HEIGHT,
    ctx,
    x   = 30,
    y   = 0,
    dir = "r",
    dif = 10,
    snake ,
    oldTimeStamp,
    total = 0;

function init(){
    canvas = document.querySelector("#can");
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext("2d");
    snake = new Snake(ctx, x, y, 10,10, "#f00");
    snake.push();
    snake.push();
    snake.push();
    snake.push();
    snake.push();
    snake.push();
    snake.drow();
    window.requestAnimationFrame(loop);
}

function loop (stamp){
    secondsPassed = (stamp - oldTimeStamp) / 1000;
    oldTimeStamp = stamp;
    if(!isNaN(secondsPassed)){
        total = total + secondsPassed;
    }
    if(total > .200){
        total = 0;
        clear();
        if(dir === "r") {
            x = x+dif;
        }else if(dir === "l"){
            x = x-dif;
        }else if(dir === "u"){
            y = y-dif;
        }else if(dir === "d"){
            y = y+dif;
        }
        snake.update(x,y);       
    }

    window.requestAnimationFrame(loop);
}


document.addEventListener("keydown" , e =>{
    if(e.code === "KeyD" && dir !== "l") dir = 'r';
    else if(e.code === "KeyA" && dir !== "r") dir = 'l';
    else if(e.code === "KeyS" && dir !== "u") dir = 'd';
    else if(e.code === "KeyW" && dir !== "d") dir = 'u';

})

const clear = () =>{
    ctx.clearRect(0,0,WIDTH,HEIGHT);
}