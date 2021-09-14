let buttonsPressed = [];

let interactiveButtons = true;
let interactivePopup = false;

let chosenZine = null;
let animStage = 0;
let animPosition = new p5.Vector();
let animPositionInitial = new p5.Vector();
let animScale = new p5.Vector();
let animScaleInitial = new p5.Vector();
let animMove = 0;
let animFall = 0;
let zineDropped = false;
let animPositionPopup = new p5.Vector();
let animScalePopup = new p5.Vector();

function preload() {
    anarchistRadio = loadImage("https://i.imgur.com/ao7C6lT.jpeg");
    anthropozine = loadImage("https://i.imgur.com/39Y0jFA.jpeg");
    burnSomething = loadImage("https://i.imgur.com/V19R5AQ.jpeg");
    f2020 = loadImage("https://i.imgur.com/Bvlsd5k.jpeg");
    queerResistance = loadImage("https://i.imgur.com/HxWpCJW.jpeg");
    starryCosmos = loadImage("https://i.imgur.com/edpbLiR.jpeg");

    openSansBold = loadFont("open-sans-bold.ttf");

    buttonPress = loadSound("sounds/button-press.mp3");
    buttonError = loadSound("sounds/button-error.mp3");
    zineDrop = loadSound("sounds/zine-drop.mp3");
    machineWhirr = loadSound("sounds/machine-whirr.mp3");
}

