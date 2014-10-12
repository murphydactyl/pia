// Utilities.

Array.prototype.argmin = function() {
  return this.reduce(
  function(previous, current, index, array) {
    if (current <= array[previous]) {
      return index;
    }
    return previous;
  }
, 0)};

Array.prototype.argmax = function() {
  return this.reduce(
  function(previous, current, index, array) {
    if (current >= array[previous]) {
      return index;
    }
    return previous;
  }
, 0)};

function linspace(a, b, num) {
  var values = new Array(num);
  if (num == 1) {
    values[0] = (a + b) / 2;
  } else {
    values[0] = a;
    var step = (b - a) / (num - 1);
    for (var i = 1; i < num - 1; i++) {
      values[i] = values[i - 1] + step;
    }
    values[num - 1] = b;
  }
  return values;
}

