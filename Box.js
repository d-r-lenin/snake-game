
class Box {
    constructor(ctx,x = 0,y = 0, w, h, color = "#000"){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
        this.update();
    }

    setxy = (x = this.x, y = this.y)=>{
        this.x = x;
        this.y = y;
    }

    update = (x = this.x, y = this.y)=>{
        if(x !== this.x) this.x = x;
        if(y !== this.y) this.y = y;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }

}