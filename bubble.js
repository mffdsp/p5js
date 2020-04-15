function Bubble(x, y){
    this.x = x;
    this.y = y;
    this.r = 90;

    this.display = () =>{

        stroke(255);
        fill(255, 100);
        ellipse(this.x, this.y, this.r/2, this.r/2);
    }

    this.update = () =>{
        this.x = x + random(-10, 10);
        thix.y = y + random(-10, 10);
    }

}