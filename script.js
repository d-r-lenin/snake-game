
class Game{
    constructor(){
        this.x   = 30;
        this.y   = 0;
        this.dir = "r";
        this.dif = 10;
        this.total = 0;    
        this.setListener();
        this.init();    
    }
    
    init = ()=>{
        this.canvas = document.querySelector("#can");
        this.HEIGHT = this.canvas.height;
        this.WIDTH = this.canvas.width;
        this.ctx = this.canvas.getContext("2d");
        this.snake = new Snake(this.ctx, this.x, this.y, 10,10, "#f00");
        this.food = new Food(this.ctx);
        window.requestAnimationFrame(this.loop);
    }

    loop = (stamp) =>{
        let secondsPassed = (stamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = stamp;
        if(!isNaN(secondsPassed)){
            this.total = this.total + secondsPassed;
        }
        if(this.total > .200){
            this.total = 0;

            if(this.snake.hitsWall()){
               return;
            }

            this.clear();
            if(this.dir === "r") {
                this.x = this.x+this.dif;
            }else if(this.dir === "l"){
                this.x = this.x-this.dif;
            }else if(this.dir === "u"){
                this.y = this.y-this.dif;
            }else if(this.dir === "d"){
                this.y = this.y+this.dif;
            }
            this.food.show()
            this.snake.update(this.x,this.y);
            
            if(this.snake.hitsFood(this.food)){
                this.food.toggle();
            }
        }

        window.requestAnimationFrame(this.loop);
    }

    setListener = ()=>{
        document.addEventListener("keydown" , e =>{
            if(e.code === "KeyD" && this.dir !== "l") this.dir = 'r';
            else if(e.code === "KeyA" && this.dir !== "r") this.dir = 'l';
            else if(e.code === "KeyS" && this.dir !== "u") this.dir = 'd';
            else if(e.code === "KeyW" && this.dir !== "d") this.dir = 'u';
        })
    }

    clear = () =>{
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    }

}
