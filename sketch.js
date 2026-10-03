const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");

function setup(WIDTH, HEIGHT, TITLE, FPS) {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  d1 = d.createDetector(0, 80, r.GetScreenWidth() / 2, 1.5);
  d2 = d.createDetector(r.GetScreenWidth() / 2, 80, r.GetScreenWidth(), 2.5);
  p1 = p.createParticle(r.GetScreenWidth() / 3, 70, r.BLUE);
  p2 = p.createParticle((r.GetScreenWidth() * 3) / 4, 100, r.BLUE);
}
let d1;
let d2;
let p1;
let p2;

function running() {
  return !r.WindowShouldClose();
}

function update() {
  d.nextPosition(d1);
  d.nextPosition(d2);
}

function draw() {
  d.getColor(p1, p2, d1);
  d.getColor(p1, p2, d2);

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  p.draw(p1);
  p.draw(p2);
  d.draw(d1);
  d.draw(d2);

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
