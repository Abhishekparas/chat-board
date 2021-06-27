const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let redoArray = [];
let drawingArea = document.querySelector(".drawing-area");


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    reDraw();
})

// canvas.height = drawingArea.height;
// canvas.width = drawingArea.width;

// window.addEventListener("resize", function () {
//     canvas.height = drawingArea.height;
//     canvas.width = drawingArea.width;
//     reDraw();
// })

let points = [];                                    //this array consists of arrays of lines that we draw n whiteboard [[md,mm,mm,mm,mm],[md,mm,mm,mm,mm,mm]]
let line = [];
let isPenDown = false;
canvas.addEventListener("mousedown", function (e) {
    redoArray = [];                                                             //i did this because , suppose if i draw three lines then undo 2 of them then again draw a line and then click redo button then the two lines that i undid will appear therefore to preven this i empty the redoArray on mousedown
    isPenDown = true;
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let point = {
        id: "md",
        x: x,
        y: y,
        penColor: ctx.strokeStyle,
        penWidth: ctx.lineWidth
    }
    line.push(point);
    socket.emit("md", point);
});

canvas.addEventListener("mousemove", function (e) {
    if (isPenDown == true) {
        let { top } = canvas.getBoundingClientRect();
        let x = e.clientX;
        let y = e.clientY - top;
        ctx.lineTo(x, y);
        ctx.stroke();
        let point = {
            id: "mm",
            x: x,
            y: y,
            penColor: ctx.strokeStyle,
            penWidth: ctx.lineWidth
        }
        line.push(point);
        socket.emit("mm", point);
    }
});

canvas.addEventListener("mouseup", function () {
    isPenDown = false;
    points.push(line);
    line = [];
})