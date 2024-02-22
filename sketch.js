let editor;
let t;

const FD = "pal"; // forwards
const BK = "pat"; // backwards
const RT = "dcha"; // rigth turn
const LT = "izda"; // left turn
const PT = "gro"; // pen thickness
const PC = "col"; // pen color
const HT = "esc"; // hide turtle
const ST = "ens"; // show turtle
const DT = "pt"; // dot
const PU = "lev"; // pen up
const PD = "dib"; // pen down
const REP = "rep";

const FORWARD = "palante"; // forwards
const BAKCWARD = "patrás"; // backwards
const RIGTH = "derecha"; // rigth turn
const LEFT = "izquierda"; // left turn
const PENTH = "grosor"; // pen thickness
const PENCOL = "color"; // pen color
const HIDE = "esconde"; // hide turtle
const SHOW = "enseña"; // show turtle
const DOT = "punto"; // dot
const PENUP = "levanta"; // pen up
const PENDOWN = "dibuja"; // pen down
const REPEAT = "repite";

const one_arg = [FD, BK, RT, LT, PT, PC,
                FORWARD, BAKCWARD, RIGTH, LEFT, PENTH, PENCOL];
const repeats = [REP, REPEAT];

let sizew = window.innerWidth;
let sizex = window.innerHeight;
let editor_id = "#code";


function setup(){
    if (window.innerWidth < 600 || window.innerHeight < 600) {
        editor_id = "#code-mobile";
        sizew = window.innerWidth * 0.90;
        sizex = window.innerHeight/2;
    } else {
        editor_id = "#code";
        sizew = window.innerWidth/2-20;
        sizex = window.innerHeight * 0.685;
    }

    var canvas = createCanvas(sizew,sizex)
    canvas.parent('sketch-holder');
    editor = select(editor_id);
    angleMode(DEGREES)
    t = new Turtle(0);
    editor.input(makeIt);
    makeIt();
}

function windowResized() {
    if (window.innerWidth < 600 || window.innerHeight < 600) {
        editor_id = "#code-mobile";
        sizew = window.innerWidth * 0.90;
        sizex = window.innerHeight/2;
    } else {
        editor_id = "#code";
        sizew = window.innerWidth/2-20;
        sizex = window.innerHeight * 0.685;
    }
    resizeCanvas(sizew, sizex);
    editor = select(editor_id);
    editor.input(makeIt);
    makeIt();
  }

function makeIt(){
    t.build(0)
    clear()
    background(51, 0)
    push()
    translate(sizew/2,sizex/2);
    chunks = editor.value().split(/\s+/)
    drawChunks(chunks)
    t.makeTurtle()
    pop()
}

function drawChunks(chunks){
    chunks = filterMyChunks(chunks);
    var i=0;
    var comment = false;
    while(i<chunks.length){
        if(comment){
            if(chunks[i] == "}"){
                comment = false;
            }
            i++;
            continue;
        }
        if(chunks[i] == "{"){
            comment = true;
            i++;
            continue;
        }
        if(checkIfValidCommand(chunks[i])){
            if(one_arg.includes(chunks[i])){
                commands[chunks[i]](chunks[++i])
            }else if(repeats.includes(chunks[i])){
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
    [FD]: function(amt){
        t.forward(parseFloat(amt))
    },
    [BK]: function(amt){
        t.forward(-parseFloat(amt))
    },
    [RT]: function(amt){
        t.setAngle(parseFloat(amt))
    },
    [LT]: function(amt){
        t.setAngle(-parseFloat(amt))
    },
    [PU]: function(){
        t.pen = false
    },
    [PD]: function(){
        t.pen = true
    },
    [HT]: function(){
        t.turtleVisible = false
    },
    [ST]: function(){
        t.turtleVisible = true
    },
    [PT]: function(amt){
        t.weight = parseFloat(amt)
    },
    [PC]: function(amt){
        t.penColor = amt
    },
    [DT]: function(){
        t.drawDot()
    },
    [REPEAT]: function(){
        
    },

    [FORWARD]: function(amt){
        t.forward(parseFloat(amt))
    },
    [BAKCWARD]: function(amt){
        t.forward(-parseFloat(amt))
    },
    [RIGTH]: function(amt){
        t.setAngle(parseFloat(amt))
    },
    [LEFT]: function(amt){
        t.setAngle(-parseFloat(amt))
    },
    [PENUP]: function(){
        t.pen = false
    },
    [PENDOWN]: function(){
        t.pen = true
    },
    [HIDE]: function(){
        t.turtleVisible = false
    },
    [SHOW]: function(){
        t.turtleVisible = true
    },
    [PENTH]: function(amt){
        t.weight = parseFloat(amt)
    },
    [PENCOL]: function(amt){
        t.penColor = amt
    },
    [DOT]: function(){
        t.drawDot()
    },
    [REP]: function(){
        
    }
}

var realcode;
var animLoop;
var k;

function animateIt(){
    document.getElementById("animBTN").innerHTML = "Parar";
    document.getElementById("animBTN").setAttribute("onclick","stopIt()");
    k = 10;
    realcode = document.getElementById("code").value;
    var speed = document.getElementById("speed").value;
    setIntervelAnimatedLoop(speed);
     
}

function setIntervelAnimatedLoop(speed){
    animLoop = setInterval(function(){
        document.getElementById("code").value = "derecha "+k+" " + realcode;
        k+=speed*1;
        makeIt();
        if(document.getElementById("speed").value != speed){
            clearInterval(animLoop);
            setIntervelAnimatedLoop(document.getElementById("speed").value)
        }
    },10);      
}

function stopIt(){
    document.getElementById("animBTN").innerHTML = "Animar";
    document.getElementById("animBTN").setAttribute("onclick","animateIt()");
    clearInterval(animLoop);
    document.getElementById("code").value = realcode;
    makeIt();
}

function saveFileAs() {
	if (promptFilename = prompt("Nombre del archivo:", "paco")) {
		var textBlob = new Blob([document.getElementById(editor_id.substring(1)).value], {type:'text/plain'});
		var downloadLink = document.createElement("a");
		downloadLink.download = promptFilename + ".txt";
        console.log(downloadLink.download);
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.URL.createObjectURL(textBlob);
		downloadLink.click();
    delete downloadLink;
    delete textBlob;
	}
}

function saveCanvasPropmt() {
    if (promptFilename = prompt("Nombre de la imagen:", "paco")) {
        saveCanvas(promptFilename);
    }
}