// point.js

function Point(x,y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return this.x + ", " + this.y;
}

function add(p, q) {
  return new Point(p.x + q.x, p.y + q.y);
}

function subtract(p, q) {
  return new Point(p.x - q.x, p.y - q.y);
}

function multiply(u, s) {
  return new Point(u.x * s, u.y * s);
}

function dot(p, q) {
  return p.x * q.x + p.y * q.y;
}

function cross(p, q) {
  return p.x * q.y - p.y * q.x;
}

function crosses(x1, x2, x3, x4) {
  var a = subtract(x2, x1);
  var f = subtract(x4, x1);
  var g = subtract(x3, x1);
  return cross(a, f) * cross(a, g) <= 0;
}

// Check for intersection of two line segments (x1, x2) and (x3, x4)
// In general, the intersection of two line segments is
//    1.  Nowhere
//    2.  Exactly one point
//    3.  Infinitely many points, coincident on both segments
function intersection(x1, x2, x3, x4) {
  var a = subtract(x2, x1);
  var b = subtract(x4, x3);
  var c = subtract(x3, x1);
  var axb = cross(a, b);
  var cxb = cross(c, b);
  if (axb != 0) {
    if (crosses(x1, x2, x3, x4) && crosses(x3, x4, x1, x2)) {
      return add(x1, multiply(a, cxb / axb));
    }
    return false;
  }

  // Segments must be parallel.
  var s1 = between(x3, x4, x1);
  var s2 = between(x3, x4, x2);
  if ((s1 < 0 && s2 < 0) || (s1 > 1 && s2 > 1)) {
    // Segments do not overlap.
    return false;
  }

  if (!(crosses(x1, x2, x3, x4) && crosses(x3, x4, x1, x2))) {
    // Segments are parallel but offset in perpindicularly.
    return false;
  }
  
  s1 = Math.max(0, Math.min(1, s1));
  s2 = Math.max(0, Math.min(1, s2));

  if (s1 == s2) {
    return lerp(x3, x4, s1);
  }

  var res = {p: lerp(x3, x4, s1), q: lerp(x3, x4, s2)};
  return res;
}

function colinear(x1, x2, x3) {
  return cross(subtract(x2, x1), subtract(x3, x1)) == 0;
}

function parallel(x1, x2, x3, x4) {
  return cross(subtract(x1, x2), subtract(x3, x4)) == 0;
}

Point.prototype.onLineSegment = function(a, b) {
  if (colinear(a, b, this)) {
    var s = between(a, b, this);
    if (0 <= s && s <= 1) {
      return lerp(a, b, s);
    }
  }
  return false;
}

function lerp(a, b, t) {
  return new Point(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));
}

function between(a, b, p) {
  if (a.x == b.x && a.y == b.y) {
    return 0;
  }

  if (a.x != b.x) {
    var s = (a.x - p.x) / (a.x - b.x);    
    return s;
  }

  return (a.y - p.y) / (a.y - b.y);
}

function error(msg) {
  console.log("Error: " + msg);
}
