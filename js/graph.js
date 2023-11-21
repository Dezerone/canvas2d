function Graph(options) {
  options = options || {};
  var id = options.id;
  var width = options.width || 300;
  var height = options.height || 300;
  var WIN = options.WIN || {};
  var canvas;
  if (id) {
    canvas = document.getElementById(id);
  } else {
    canvas = document.createElement('canvas');
    document.querySelector('body').appendChild(canvas);
  }
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  var callbacks = options.callbacks;
  canvas.addEventListener('wheel', callbacks.wheel);
  canvas.addEventListener('mousedown', callbacks.moveWindow);
  canvas.addEventListener('mousemove', callbacks.moveWindow);
  canvas.addEventListener('mouseup', callbacks.moveWindow);
  

  const PI2 = 2 * Math.PI;

  function xs(x) {
    return (x - WIN.left) * canvas.width / WIN.width;
  }
  function ys(y) {
    return canvas.height - ((y - WIN.bottom) * canvas.height / WIN.height);
  }

  this.clear = function () {
    context.fillStyle = '#efe';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  this.line = function (x1, y1, x2, y2, color, width, isDash) {
    context.beginPath();
    context.strokeStyle =color ||'orange';
    if(isDash){ 
      context.setLineDash([1, 10]);
    }else{
      context.setLineDash([]);
    }
    context.lineWidth = width || 1;
    context.moveTo(xs(x1), ys(y1));
    context.lineTo(xs(x2), ys(y2));
    context.stroke();
    context.closePath();
  }

  this.point = function (x, y, color, size) {
    context.beginPath();
    context.strokeStyle = color || '#f0f';
    context.arc(xs(x), ys(y), size || 2, 0, PI2);
    context.stroke();
    context.closePath();
  } 
  this.text=function(text,x,y,color){
    context.fullStyle=color||'#f0f';
    context.font="20px Arial";
    context.fillText(text,xs(x),ys(y));
  }
}