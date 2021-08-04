let canvas,
    WIDTH,
    HEIGHT,
    ctx,
    x   = 0,
    y   = 0,
    dir = "r",
    box ,
    oldTimeStamp ;

function init(){
    canvas = document.querySelector("#can");
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext("2d");
    box = new Box(ctx, x, y, 10,10, "#f00");
    
    window.requestAnimationFrame(loop);
}

function loop (stamp){
    drow();
        // Calculate the number of seconds passed since the last frame
        secondsPassed = (stamp - oldTimeStamp) / 1000;
        oldTimeStamp = stamp;
        fps = Math.round(1 / secondsPassed);

    window.requestAnimationFrame(loop);
}

function drow(){
    clear();
    if(dir === "r") {
        x++;
    }else if(dir === "l"){
        x--;
    }else if(dir === "u"){
        y--;
    }else if(dir === "d"){
        y++;
    }
    box.setxy(x,y)
    box.update();
    
    
}

document.addEventListener("keydown" , e =>{
    if(e.code === "KeyD" && dir !== "l") dir = 'r';
    else if(e.code === "KeyA" && dir !== "r") dir = 'l';
    else if(e.code === "KeyS" && dir !== "u") dir = 'd';
    else if(e.code === "KeyW" && dir !== "d") dir = 'u';

    console.log(e);
})

const clear = () =>{
    ctx.clearRect(0,0,WIDTH,HEIGHT);
}