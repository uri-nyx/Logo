let editor;
let t;

function setup(){
    var canvas = createCanvas(window.innerWidth/2-10,window.innerHeight-10)
    canvas.parent('sketch-holder');
    editor = select('#code');
    angleMode(DEGREES)
    t = new Turtle(0);
    editor.input(makeIt);
    makeIt();
}

function makeIt(){
    t.build(0)
    background(51)
    push()
    translate(width/2,height/2)
    chunks = editor.value().split(" ")
    drawChunks(chunks)
    t.makeTurtle()
    pop()
}

function drawChunks(chunks){
    chunks = filterMyChunks(chunks);
    var i=0;
    while(i<chunks.length){
        if(checkIfValidCommand(chunks[i])){
            
            if(chunks[i] == "fd" || chunks[i] == "bk" || chunks[i] == "rt" || chunks[i] == "lt"){
                commands[chunks[i]](chunks[++i])
            }else if(chunks[i] == "repeat"){
                var times = chunks[++i];
                var endon;
                if(chunks[++i] == "["){
                    var nextChunks = chunks.slice(++i)
                    
                    for(var j = 0; j < times;j++){
                        endon = drawChunks(nextChunks)
                        
                    }
                }
                i += endon
                
            }else if(chunks[i] == "]"){
                
                return i
            }else{
                if(commands[chunks[i]]){
                    commands[chunks[i]]()
                }
            }
        }
        i++;
    }
}

function filterMyChunks(chunks){
    arr = chunks
    for(i=0;i<arr.length;i++){
        if(arr[i].substr(0,1) == "[" && arr[i].length > 1){
                arr.splice(i,1,"[",arr[i].substr(1))
        }else if(arr[i].substring(arr[i].length-1) == "]" && arr[i].length > 1){
                arr.splice(i,1,arr[i].substr(0,arr[i].length-1),"]")
        }
    }
    return arr
}

function checkIfValidCommand(command){
    if(commands[command]){
        return true
    }

    if(command.substr(0,1) == "[" || command.substring(command.length-1) == "]"){
        return true
    }

    return false
}

commands = {
    "fd": function(amt){
        t.forward(amt)
    },
    "bk": function(amt){
        t.forward(-amt)
    },
    "rt": function(amt){
        t.setAngle(amt)
    },
    "lt": function(amt){
        t.setAngle(-amt)
    },
    "pu": function(){
        t.pen = false
    },
    "pd": function(){
        t.pen = true
    },
    "ht": function(){
        t.turtleVisible = false
    },
    "st": function(){
        t.turtleVisible = true
    },
    "repeat": function(){
        
    }
}

var realcode;
var animLoop;
var k;

function animateIt(){
    document.getElementById("animBTN").innerHTML = "Stop it";
    document.getElementById("animBTN").setAttribute("onclick","stopIt()");
    k = 10;
    realcode = document.getElementById("code").value;
    var speed = document.getElementById("speed").value;
    setIntervelAnimatedLoop(speed);
     
}

function setIntervelAnimatedLoop(speed){
    animLoop = setInterval(function(){
        document.getElementById("code").value = "rt "+k+" " + realcode;
        k+=speed*1;
        makeIt();
        if(document.getElementById("speed").value != speed){
            clearInterval(animLoop);
            setIntervelAnimatedLoop(document.getElementById("speed").value)
        }
    },10);      
}

function stopIt(){
    document.getElementById("animBTN").innerHTML = "Animate";
    document.getElementById("animBTN").setAttribute("onclick","animateIt()");
    clearInterval(animLoop);
    document.getElementById("code").value = realcode;
    makeIt();
}