class Food{
    constructor(ctx){
        this.ctx = ctx;
        this.size = 10;
        this.setRandomPoint();
    }
    show = ()=>{
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    remove = () =>{
        this.ctx.clearRect(this.x,this.y,this.size,this.size);
    }

    toggle = ()=>{
        this.remove();
        this.setRandomPoint();
        this.show();
    }
    setRandomPoint = ()=>{
        this.x = Math.round(Math.random()*this.ctx.canvas.width);
        this.y = Math.round(Math.random()*this.ctx.canvas.height);
    }

}