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

// Subtract point q from p.
function subtract(p, q) {
  return new Point(p.x - q.x, p.y - q.y);
}

// Multiply point by scalar.
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

function rotate(p, o, angle) {
  p = subtract(p, o);
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var x = p.x * cos - p.y * sin + o.x;
  var y = p.x * sin + p.y * cos + o.y;
  p.x = x;
  p.y = y;
  return p;
}

function rescale(p, o, d) {
  var v = subtract(p, o);
  var s = d / Math.sqrt(dot(v, v));
  return new Point(v.x * s + o.x, v.y * s + o.y);
}

function unit(p, o) {
  var v = subtract(p, o);
  var s = Math.sqrt(dot(v, v));
  return new Point(v.x / s, v.y / s);
}

// Make a basis from "y" vector p.
function basis(p, o) {
  var y = unit(p, o);
  return {a: -y.y, b: y.x, c: y.x, d: y.y};
}

function rebase(p, b) { 
  var x = p.x * b.a + p.y * b.b;
  var y = p.x * b.c + p.y * b.d;
  return new Point(x, y); 
}

// Check for intersection of a ray (x1, x2) with line segment (x3, x4).
function intersectionRayLine(a1, a2, b1, b2) {
  var ua = subtract(a2, a1); 
  var ub = subtract(b2, b1);
  var axb = cross(ua, ub);
  if (axb == 0) {
    // Ray and segment are parallel.
    if (!colinear(a1, b1, b2)) {
      return false;
    }
    // Ray and segment are colinear.
    var sb = between(b1, b2, a1);
    var p = add(b1, multiply(ub, sb));
    if (!b1.onRay(a1, a2)) {
      b1 = false; 
    }
    if (!b2.onRay(a1, a2)) {
      b2 = false;
    }
    if (sb >= 0 && sb <= 1) {
      if (b1 && !b1.equals(p)) {
        return {p: p, q: b1};
      } else if (b2) {
        return {p: p, q: b2};
      }
      return p;
    }
    if (b1) {
      if (b2 && !b2.equals(b1)) {
        return {p: b1, q: b2};
      }
      return b1;
   } else if (b2) {
     return b2;
   } 
   return false;
  }
  
  var sa = cross(subtract(b1, a1), ub) / cross(ua, ub);
  if (sa >= 0) {
    var p = add(a1, multiply(ua, sa));
    var sb = between(b1, b2, p);
    if (sb >= 0 && sb <= 1) {
      return p;
    }
  }
  
  return false; 
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

  return {p: lerp(x3, x4, s1), q: lerp(x3, x4, s2)};
}

function colinear(x1, x2, x3) {
  return cross(subtract(x2, x1), subtract(x3, x1)) == 0;
}

function parallel(x1, x2, x3, x4) {
  return cross(subtract(x1, x2), subtract(x3, x4)) == 0;
}

function distance(p, q) {
  var dx = p.x - q.x;
  var dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
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

Point.prototype.equals = function(p) {
  return (p.x == this.x && p.y == this.y); 
}

Point.prototype.onRay = function(a, b) {
  return (colinear(a, b, this) && between(a, b, this) >= 0);
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
