var ctx;

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

function clear() {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();
}

function stroke(r,g,b,a) {
  if (arguments.length == 1) {
    ctx.strokeColor = 'rgb(' + r + ',' + r + ',' + r + ')';
  } else if (arguments.length == 3) {
    ctx.strokeColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (arguments.length == 4) {
    ctx.strokeColor = 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
}



    
  
