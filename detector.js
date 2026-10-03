const r = require("raylib");

function isInBounds(detector) {
  const end1 = detector.start.x + detector.size.width;

  return !(end1 > detector.upper || detector.start.x < detector.lower);
}
function nextPosition(d) {
  d.velocity = isInBounds(d) ? d.velocity : -d.velocity;
  d.start.x += d.velocity;
  return d;
}

function hasDetected(particle, detector) {
  const end1 = particle.x + particle.width;
  const end2 = detector.start.x + detector.size.width;

  return !(end2 < particle.x || detector.start.x > end1);
}

function draw(d) {
  drawRange(d.start, d.size, d.color);
}

function drawRange(start, size, color) {
  r.DrawRectangle(start.x, start.y, size.width, size.height, color);
}

function createDetector(start, size, upper, velocity) {
  return {
    start: { x: start, y: 0 },
    size: { width: size, height: r.GetScreenHeight() },
    lower: start,
    upper: upper,
    velocity: velocity,
  };
}
function getColor(p1, p2, d) {
  d.color = hasDetected(p1, d) || hasDetected(p2, d) ? r.RED : r.WHITE;
  // draw(d);
  return d;
}
module.exports = {
  draw,
  drawRange,
  createDetector,
  getColor,
  nextPosition,
};
