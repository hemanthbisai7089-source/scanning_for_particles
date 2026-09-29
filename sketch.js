const r = require("raylib");
//const geometry = require("./geometrya");


const WIDTH = 300;
const HEIGHT = 200;
const FPS = 60;

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "scanning for particles");
    r.SetTargetFPS(FPS);
}
function running() {
    return !r.WindowShouldClose();
}
function detectorPosition(axis, range, detectorStart, detectorEnd, previousState) {
    if (axis + range >= detectorEnd) {
        return true;
    } if (axis <= detectorStart) {
        return false;
    } return previousState;

}
function speed(detectorReached, speed) {
    if (detectorReached) return speed * -1;
    return speed;
}

let detectorOneX = 0;
let detectorTwoX = WIDTH / 2 + 1;


let detectorOneY = 0;
let detectorTwoY = 0;

let detectorOneReached = false;
let detectorTwoReached = false;

const detectorOneStart = detectorOneX;
const detectorTwoStart = detectorTwoX;

const detectorOneWidth = 20;
const detectorTwoWidth = 20;

function update() {
    const detectorOneEnd = WIDTH / 2;
    const detectorTwoEnd = WIDTH;

    const detectorOneSpeed = 1;
    const detectorTwoSpeed = 3;

    detectorOneReached = detectorPosition(detectorOneX, detectorOneWidth, detectorOneStart, detectorOneEnd, detectorOneReached);
    detectorTwoReached = detectorPosition(detectorTwoX, detectorTwoWidth, detectorTwoStart, detectorTwoEnd, detectorTwoReached);

    detectorOneX += speed(detectorOneReached, detectorOneSpeed);
    detectorTwoX += speed(detectorTwoReached, detectorTwoSpeed);
}


function overlapCheck(particleAxis, particleRange, detectorAxis, detectorRange) {
    const atParticle = detectorAxis + detectorRange >= particleAxis && detectorAxis <= particleRange + particleAxis;

    if (atParticle) return r.Fade(r.RED, 0.7);
    return r.WHITE;
}
function draw() {
    const particle1X = 100;
    const particle1Y = 0;
    const particle1Width = 50;

    const particle2X = 200;
    const particle2Y = 0;
    const particle2Width = 5;

    const detectorOneColor = overlapCheck(particle1X, particle1Width, detectorOneX, detectorOneWidth);
    const detectorTwoColor = overlapCheck(particle2X, particle2Width, detectorTwoX, detectorTwoWidth);

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle2X, particle2Y, particle2Width, HEIGHT, r.BLUE);
    r.DrawRectangle(particle1X, particle1Y, particle1Width, HEIGHT, r.BLUE);

    r.DrawRectangle(detectorOneX, detectorOneY, detectorOneWidth, HEIGHT, detectorOneColor);
    r.DrawRectangle(detectorTwoX, detectorTwoY, detectorTwoWidth, HEIGHT, detectorTwoColor);


    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};