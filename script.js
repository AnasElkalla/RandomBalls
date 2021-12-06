const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
canvas.style.background = "black";
// c.fillStyle = "red";
// c.fillRect(100, 300, 100, 100);
// c.fillStyle = "yellow";
// c.fillRect(100, 600, 100, 100);
// c.fillStyle = "blue";
// c.fillRect(400, 300, 100, 100);
//line drawing

// c.beginPath();
// c.moveTo(x,y)
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "red";
// c.stroke();
//create arc or circle
//c.arc(x,y,radius,startAngle,endAngle,drawCounterClockwise: Bool(false))
// let x = 100;
// let y = 100;
// let radius = 20;

// function circle(x, y, radius) {
//   c.beginPath();
//   c.arc(x, y, radius, startAngle, endAngle, drawCounterClockwise);
//   color = [
//     "red",
//     "green",
//     "blue",
//     "yellow",
//     "black",
//     "pink",
//     "orange",
//     "brown",
//     "grey",
//   ];
//   let colorRoll = Math.floor(Math.random() * color.length);
//   c.strokeStyle = color[colorRoll];
// let randomColor = Math.floor(Math.random() * 256);
//   let red = Math.floor(Math.random() * 256);
//   let green = Math.floor(Math.random() * 256);
//   let blue = Math.floor(Math.random() * 256);

//   c.strokeStyle = `rgb(${red},${green},${blue})`;
//   c.stroke();
// }
// for (let i = 0; i < 100; i++) {
//   x = Math.floor(Math.random() * window.innerWidth);
//   y += 2;
//   startAngle = 0;
//   endAngle = Math.PI * 2;
//   drawCounterClockwise = false;
//   circle(x, y, radius);
// }
// let x = Math.floor(Math.random() * window.innerWidth);
// let y = Math.floor(Math.random() * window.innerHeight);
// let incrementX = 4;
// let incrementY = 4;
// let radius = 50;
// function drawCircle() {
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.fillStyle = "white";
//   c.fill();
// }

let mouse = {
  x: undefined,
  y: undefined,
};
let maxRadius = 40;
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});
window,
  addEventListener("resize", function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
function Circle(x, y, incrementX, incrementY, radius) {
  this.x = x;
  this.y = y;
  this.incrementX = incrementX;
  this.incrementY = incrementY;
  this.radius = Math.ceil(Math.random() * 20) + 4;
  this.minRadius = Math.ceil(Math.random() * 20) + 4;
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    let grd = c.createRadialGradient(
      this.x,
      this.y,
      this.radius - 2,
      this.x - 1,
      this.y - 1,
      this.radius / 5
    );

    grd.addColorStop(0, `rgb(${red},${green},${blue})`);
    grd.addColorStop(1, "white");
    c.fillStyle = grd;
    c.fill();
  };

  this.update = function () {
    this.x += this.incrementX;
    this.y += this.incrementY;
    if (this.x > innerWidth - this.radius) {
      this.incrementX = -Math.random() * 5;
    }
    if (this.x < this.radius) {
      this.incrementX = Math.random() * 5;
    }
    if (this.y > innerHeight - this.radius) {
      this.incrementY = -Math.random() * 5;
    }
    if (this.y < this.radius) {
      this.incrementY = Math.random() * 5;
    }
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius++;
        // this.incrementX++;
      }
    } else if (this.radius > this.minRadius) {
      this.radius--;
    }
    this.draw();
  };
}
let num = Math.ceil(Math.random() * 50) + 200;
let circleArr = [];
console.log(circleArr);
function init() {
  circleArr = [];
  for (let i = 1; i < num; i++) {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let incrementX = (Math.random() - 0.5) * 5;
    let incrementY = (Math.random() - 0.5) * 5;
    let radius = Math.ceil(Math.random() * 20) + 4;
    circleArr.push(new Circle(x, y, incrementX, incrementY, radius));
  }
}
init();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}
animate();
