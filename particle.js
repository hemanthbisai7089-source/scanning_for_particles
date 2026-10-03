const d = require("./detector.js");
const r = require("raylib");

function draw(p) {
  d.drawRange(p, p, p.color);
}
function createParticle(start, size, color) {
  return {
    x: start,
    y: 0,
    width: size,
    height: r.GetScreenHeight(),
    color: color,
  };
}
module.exports = {
  draw,
  createParticle,
};
