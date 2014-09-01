var ctx;


function init(context) {
  ctx = context;
  ctx.font = '24pt Calibri';
  width = ctx.canvas.width;
  height = ctx.canvas.height;
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

function fillRect(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function text(msg, x, y) {
  ctx.fillText(msg, x, y);
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

function clear(r, g, b, a) {

  if (arguments.length > 0) {
    fill(r, g, b, a);
  }

  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();

  if (arguments.length > 0) {
    fillRect(0, 0, canvas.width, canvas.height);
  }
}

function colorFromArgs(r, g, b, a) {
  if (r >= 0 && g >= 0 && b >= 0 && a >= 0) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  if (r >= 0 && g >= 0 && b >= 0) {
    return 'rgba(' + r + ',' + g + ',' + b + ',1.0)';
  }

  if (r >= 0 && g >= 0) {
    return 'rgba(' + r + ',' + r + ',' + r + ',' + g + ')';
  }

  if (r >= 0) {
    return 'rgba(' + r + ',' + r + ',' + r + ',1.0)';
  }

  return 'rgba(0, 0, 0, 1.0)';
}

function stroke(r,g,b,a) {
//  if (arguments.length == 1) {
//    ctx.strokeStyle = 'rgb(' + r + ',' + r + ',' + r + ')';
//  } else if (arguments.length == 3) {
//    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
//  } else if (arguments.length == 4) {
//    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
//  }
  ctx.strokeStyle = colorFromArgs(r, g, b, a);
}

function fill(r,g,b,a) {
  ctx.fillStyle = colorFromArgs(r, g, b, a);
}



    
  
