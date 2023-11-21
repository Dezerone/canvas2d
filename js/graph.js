function Graph(options) {
  options = options || {};
  const id = options.id;
  const width = options.width || 300;
  const height = options.height || 300;
  const WIN = options.WIN || {};
  let canvas;
  if (id) {
    canvas = document.getElementById(id);
  } else {
    canvas = document.createElement('canvas');
    document.querySelector('body').appendChild(canvas);
  }
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  const PI2 = Math.PI * 2;
  const callbacks = options.callbacks;
  canvas.addEventListener('wheel', callbacks.wheel);
  canvas.addEventListener('mousemove', callbacks.mousemove);
  canvas.addEventListener('mousedown', callbacks.mousedown);
  canvas.addEventListener('mouseup', callbacks.mouseup);
  canvas.addEventListener('mouseout', callbacks.mouseout);

  const xs = (x) => {
    return (canvas.width * (x - WIN.left) / WIN.width);
  }

  const ys = (y) => {
    return (canvas.height - (canvas.height * (y - WIN.bottom) / WIN.height));
  }

  this.clear = function () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  this.line = function (x1, y1, x2, y2, color, width, isDash) {
    ctx.beginPath();
    isDash = isDash || false;
    ctx.strokeStyle = color || 'black';
    ctx.lineWidth = width || 3;
    if (isDash) {
      ctx.setLineDash([10, 10]);
    }
    else {
      ctx.setLineDash([0, 0]);
    }
    ctx.moveTo(xs(x1), ys(y1));
    ctx.lineTo(xs(x2), ys(y2));
    ctx.stroke();
    ctx.closePath();
  }

  this.text = function (text, x, y, color, size, font) {
    ctx.beginPath();
    font = font || 'Arial';
    size = size || "18";
    ctx.font = size + "px " + font;
    ctx.fillStyle = color || 'black';
    ctx.fillText(text, xs(x), ys(y));
    ctx.closePath();
  }

  this.point = function (x, y, color, size) {
    ctx.beginPath();
    ctx.strokeStyle = color || 'white';
    ctx.arc(xs(x), ys(y), size || 1, 0, PI2);
    ctx.stroke();
    ctx.closePath();
  } 
  var positionsButton= 0; 
  const green = '#1be81b';
  const red = '#e81b1b';
  const moveButton = document.getElementById("choiseMove");
  const lineButton = document.getElementById("choiseLine");

  // Добавляем обработчик события "click" для каждой кнопки
  moveButton.addEventListener("click", function () {
    console.log("Нажата кнопка 'choiseMove'"); 
    positionsButton=1;
    console.log(positionsButton); 
  });

  lineButton.addEventListener("click", function () {
    console.log("Нажата кнопка 'choiseLine'");  
    positionsButton=0;
    console.log(positionsButton); 
  });
}