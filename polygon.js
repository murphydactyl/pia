// Polygon functions

function Polygon() {
  this.vertices = [new Point(0, 0), new Point(1, 0)];
  this.edges = [0, 1];
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
  return this.verts.length;
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

