class Game{
    constructor(root,lev = .1){
        this.root = root;
        this.x   = 30;
        this.y   = 0;
        this.dir = "r";
        this.dif = 10;
        this.lev = lev;
        this.score = 0;
        this.highScore = this.score;
        this.total = 0;
        this.isPaused = false;
        this.setListener();
    }
    
    onScore = null;
    onHighScore = null;
    
    pause = () =>{
        this.isPaused = true;
    }

    resume = () =>{
        this.isPaused = false;
        this.loop();
    }

    restart = ()=>{
        this.x = 30;
        this.y = 10;
        delete(this.snake);
        this.dir = 'r'
        this.start();
    }

    start = ()=>{
        this.isPaused = false;
        this.canvas = this.root;
        this.HEIGHT = this.canvas.height;
        this.WIDTH = this.canvas.width;
        this.ctx = this.canvas.getContext("2d");
        this.snake = new Snake(this.ctx, this.x, this.y, 10, "#f00");
        this.snake.push(this.dir);
        this.food = new Food(this.ctx);

        if(this.onScore)      this.onScore(this.score);
        
        window.requestAnimationFrame(this.loop);
    }

    loop = (stamp) =>{
        if(this.isPaused){
            return;
        }
        let secondsPassed = (stamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = stamp;
        if(!isNaN(secondsPassed)){
            this.total = this.total + secondsPassed;
        }
        if(this.total > this.lev){
            this.total = 0;
              
            if(this.dir === "r") {
                this.x = this.x+this.dif;
            }else if(this.dir === "l"){
                this.x = this.x-this.dif;
            }else if(this.dir === "u"){
                this.y = this.y-this.dif;
            }else if(this.dir === "d"){
                this.y = this.y+this.dif;
            }
            if(this.snake.hitsWall(this.x,this.y)){
                this.score = 0;
                return this.gameover(1000);
            }
            if(this.snake.hitsSelf()){
                this.score = 0;
                return this.gameover(1001);
            }
            this.clear();
            this.food.show()
            this.snake.update(this.x,this.y);
            if(this.isSnakeFeded()){
                this.score = this.score + 1;
                this.setHighScore();
                if(this.onScore){
                    this.onScore(this.score);
                }
                this.food.toggle();
                this.snake.push();
            }
            
            
        }

        window.requestAnimationFrame(this.loop);
    }


    setListener = ()=>{
        document.addEventListener("keydown" , e =>{
            if(e.code === "ArrowRight" && this.dir !== "l") this.dir = 'r';
            else if(e.code === "ArrowLeft" && this.dir !== "r") this.dir = 'l';
            else if(e.code === "ArrowDown" && this.dir !== "u") this.dir = 'd';
            else if(e.code === "ArrowUp" && this.dir !== "d") this.dir = 'u';
        })
        if(this.listen){
            this.listen();
        }
    }

    clear = () =>{
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    }


    isSnakeFeded = () => {
        if(this.getDist(this.snake.center,this.food.center) < 8 ){
            return true;
        }
        return false;
    }

    getDist = (a , b) => {
        let c = Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
        return c;
    }


    gameover = (code) =>{
        if(code === 1000){
           return console.log("you hit")
        }
        if(code === 1001){
            return console.log("you bite yourself");
        }
        console.log("stoped")
    }


    setHighScore = ()=>{
        if(this.score > this.highScore){
            this.highScore = this.score;
            if(this.onHighScore){
                this.onHighScore(this.highScore);
            }
        }
    }

}
