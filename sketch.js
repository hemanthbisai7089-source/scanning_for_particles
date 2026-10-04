const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");

function setup(WIDTH, HEIGHT, TITLE, FPS) {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  world = {};
  world.d1 = d.createDetector(0, 80, r.GetScreenWidth() / 2, 1.5);
  world.d2 = d.createDetector(
    r.GetScreenWidth() / 2,
    80,
    r.GetScreenWidth(),
    2.5,
  );
  world.p1 = p.createParticle(r.GetScreenWidth() / 3, 70, r.BLUE);
  world.p2 = p.createParticle((r.GetScreenWidth() * 3) / 4, 100, r.BLUE);
  return world;
}

function running() {
  return !r.WindowShouldClose();
}

function update(world) {
  d.update(world.d1, world.p1, world.p2);
  d.update(world.d2, world.p1, world.p2);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  d.draw(world.p1);
  d.draw(world.p2);
  d.draw(world.d1);
  d.draw(world.d2);

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
