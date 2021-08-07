
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
        this.draw();
        return false
    }
    
    hitsWall = (x = this.body[0].x ,y = this.body[0].y)=>{
        if(
            (x < 0) ||
            (x >= this.ctx.canvas.width) ||
            (y < 0) ||
            (y >= this.ctx.canvas.height)
        ){
            return true;
        }
        return false;
    }

    push = () =>{
        this.body.push ({
            x : this.body[this.tail].x - this.width ,
            y : this.body[this.head].y
        });
        this.tail++;
    }

    draw = ()=>{
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
        this.setRect();
    }

    hitsSelf = () =>{
        let i = 0;
        for(let j = i+1; j <this.body.length; j++){
            if(this.isCross(this.body[i],this.body[j])){
                return true;
            }
        }
        
        return false;
    }

    setRect = () => {
        this.rect = this.getRect(this.body[0]);
        this.setCenter(this.rect);
    }

    setCenter = box =>{
        this.center = {
            x: (box.A.x + (this.width/2)),
            y: (box.A.y + (this.height/2))
        }
    }

    getDist = (a , b) => {
        let c = Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
        return c;
    }

    isCross = (A,B) =>{
        A = this.getRect(A);
        B = this.getRect(B);
        let dist = this.getDist(this.getCenter(A),this.getCenter(B));        
        if(dist < this.width){
            console.log(dist);
            return true;
        }
        return false;
    }

    getRect = (point)=>{
        if(!point){
            return this.rect;
        }
        let rect = {
            A : {
                x : point.x,
                y : point.y
            },
            B : {
                x : point.x + this.width,
                y : point.y
            },
            C : {
                x : point.x + this.width,
                y : point.y + this.height
            },
            D : {
                x : point.x,
                y : point.y + this.height
            }
        }
        return rect;
    }

    getCenter = (rect)=>{
        if(!rect){
            rect = this.rect;
        }

        let center = {
            x : rect.A.x + (this.width/2),
            y : rect.A.y + (this.height/2)
        }

        return center;

    }
}
