var ctx;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function LineSegment(p0, p1) {
  this.a = p0;
  this.b = p1;
  this.LengthSquared = function() {
    dx = this.a.x - this.b.x;
    dy = this.a.y - this.b.y;
    return dx * dx + dy * dy;
  }
  this.length = function() {
    return Math.sqrt(this.LengthSquared());
  }
  this.isHorizontal() = function() {
    return this.a.x == this.b.x;
  }
  this.isVertical() = function() {
    return this.a.y == this.b.y;
  }
}

function init(context) {
  ctx = context;
}

function line(x0,y0,x1,y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function line(a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
}

function square(x, y, s) {
  rect(x, y, s, s);
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

function point(x, y) {
  circle(x, y, 1);
}

function cross(u, v) {
  return (u.x * v.y - u.y * v.x);
}

function ccw(a,b,c) {
  return cross(a,b) < cross(b,c);
}

function intersects(a,b,c,d) {
  return (ccw(a,b,c) != ccw(a,b,d)) && ((ccw(a,c,d) != ccw(b,c,d)))
}

  // require that s1 not both horizontal/vertical



    
  
