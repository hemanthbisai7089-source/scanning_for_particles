const d = require("./detector.js");
const r = require("raylib");

function createParticle(start, size, color) {
  return {
    start: start,
    size: size,
    color: color,
  };
}
module.exports = {
  createParticle,
};
