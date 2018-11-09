class Turtle{

    constructor(angle){
        this.build(angle)
    }

    build(angle){
        this.angle = angle
        this.pen = true;
        this.turtleVisible = true;
        this.weight = 2;
        this.penColor = 255
    }

    forward(amt){
        try {
            stroke(this.penColor)
        }catch{
            stroke(255)
        }
        if(this.pen){
            strokeWeight(this.weight)
            line(0,0,amt,0)
        }
        translate(amt,0)
    }

    setAngle(angle){
        rotate(angle)
    }

    makeTurtle(){
        if(this.turtleVisible){
            try {
                stroke(this.penColor)  
                fill(this.penColor)
            } catch (error) {
                stroke(255)   
                fill(255)
            }                   
            strokeWeight(this.weight)
            triangle(0,-5,0,+5,10,0)
        }
    }

    drawDot(){
        try {
            stroke(this.penColor)  
            fill(this.penColor)
        } catch (error) {
            stroke(255)   
            fill(255)
        }
        ellipse(0, 0, this.weight*2, this.weight*2)
    }

}