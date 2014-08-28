// Ray abstraction.

function ray(origin, angle) {
  this.o = origin;
  this.t = angle;
  this.v = {x: Math.cos(angle), y: Math.sin(angle)};
  this.p = new Point(this.v.x + origin.x, this.v.y + origin.y);
}


