const sketch = require("./sketch");

function loop() {
  while (sketch.running()) {
    sketch.update();
    sketch.draw();
  }
}

function main() {
  const WIDTH = 1000;
  const HEIGHT = 800;
  const FPS = 60;
  const TITLE = "scanning for particles";
  sketch.setup(WIDTH, HEIGHT, TITLE, FPS);
  loop();
  sketch.teardown();
}

main();
