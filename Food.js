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

    toggle = ()=>{
        this.setRandomPoint();
    }
    setRandomPoint = ()=>{
        let x = Math.round(Math.random()*this.ctx.canvas.width-this.size);
        let y = Math.round(Math.random()*this.ctx.canvas.height-this.size);
        if(x < 10){
            x = x + 9;
        }
        if(y < 10){
            y = y + 9;
        }
        x = Math.round(x/10)*10;
        y = Math.round(y/10)*10;
        this.x = x;
        this.y = y;
        this.setRect();
    }

    setRect = () => {
        this.rect = {
            A : {
                x : this.x,
                y : this.y
            },
            B : {
                x : this.x + this.size,
                y : this.y
            },
            C : {
                x : this.x + this.size,
                y : this.y + this.size
            },
            D : {
                x : this.x,
                y : this.y + this.size
            }
        }
        this.setCenter(this.rect);
    }

    setCenter = box =>{
        this.center = {
            x: (box.A.x + (this.size/2)),
            y: (box.A.y + (this.size/2))
        }
    }
}