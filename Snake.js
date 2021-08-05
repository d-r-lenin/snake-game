
class Snake {
    constructor(ctx,x = 0,y = 0, w, h, color = "#000"){
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.color = color;
        this.body = [{x,y}];
        this.head = 0;
        this.tail = 0;
        this.update();
    }

    setxy = (x = this.body[this.head].x, y = this.body[this.head].y)=>{
        this.body[this.head] = {x,y}
    }

    update = (x = this.body[this.head].x, y = this.body[this.head].y)=>{
        this.ctx.fillStyle = this.color;
        this.move(x , y);
        this.drow();

    }
        

    pop = ()=>{

    }

    push = () =>{
        this.body.push ({
            x : this.body[this.tail].x - this.width ,
            y : this.body[this.head].y
        });
        this.tail++;
    }

    drow = ()=>{
        this.body.forEach((pos)=>{
            this.ctx.fillRect(pos.x,pos.y,this.width,this.height);
        });
    }

    move = (x,y) =>{
        if(x === this.body[0].x && y === this.body[0].y ){
            return;
        }
        for(let i = this.body.length ; i > 0 ; i--){
            this.body[i] = this.body[i-1];
        }
        this.body.pop();
        this.body[this.head] = { x , y };
    }
}


