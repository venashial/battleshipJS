const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let rotated = false

const lines = [];

const colors = [
  ['#1c1b29', '#8C6FE5'],
  ['#1c1b29', '#9170db'],
  ['#1c1b29', '#9571d2'],
  ['#1c1b29', '#9a72c8'],
  ['#1c1b29', '#9f73bf'],
  ['#1c1b29', '#a374b5'],
  ['#1c1b29', '#a875ac'],
  ['#1c1b29', '#ad76a2'],
  ['#1c1b29', '#b17799'],
  ['#1c1b29', '#b67890'],
  ['#1c1b29', '#bb7986'],
  ['#1c1b29', '#bf7a7d'],
  ['#1c1b29', '#c47b73'],
  ['#1c1b29', '#bf7a7d'],
  ['#1c1b29', '#bb7986'],
  ['#1c1b29', '#b67890'],
  ['#1c1b29', '#b17799'],
  ['#1c1b29', '#ad76a2'],
  ['#1c1b29', '#a875ac'],
  ['#1c1b29', '#a374b5'],
  ['#1c1b29', '#9f73bf'],
  ['#1c1b29', '#9a72c8'],
  ['#1c1b29', '#9571d2'],
  ['#1c1b29', '#9170db'],

];


var colorIndex = -1;

var step = 0,
  width = 0,
  height = 0;

document.touchStarted = rotateCanvas;
document.onmousedown = rotateCanvas;
window.onresize = setup;

function rotateCanvas() {
  if (rotated == true) {
    rotated = false
  } else {
    rotated = true
  }
}

setup();
colorstep();
update();

function setup() {

  width = window.innerWidth;
  height = window.innerHeight;

  lines.length = 0;

  let lineCount = height / 26;
  let pointCount = 14;
  let spacingH = width / pointCount;
  let spacingV = height / lineCount;

  for (let v = 0; v < lineCount; v++) {

    let line = {
      points: [],
      ran: 0.2 + Math.random() * 0.7
    };

    for (let h = 0; h < pointCount; h++) {
      line.points.push({
        nx: h * spacingH,
        ny: v * spacingV
      });

    }

    line.points.push({
      nx: width + spacingH,
      ny: v * spacingV
    });


    lines.push(line);

  }

}

function colorstep() {

  colorIndex = ++colorIndex % colors.length;
  canvas.style.backgroundColor = colors[colorIndex][0];

}

function update() {

  canvas.width = width;
  canvas.height = height;

  context.clearRect(0, 0, width, height);
  
  if (rotated == true) {
  step += -0.6
  } else {
    step += 0.6;
  }

  context.lineWidth = 2;
  context.strokeStyle = colors[colorIndex][1];
  context.fillStyle = colors[colorIndex][0];

  lines.forEach((line, v) => {

    context.beginPath();

    line.points.forEach((point, h) => {

      point.x = point.nx,
        point.y = point.ny + Math.sin((point.x * line.ran + (step + point.ny)) / 40) * (6 + point.ny / height * 34);

    });

    line.points.forEach((point, h) => {

      let nextPoint = line.points[h + 1];

      if (h === 0) {
        context.moveTo(point.x, point.y);
      } else
      if (nextPoint) {
        let cpx = point.x + (nextPoint.x - point.x) / 2;
        let cpy = point.y + (nextPoint.y - point.y) / 2;
        context.quadraticCurveTo(point.x, point.y, cpx, cpy);
      }

    });

    context.stroke();

    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();

  });

  context.fillStyle = "rgba(0, 0, 0, 0.15)";
  context.fillRect(0, 0, width, height);

  requestAnimationFrame(update);

}

var colorloop = self.setInterval(colorstep, 400);

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}