function setup() {
    createCanvas(1000, 750);

    zines = [];
    zines.push(new Zine(anarchistRadio, "101", 237, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    zines.push(new Zine(anarchistRadio, "102", 322, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    zines.push(new Zine(anarchistRadio, "103", 406, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    zines.push(new Zine(anthropozine, "104", 492, 154, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    zines.push(new Zine(burnSomething, "201", 237, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    zines.push(new Zine(burnSomething, "202", 322, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    zines.push(new Zine(burnSomething, "203", 406, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    zines.push(new Zine(anthropozine, "204", 492, 289, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    zines.push(new Zine(f2020, "301", 237, 424, "Fuck 2020 or the DIY Guide to Dealing with the Shit-Storming Dread of Life Right Now", 322, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_48019bb43efa4ec8ac3d158d4047694e.pdf"));
    zines.push(new Zine(f2020, "302", 322, 424, "Fuck 2020 or the DIY Guide to Dealing with the Shit-Storming Dread of Life Right Now", 322, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_48019bb43efa4ec8ac3d158d4047694e.pdf"));
    zines.push(new Zine(anthropozine, "303", 406, 424, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    zines.push(new Zine(anthropozine, "304", 492, 424, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    zines.push(new Zine(queerResistance, "401", 237, 559, "Los Angeles Queer Resistance", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_69d98a570b5e48c0b99cd36a0339d34d.pdf"));
    zines.push(new Zine(queerResistance, "402", 322, 559, "Los Angeles Queer Resistance", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_69d98a570b5e48c0b99cd36a0339d34d.pdf"));
    zines.push(new Zine(starryCosmos, "403", 406, 559, "The Odds Against a Starry Cosmos", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_e8f948a6c9844c829209876b14ddd583.pdf"));
    zines.push(new Zine(starryCosmos, "404", 492, 559, "The Odds Against a Starry Cosmos", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_e8f948a6c9844c829209876b14ddd583.pdf"));

    controlPanel = [];
    controlPanel.push(new PanelButton(711, 306, 1));
    controlPanel.push(new PanelButton(791, 306, 2));
    controlPanel.push(new PanelButton(871, 306, 3));
    controlPanel.push(new PanelButton(711, 367, 4));
    controlPanel.push(new PanelButton(791, 367, 5));
    controlPanel.push(new PanelButton(871, 367, 6));
    controlPanel.push(new PanelButton(711, 428, 7));
    controlPanel.push(new PanelButton(791, 428, 8));
    controlPanel.push(new PanelButton(871, 428, 9));
    controlPanel.push(new PanelButton(791, 489, 0));

    textFont(openSansBold);
    textAlign(CENTER);
}

function draw() {
    background(240);
    noStroke();

    let buttonsDisplayed = buttonsPressed.slice(0);
    for (let i = 0; i < 3 - buttonsPressed.length; i ++) {
        append(buttonsDisplayed, "-");
    }

    // Vending machine
    fill(20, 140, 17);
    rect(150, 0, 500, 750);
    stroke(0);
    rect(225, 640, 280, 75);
    noStroke();
    fill(0, 50, 100);
    rect(185, 35, 360, 580);

    // Shelves
    fill(70);
    rect(185, 154, 360, 15);
    rect(185, 289, 360, 15);
    rect(185, 424, 360, 15);
    rect(185, 559, 360, 15);

    // Big control panel
    fill(200);
    stroke(150);
    rect(683, 150, 280, 400);
    noStroke();
    fill(50, 150, 200);
    rect(711, 178, 224, 100);
    fill(25, 75, 100);
    textSize(70);
    text(buttonsDisplayed.join(" "), 823, 253);

    // Small control panel
    fill(200);
    stroke(150);
    rect(560, 200, 70, 100);
    noStroke();
    fill(50, 150, 200);
    rect(567, 207, 56, 25);
    fill(240);
    rect(567, 239, 16, 11);
    rect(587, 239, 16, 11);
    rect(607, 239, 16, 11);
    rect(567, 254, 16, 12);
    rect(587, 254, 16, 12);
    rect(607, 254, 16, 12);
    rect(567, 270, 16, 11);
    rect(587, 270, 16, 11);
    rect(607, 270, 16, 11);
    rect(587, 286, 16, 11);
    fill(25, 75, 100);
    textSize(18);
    text(buttonsDisplayed.join(" "), 595, 226);

    for (zine of zines) {
        zine.draw();
    }
    cursor(ARROW);
    for (panelButton of controlPanel) {
        panelButton.draw();
        if (panelButton.hovered) {
            cursor("pointer");
        }
    }

    if (animStage == 1) {
        // Zine moves forward
        if (animMove < 1.2) {
            animMove += 0.0015;
            animScale.x = animScaleInitial.x * animMove;
            animScale.y = animScaleInitial.y * animMove;
            animPosition.x = animPositionInitial.x + (animScaleInitial.x / 2) - (animScale.x / 2);
            animPosition.y = animPositionInitial.y + animScaleInitial.y - animScale.y;
        } else {
            animPositionInitial = new p5.Vector(animPosition.x, animPosition.y);
            animStage ++;
            animFall = 1;
        }
    } else if (animStage == 2) {
        // Zine falls
        animFall += (animFall + 100) * 0.05;
        animPosition.y = animPositionInitial.y + animFall - 1;
        if (animPosition.y > height && !zineDropped) {
            zineDrop.play();
            zineDropped = true;
        }
        if (animPosition.y > height + 50000) {
            animScaleInitial = new p5.Vector(animScaleInitial.x * 0.8, animScaleInitial.y * 0.8);
            animPositionInitial = new p5.Vector(364 - animScaleInitial.x / 2, 677 - animScaleInitial.y / 2)

            animScalePopup = new p5.Vector(animImage.width * 0.7, animImage.height * 0.7);
            animPositionPopup = new p5.Vector(300 - animScalePopup.x / 2, height / 2 - animScalePopup.y / 2);

            animScale = new p5.Vector(animScaleInitial.x, animScaleInitial.y);
            animPosition = new p5.Vector(animPositionInitial.x, animPositionInitial.y);

            animStage ++;
        }
    } else if (animStage == 3) {
        // Zine zooms into popup view
        animPosition.x = lerp(animPosition.x, animPositionPopup.x, 0.05);
        animPosition.y = lerp(animPosition.y, animPositionPopup.y, 0.05);
        animScale.x = lerp(animScale.x, animScalePopup.x, 0.05);
        animScale.y = lerp(animScale.y, animScalePopup.y, 0.05);

        if (animPosition.x - animPositionPopup.x < 0.7) {
            animPosition = new p5.Vector(animPositionPopup.x, animPositionPopup.y);
            animScale = new p5.Vector(animScalePopup.x, animScalePopup.y);
            animStage ++;
            interactivePopup = true;
        }
    }

    if (animStage != 0 || interactivePopup) {
        if (animStage == 3 || interactivePopup) {
            fill(150, 150, 150, map(animScale.x, animScaleInitial.x, animScalePopup.x, 0, 150, true));
            rect(0, 0, width, height);
        }
        image(animImage, animPosition.x, animPosition.y, animScale.x, animScale.y);
        if (animStage == 2) {
            fill(20, 140, 17);
            rect(150, 615, 500, 135);
            stroke(0);
            rect(225, 640, 280, 75);
            noStroke();
        }
    }

    if (interactivePopup) {
        fill(255);
        rect(animPosition.x + animScale.x + 30, animPosition.y, width - (animPosition.x + animScale.x + 100) + 40, chosenZine.titleHeight);
        rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 190, width - (animPosition.x + animScale.x + 100) + 40, 80);
        rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 80, width - (animPosition.x + animScale.x + 100) + 40, 80);
        fill(80);
        textSize(35);
        text("Read zine", animPosition.x + animScale.x + 30 + (width - (animPosition.x + animScale.x + 100) + 40) / 2, animPosition.y + animScale.y - 190 + 50)
        text("Close", animPosition.x + animScale.x + 30 + (width - (animPosition.x + animScale.x + 100) + 40) / 2, animPosition.y + animScale.y - 80 + 50)
        fill(0);
        textSize(40);
        textWrap(WORD);
        textAlign(LEFT);
        text(chosenZine.title, animPosition.x + animScale.x + 50, animPosition.y + 50, width - (animPosition.x + animScale.x + 100));
        textAlign(CENTER);

        if (mouseX > animPosition.x + animScale.x + 30 && mouseX < animPosition.x + animScale.x + 30 + width - (animPosition.x + animScale.x + 100) + 40) {
            cursor(ARROW);
            if (mouseY > animPosition.y + animScale.y - 190 && mouseY < animPosition.y + animScale.y - 190 + 80) {
                cursor("pointer");
                fill(255, 255, 255, 150);
                rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 190, width - (animPosition.x + animScale.x + 100) + 40, 80);
            } else if (mouseY > animPosition.y + animScale.y - 80 && mouseY < animPosition.y + animScale.y - 80 + 80) {
                cursor("pointer");
                fill(255, 255, 255, 150);
                rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 80, width - (animPosition.x + animScale.x + 100) + 40, 80);
            }
        }
    }
}

function mouseClicked() {
    if (interactiveButtons) {
        if (buttonsPressed.length < 3) {
            for (panelButton of controlPanel) {
                if (panelButton.hovered) {
                    append(buttonsPressed, panelButton.number);
                    buttonPress.play();
                    if (buttonsPressed.length == 3) {
                        interactiveButtons = false;
                        chosenZine = null;
                        for (zine of zines) {
                            if (zine.number == buttonsPressed.join("")) {
                                chosenZine = zine;
                                animImage = zine.image;
                                animScale = new p5.Vector(zine.width, zine.height);
                                animScaleInitial = new p5.Vector(animScale.x, animScale.y);
                                animPosition = new p5.Vector(zine.position.x - animScale.x / 2, zine.position.y - animScale.y);
                                animPositionInitial = new p5.Vector(animPosition.x, animPosition.y);
                            }
                        }
                        if (chosenZine != null) {
                            machineWhirr.play();
                            animStage = 1;
                            animMove = 1;
                            zineDropped = false;
                        } else if (buttonsPressed.join("") == "069" || buttonsPressed.join("") == "420") {
                            window.open("https://www.youtube.com/watch?v=CYqq9Ovz_9c");
                            interactiveButtons = true;
                            buttonsPressed = [];
                        } else {
                            buttonError.play();
                            interactiveButtons = true;
                            buttonsPressed = [];
                        }
                    }
                }
            }
        }
    } else if (interactivePopup) {
        if (mouseX > animPosition.x + animScale.x + 30 && mouseX < animPosition.x + animScale.x + 30 + width - (animPosition.x + animScale.x + 100) + 40) {
            if (mouseY > animPosition.y + animScale.y - 190 && mouseY < animPosition.y + animScale.y - 190 + 80) {
                window.open(chosenZine.link);
            } else if (mouseY > animPosition.y + animScale.y - 80 && mouseY < animPosition.y + animScale.y - 80 + 80) {
                buttonsPressed = [];
                interactiveButtons = true;
                interactivePopup = false;
                animStage = 0;
            }
        }
    }
}

class Zine {
    constructor(image, number, xPos, yPos, title, titleHeight, link) {
        this.image = image;
        this.width = image.width / 10;
        this.height = image.height / 10;
        this.number = number;
        this.position = new p5.Vector(xPos, yPos);
        this.topCorner = new p5.Vector(xPos - this.width / 2, yPos - this.Height);
        this.bottomCorner = new p5.Vector(xPos + this.width / 2, yPos);
        this.title = title;
        this.titleHeight = titleHeight;
        this.link = link;
    }

    draw() {
        push();
        translate(this.position);
        fill(0, 20, 30);
        rect(-18, 0, 36, 25);
        fill(255);
        textSize(15);
        text(this.number, 0, 17);
        image(this.image, -this.width / 2, -this.height, this.width, this.height);
        pop();
    }

    drawDot() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, 10);
    }
}

class PanelButton {
    constructor(xPos, yPos, number) {
        this.position = new p5.Vector(xPos, yPos);
        this.number = number;
        this.bottomCorner = new p5.Vector(xPos + 64, yPos + 45);
        this.hovered = false;
    }

    draw() {
        this.hovered = false;
        if (mouseX > this.position.x && mouseX < this.bottomCorner.x && interactiveButtons) {
            if (mouseY > this.position.y && mouseY < this.bottomCorner.y) {
                this.hovered = true;
            }
        }

        if (this.hovered) {
            fill(248);
        } else {
            fill(240);
        }
        rect(this.position.x, this.position.y, 64, 45);
        textSize(40);
        if (this.hovered) {
            fill(150);
        } else {
            fill(100);
        }
        text(this.number, this.position.x + 32, this.position.y + 35)
    }
}
