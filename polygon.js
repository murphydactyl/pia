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
  return p;
}

Circle.prototype = new Polygon;
