
class Snake {
    constructor(ctx,x = 0,y = 0, size, color = "#000"){
        this.ctx = ctx;
        this.size = size;
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

    push = (dir) =>{

        let newBox =  {
            x:this.body[this.tail].x,
            y:this.body[this.tail].y
        };
        if (dir === "r") {
            newBox.x = newBox.x - this.size;
        } else if (dir === "l") {
            newBox.x = newBox.x + this.size;
        } else if (dir === "u") {
            newBox.y = newBox.y + this.size;
        } else if (dir === "d") {
            newBox.y = newBox.y - this.size;
        }

        this.body.push(newBox);
        this.tail++;
    }

    draw = ()=>{
        this.body.forEach((pos)=>{
            this.ctx.fillRect(pos.x,pos.y,this.size,this.size);
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
        for(let j = 1; j < this.body.length; j++){
            if(this.isCross(this.body[0],this.body[j])){
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
            x: (box.A.x + (this.size/2)),
            y: (box.A.y + (this.size/2))
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
        if(dist < this.size-3){
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
                x : point.x + this.size,
                y : point.y
            },
            C : {
                x : point.x + this.size,
                y : point.y + this.size
            },
            D : {
                x : point.x,
                y : point.y + this.size
            }
        }
        return rect;
    }

    getCenter = (rect)=>{
        if(!rect){
            rect = this.rect;
        }

        let center = {
            x : rect.A.x + (this.size/2),
            y : rect.A.y + (this.size/2)
        }

        return center;

    }
}
