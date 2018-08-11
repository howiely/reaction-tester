// prepare playground for rendering canvas
var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');
var startTime;
var count = 0;

function start() {
    const date = new Date();
    startTime = date.getTime();
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomNumber(limit) {
    const n = Math.floor(Math.random() * limit);
    return n;
}

function drawRectangle() {
    ctx.fillStyle = randomColor();
    ctx.fillRect(50, 50, 200, 150);
}

function drawSquare() {
    ctx.fillStyle = randomColor();
    ctx.fillRect(50, 50, 100, 100);
}

function drawCircle() {
    ctx.fillStyle = randomColor();
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(50, 100, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function dateDifference(actualTime) {
    // Calculate time between two times:
    const date = new Date();
    const endTime = date.getTime();
    const d = (Math.abs(startTime - endTime)) / 1000;
    return d;
}

function randomFigure() {
    // to clear canvas everytime before it is re-rendered
    canvas.width = canvas.width;

    // to translate canvas to random x and y co-ordinates
    canvas.style.transform = `translate(${randomNumber(300)}px, ${randomNumber(300)}px)`;

    // calculate reaction time
    var r = dateDifference(startTime);

    // update reaction element
    var p = document.getElementById('reaction');
    p.innerHTML = `Reaction Time is <strong>${r}s</strong>`;

    // count number of reaction time less than a second
    if (r < 1) {
        count++;
    } else {
        count = 0;
    }

    // update note element to encourage the player
    var note = document.getElementById('note');
    if (count >= 1 && count < 10) {
        note.innerHTML = "<strong>Keep up the pace. Your reaction speed is good! 😃</strong>";
    } else if (count >= 10 && count <= 25) {
        note.innerHTML = "<strong>Your reaction speed is Awesome! 😉</strong>";
    } else if (count > 25 && count <= 50) {
        note.innerHTML = "<strong>Amazing reaction speed!! 😎</strong>";
    } else if (count > 50) {
        note.innerHTML = "<strong>You are the champ!! Relax now 😂</strong>";
    } else {
        note.innerHTML = "<strong>Oops, you have taken more than a second to react! Focus and keep going 😞</strong>";
    }

    if (r > 5) {
        note.innerHTML = "<strong>Poor reaction speed! Take a break and start again 😥</strong>";
    }


    const number = Math.floor(Math.random() * 3);
    start(); // calculate the start time
    if (number === 0) {
        drawRectangle();
    } else if (number === 1) {
        drawCircle();
    } else {
        drawSquare();
    }
}


drawRectangle(); // initial figure
start(); // initial start time
// for every click on canvas, generate a random figure and reaction time
canvas.onclick = randomFigure;