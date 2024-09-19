var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var bug = {
    x: 320,
    y: 240,
    speed: 5000, // initial speed in milliseconds
    size: 30,
    color: "#FF0000",
    intervalId: null,
    isMoving: false
};

var score = 0;
var speedIncrement = 200; // milliseconds to decrease interval by

var backgroundImg = new Image();
backgroundImg.src = "bug_smasher_bg.jpeg";

var bugImg = new Image();
bugImg.src = "bug_smasher_bug.png";

canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    if (clickX >= bug.x && clickX <= bug.x + bug.size &&
        clickY >= bug.y && clickY <= bug.y + bug.size) {
        score++;
        clearInterval(bug.intervalId); // Stop current movement
        bug.speed -= speedIncrement; // Increase speed
        bug.intervalId = setInterval(moveBug, bug.speed); // Start new movement
        resetBugPosition();
    } 
});

function resetScore() {
    score = 0;
}

function resetSpeed() {
    clearInterval(bug.intervalId);
    bug.speed = 5000;
    bug.intervalId = setInterval(moveBug, bug.speed);
}

function resetBugPosition() {
    bug.x = Math.random() * (canvas.width - bug.size);
    bug.y = Math.random() * (canvas.height - bug.size);
}

function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawBug() {
    ctx.drawImage(bugImg, bug.x, bug.y, bug.size, bug.size);
}

function moveBug() {
    bug.x = Math.random() * (canvas.width - bug.size);
    bug.y = Math.random() * (canvas.height - bug.size);
}

function drawScore() {
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBug();
    drawScore();
}

bug.intervalId = setInterval(moveBug, bug.speed);
setInterval(draw, 10);