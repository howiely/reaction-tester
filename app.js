// prepare playground for rendering canvas
let canvas = document.getElementById('playground');
let ctx = canvas.getContext('2d');
let startTime;
let note = document.getElementById('note');
let endGameNote = document.getElementById('end');
let button = document.getElementById('button');
let count = 0;

// update badge and badges element
let badgeElement = document.getElementById('badge');
let badgesElement = document.getElementById('badges');
let streak = document.getElementById('streak');
let highestStreak = document.getElementById('high');
let badge = '';
let badges = [];
let streakCounts = [];

// runs when a certain count is reached based on switch logic
function assignBadge(badgeName) {
    badge = badgeName;
    // check if badge already achieved
    if (!badges.includes(badgeName)) {
        badges.push(badge);
    }
    badgeElement.innerHTML = `Badge Earned: <strong>${badge}</strong>`;
}

// detect browser window size and accordingly update canvas
function getTransform() {
    let x = window.innerWidth;
    let y = window.innerHeight;
    if (x >= 300 && x <= 767) {
        x /= 2;
        y /= 3;
    } else if (x >= 1920) {
        x /= 1.25;
        y /= 4;
    } else {
        x /= 1.75;
        y /= 3.5;
    }
    let transform = `translate(${randomNumber(x)}px, ${randomNumber(y)}px)`;
    return transform;
}

function start() {
    const date = new Date();
    startTime = date.getTime();
}

function randomColor() {
    // avoid light colors
    let color = `rgb(${(Math.floor(200 * Math.random()) + 55)},
${(Math.floor(200 * Math.random()) + 55)}, 
${(Math.floor(200 * Math.random()) + 55)})`;
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
    canvas.style.transform = getTransform();

    // calculate reaction time
    let r = dateDifference(startTime);

    // update reaction element
    let p = document.getElementById('reaction');
    p.innerHTML = `${r}s`;

    // count number of reaction time less than a second
    if (r < 1) {
        highestStreak.style.display = 'none';
        count++;
    } else {
        highestStreak.style.display = 'block';
        streakCounts.push(count);
        highestStreak.innerHTML = `Highest Streak: <strong>${Math.max(...streakCounts)}</strong>`;
        count = 0;
    }

    // update streak element
    streak.innerHTML = count;

    /* badges */

    // badge statements
    if (badges.length > 1) {
        badgeElement.innerHTML = `Latest Badge Earned: <strong>${badge}</strong>`;
        badgesElement.innerHTML = `Badges earned: <strong>${badges.join(' , ')}</strong>`;
    }

    switch (count) {
        case 0:
            if (badges.length === 0) {
                // do nothing
            } else {
                badgeElement.innerHTML = `Last Badge Earned: <strong>${badges[badges.length - 1]}</strong>`;
                badgesElement.innerHTML = `Badges earned: <strong>${badges.join(' , ')}</strong>`;
            }
            break;
        case 10:
            assignBadge('Starter');
            break;
        case 25:
            assignBadge('Sharp');
            break;
        case 50:
            assignBadge('Champion');
            break;
        case 100:
            assignBadge('Expert');
            break;
        case 250:
            assignBadge('Legend');
            break;
        case 500:
            assignBadge('Flash');
            // end game
            endGame();
            break;
    }

    // update note element to encourage the player and give status details of the game
    if (count > 1 && count <= 25) {
        note.innerHTML = "Keep up the pace.<br/> Your reaction speed is good! 😃";
    } else if (count > 25 && count <= 50) {
        note.innerHTML = "Your reaction speed is Awesome! 😉";
    } else if (count > 50 && count <= 100) {
        note.innerHTML = "Amazing reaction speed!! 😎";
    } else if (count > 100 && count <= 250) {
        note.innerHTML = "You are the champ!! <br/> Keep going! 😂";
    } else if (count > 250 && count < 500) {
        note.innerHTML = "You are the Legend!! <br/> Close to earning a Flash badge 😉";

    } else {
        note.innerHTML = "Oops, you have taken more than a second to react! <br/> Focus and keep going 😞";
    }

    if (r > 5) {
        note.innerHTML = "Poor reaction speed! <br/> Take a break and start again 😥";
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

function startGame() {
    canvas.width = canvas.width;
    canvas.style.transform = getTransform();
    drawCircle(); // initial figure
    start(); // initial start time
    note.innerHTML = "You will get some inspiring status quotes once you start the game";
    button.style.display = 'none';
    endGameNote.innerHTML = '';
    // for every click on canvas, generate a random figure and reaction time
    canvas.addEventListener('click', randomFigure);
}

function endGame() {
    button.style.display = 'block';
    endGameNote.innerHTML = "You are the Flash! Relax now, Game is over!!! 😂";
    canvas.removeEventListener('click', randomFigure);
}

window.addEventListener('load', startGame);