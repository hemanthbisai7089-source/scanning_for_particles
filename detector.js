const r = require("raylib");

function isInBounds(detector) {
  const end1 = detector.start + detector.size;

  return !(end1 > detector.upper || detector.start < detector.lower);
}

function update(d, p1, p2) {
  d.velocity = isInBounds(d) ? d.velocity : -d.velocity;
  d.start += d.velocity;
  getColor(d, p1, p2);

  return d;
}

function hasDetected(detector, particle) {
  const end1 = particle.start + particle.size;
  const end2 = detector.start + detector.size;

  return !(end2 < particle.start || detector.start > end1);
}

function draw(object) {
  r.DrawRectangle(
    object.start,
    0,
    object.size,
    r.GetScreenHeight(),
    object.color,
  );
  return object;
}

function createDetector(start, size, upper, velocity) {
  return {
    start: start,
    size: size,
    lower: start,
    upper: upper,
    velocity: velocity,
  };
}

function getColor(d, p1, p2) {
  d.color = hasDetected(d, p1) || hasDetected(d, p2) ? r.RED : r.WHITE;
  return d;
}

module.exports = {
  createDetector,
  update,
  draw,
};
