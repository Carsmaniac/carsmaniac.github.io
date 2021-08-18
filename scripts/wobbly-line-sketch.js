let drawPoint = new p5.Vector;
let toNextPoint = new p5.Vector;

let pointNumber = 0;
let allPoints = []

let hue;
let hueChange;

let backgroundHue;
let size;

function setup() {
    createCanvas(210*2, 297*2);
    frameRate(60);

    reset();
}

function draw() {
    colorMode(HSB, 255);
    background(backgroundHue, 25, 255);
    noStroke();

    for (let i = 0; i < allPoints.length; i++) {
        fill(wrapHue(hue + (hueChange*i)), 255, 255);
        ellipse(allPoints[i].x, allPoints[i].y, size)
    }

    if (pointNumber < 80) {
        append(allPoints, new p5.Vector(drawPoint.x, drawPoint.y));
        toNextPoint.rotate(random(-0.08, 0.08));
        drawPoint.add(toNextPoint);

        pointNumber++;
    }
}

function reset() {
    pointNumber = 0;
    allPoints = [];

    drawPoint = createVector(width/2, height);
    toNextPoint = createVector(0, -6);

    hue = random(0, 255);
    hueChange = random(0.4, 1.5);
    if (random() > 0.5) {
        hueChange *= -1;
    }

    backgroundHue = random(0, 255);
    size = random(20, 60);
}

function mousePressed() {
    reset();
}

function wrapHue(hue) {
    if (hue > 255) {
        return hue - 255;
    } else if (hue < 0) {
        return hue + 255;
    } else {
        return hue;
    }
}
