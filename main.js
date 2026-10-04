const sketch = require("./sketch");

function loop(world) {
  while (sketch.running()) {
    sketch.update(world);
    sketch.draw(world);
  }
}

function main() {
  const WIDTH = 1000;
  const HEIGHT = 800;
  const FPS = 60;
  const TITLE = "scanning for particles";
  const world = sketch.setup(WIDTH, HEIGHT, TITLE, FPS);
  loop(world);
  sketch.teardown();
}

main();
