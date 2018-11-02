class Turtle{

    constructor(angle){
        this.build(angle)
        this.turtleVisible = true;
    }

    build(angle){
        this.angle = angle
        this.pen = true;
    }

    forward(amt){
        stroke(255)
        if(this.pen){
            strokeWeight(2)
            line(0,0,amt,0)
        }
        translate(amt,0)
    }

    setAngle(angle){
        rotate(angle)
    }

    makeTurtle(){
        if(this.turtleVisible){
            stroke(255)
            triangle(0,-5,0,+5,10,0)
        }
    }

}