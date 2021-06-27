let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let pencilInput = document.getElementById("pencil-size");
let eraserInput = document.getElementById("eraser-size");
let colors = document.querySelectorAll(".tool-color div");

let pencilSize = 1;
let eraserSize = 1;

pencilInput.addEventListener("change",function(){
    let value = pencilInput.value;
    // console.log(value);
    pencilSize = value;
});

eraserInput.addEventListener("change",() =>{
    let value = eraserInput.value;
    // console.log(value);
    eraserSize = value;
});

for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    color.addEventListener("click",() =>{
        if(color.classList.contains("red")){
            ctx.strokeStyle = "red";
        }
        else if(color.classList.contains("blue")){
            ctx.strokeStyle = "blue";
        }
        else if(color.classList.contains("yellow")){
            ctx.strokeStyle = "yellow";
        }
        else if(color.classList.contains("black")){
            ctx.strokeStyle = "black";
        }
    })
}



let activeTool = "pencil";
pencil.addEventListener("click",function(){
    ctx.lineWidth = pencilSize;
    if(activeTool == "pencil"){
        if(pencilOptions.classList.contains("active-tool-options")){
            pencilOptions.classList.remove("active-tool-options");
        }
        else{
            pencilOptions.classList.add("active-tool-options");
        }
    }
    else{
        eraser.classList.remove("active-tool");
        eraserOptions.classList.remove("active-tool-options");
        pencil.classList.add("active-tool");
        ctx.strokeStyle = "black";
        activeTool = "pencil";
    }
});

eraser.addEventListener("click",function(){
    ctx.lineWidth = eraserSize;
    if(activeTool == "eraser"){
        if(eraserOptions.classList.contains("active-tool-options")){
            eraserOptions.classList.remove("active-tool-options");
        }
        else{
            eraserOptions.classList.add("active-tool-options");
        }
    }
    else{
        pencil.classList.remove("active-tool");
        pencilOptions.classList.remove("active-tool-options");
        eraser.classList.add("active-tool");
        ctx.strokeStyle = "white";
        activeTool = "eraser";
    }
});

undo.addEventListener("click", function () {
    // console.log(points);
    removeLine();
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // the redraw the leftover items in the points array
    reDraw();
});

function removeLine() {
    if (points.length) {
        let line = points.pop();
        redoArray.push(line);
    }
}

// when the window is resized then the canvas is reset and the default strokestyle will be black
function reDraw() {
    for (let i = 0; i < points.length; i++) {
        let line = points[i];
        for (let j = 0; j < line.length; j++) {
            ctx.strokeStyle = line[j].penColor;
            ctx.lineWidth = line[j].penWidth;
            if (line[j].id == "md") {
                ctx.beginPath();
                ctx.moveTo(line[j].x, line[j].y);
            }
            else if (line[j].id == "mm") {
                ctx.lineTo(line[j].x, line[j].y);
                ctx.stroke();
            }
        }
    }
}

redo.addEventListener("click", function () {
    if(redoArray.length){

        let line = redoArray.pop();
        points.push(line);
        for(let i=0 ;i<line.length; i++){
            ctx.lineWidth = line[i].penWidth;
            ctx.strokeStyle = line[i].penColor;
            if(line[i].id == "md"){
                ctx.beginPath();
                ctx.moveTo(line[i].x,line[i].y);
            }
            else{
                ctx.lineTo(line[i].x,line[i].y);
                ctx.stroke();
            }
        }
    }
});
