const r = require("raylib");
// const geometry = require("./geometry");
const WIDTH = 1000;
const HEIGHT = 800;
const FPS = 60;
const TITLE = "scanning for particles";

let d1 = {};
let d2 = {};

d1.x = 0;
d1.y = 0;
d1.velocity = 1;
d1.start = d1.x;
d1.width = 80;
d1.range = WIDTH / 2;

d2.range = WIDTH / 2;
d2.x = WIDTH / 2;
d2.y = 0;
d2.velocity = 1.5;
d2.start = d2.x;
d2.width = 80;

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);
}

function running() {
  return !r.WindowShouldClose();
}

function update() {
  d1.velocity = isInBounds(
    d1.x,
    d1.width - d1.width,
    d1.start,
    d1.range - d1.width,
  )
    ? d1.velocity
    : -d1.velocity;
  d2.velocity = isInBounds(
    d2.x,
    d2.width - d2.width,
    d2.start,
    d2.range - d2.width,
  )
    ? d2.velocity
    : -d2.velocity;

  d1.x += d1.velocity;
  d2.x += d2.velocity;
}

function isInBounds(start1, width1, start2, width2) {
  const end1 = start1 + width1;
  const end2 = start2 + width2;

  return !(end2 < start1 || start2 > end1);
}
function getcolor(overlaped) {
  return overlaped ? r.RED : r.WHITE;
}

function draw() {
  const particle1 = { x: WIDTH / 3, y: 0, width: 70, height: HEIGHT };
  const particle2 = { x: (WIDTH / 4) * 3, y: 0, width: 100, height: HEIGHT };

  const detector1 = { x: d1.x, y: d1.y, width: d1.width, height: HEIGHT };
  const detector2 = {
    x: d2.x,
    y: d2.y,
    width: d2.width,
    height: HEIGHT,
  };
  const paricleColor = r.BLUE;

  const detectorRoundness = 0.8;
  const detectorSegements = 8;

  const detectorOneDetected =
    isInBounds(particle1.x, particle1.width, d1.x, d1.width) ||
    isInBounds(particle2.x, particle2.width, d1.x, d1.width);

  const detectorTwoDtected =
    isInBounds(particle2.x, particle2.width, d2.x, d2.width) ||
    isInBounds(particle1.x, particle1.width, d2.x, d2.width);

  const detectorOneColor = getcolor(detectorOneDetected);
  const detectorTwoColor = getcolor(detectorTwoDtected);

  const blinkingSpeed = 6;

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawText("Hemanth", 10, 150, 10, r.GREEN);

  r.DrawRectangleRec(particle1, paricleColor);
  r.DrawRectangleRec(particle2, paricleColor);

  r.DrawRectangleRounded(
    detector1,
    detectorRoundness,
    detectorSegements,
    detectorOneColor,
  );

  r.DrawRectangleRounded(
    detector2,
    detectorRoundness,
    detectorSegements,
    detectorTwoColor,
  );

  if (detectorOneDetected || detectorTwoDtected) {
    r.DrawText("Warning ! ", WIDTH / 2 - 80, 5, 60, r.RED);
  }

  d1.blinker = blinkCheck(d1.blinker, detectorOneDetected, blinkingSpeed);
  d2.blinker = blinkCheck(d2.blinker, detectorTwoDtected, blinkingSpeed);
  r.EndDrawing();
}
function blinkCheck(blinker, detectorDetected, blinkingSpeed) {
  return !detectorDetected || blinker === blinkingSpeed
    ? (blinker = 0)
    : ++blinker;
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
