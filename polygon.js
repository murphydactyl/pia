// Polygon functions

function Polygon(verts, edges) {
  if (arguments.length < 2) {
    this.vertices = [new Point(0, 0), new Point(1, 0)];
    this.edges = [{p: 0, q: 1}];
  } else {
    this.vertices = verts;
    this.edges = edges;
  }
}

Polygon.prototype.intersectionOf = function(a, b) {
  var res = [];
  for (var i = 0; i < this.numEdges(); i++) {
    var e = this.edge(i);
    var x = intersection(e.p, e.q, a, b);
    if (x) {
      res[res.length] = x;
    }
  }
  if (res.length == 0) { return undefined; }
  return res;
}

Polygon.prototype.numEdges = function() {
  return this.edges.length;
}

Polygon.prototype.numVerts = function() {
  return this.vertices.length;
}

Polygon.prototype.edge = function(i) {
  var e = this.edges[i];
  return {
    p: this.vertices[e.p],
    q: this.vertices[e.q]
  }
}

Polygon.prototype.draw = function() {
  for (var i = 0; i < this.numEdges(); i++) {
    var e = this.edge(i);
    line(e.p, e.q);
  }
}

Polygon.prototype.rotate = function(radians) {
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  for (i = 0; i < this.vertices.length; i++) {
    var p = this.vertices[i];
    this.vertices[i] = new Point(p.x + cos - p.y * sin, p.x * sin + p.y * cos);
  }
}

Polygon.prototype.aabb = function() {
  var p = new Point(this.vertices[0].x, this.vertices[0].y);
  var q = new Point(p.x, p.y);
  for (var i = 0; i < this.numVerts(); i++) {
    var v = this.vertices[i];
    if (v.x < p.x) {
      p.x = v.x;
    }
    if (v.x > q.x) {
      q.x = v.x;
    }
    if (v.y < p.y) {
      p.y = v.y;
    }
    if (v.y > q.y) {
      q.y = v.y;
    }
  }
  return {p: p, q: q}; 
}

// Detect when a point is inside the polygon.
// A ray from the point towards any point on the polygon boundary intersects
// the boundary an odd number of times if and only if the point is inside
// the polygon.
// TODO(steinm): Fix the hack which offsets q by 10 pixels, which is needed
// to prevent double-counting corners when the AABB shares a real vertex
// with the underlying polygon.
Polygon.prototype.contains = function(p) {
  var q = this.aabb().q;
  q.x += 1000;
  var intersections = this.intersectionOf(p, q);
  var count = 0; 
  if (intersections) {
    count = intersections.length;
  }
  return count % 2 == 1;
}

Polygon.prototype.jiggle = function(h, v) {
  for (var i = 0; i < this.numVerts(); i++) {
    this.vertices[i].x += (Math.random() - 0.5) * h;
    this.vertices[i].y += (Math.random() - 0.5) * v;
  }
}

function Circle(ox, oy, radius, segments) {
  if (segments == undefined) segments = 20;

  var p = new Polygon();
  p.vertices = new Array(segments);
  p.edges = new Array(segments);
  for (var i = 0; i < segments; i++) {
    var angle =  i * 2 * Math.PI / segments;
    var x = ox + radius * Math.cos(angle);
    var y = oy + radius * Math.sin(angle);
    p.vertices[i] = new Point(x, y);
    p.edges[i] = {p: i, q: (i + 1) == segments ? 0 : i + 1};
  }
  p.name = 'Circle';
  return p;
}

function Square(x, y, s, segments) {
  if (segments == undefined) segments = 20;

  var p = new Polygon();
  p.vertices[0] = new Point(x + -s, y + -s);
  p.vertices[1] = new Point(x + s, y + -s);
  p.vertices[2] = new Point(x + s, y + s);
  p.vertices[3] = new Point(x + -s, y + s);

  p.edges[0] = {p: 0, q: 1};
  p.edges[1] = {p: 1, q: 2};
  p.edges[2] = {p: 2, q: 3};
  p.edges[3] = {p: 3, q: 0};
  p.name = 'Square';
  return p;
}
Circle.prototype = new Polygon;
Square.prototype = new Polygon;

