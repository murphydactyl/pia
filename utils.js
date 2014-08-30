// Utilities.

Array.prototype.argmin = function() {
  return this.reduce(
  function(previous, current, index, array) {
    console.log(arguments);
    if (current <= array[previous]) {
      return index;
    }
    return previous;
  }
, 0)};
