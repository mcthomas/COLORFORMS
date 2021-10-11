function setup() {
  "use strict";
  var canvas = document.getElementById("myCanvas");
  var slider1 = document.getElementById("slider1");
  slider1.value = 0;
  var slider2 = document.getElementById("slider2");
  slider2.value = 0;
  var slider3 = document.getElementById("slider3");
  slider3.value = -100;
  var translateX = 0;
  var rotateX = 1;
  var revolve = 5;
  var resetX = 0;
  var colors = [0, 0, 255];

  function draw() {
    var time = (slider2.value * Math.PI) / 180;
    colors[0] = Math.abs(slider2.value) * (255 / 100);
    colors[1] = Math.abs(slider2.value) * (125 / 100);
    colors[2] = 255 - Math.abs(slider2.value) * (255 / 100);
    var context = canvas.getContext("2d");

    canvas.width = canvas.width;
    var speed = slider1.value;
    var smoke = slider2.value;

    function drawBG() {
      context.beginPath();
      context.rect(0, 0, 900, 500);
      context.fillStyle =
        "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
      context.fill();
    }

    function drawSun() {
      context.beginPath();
      context.arc(0, -400, 40, 0, 2 * Math.PI);
      context.fillStyle = "yellow";
      context.fill();
      context.stroke();
    }

    function drawGround() {
      context.beginPath();
      context.rect(0, 410, 900, 90);
      context.fillStyle = "green";
      context.fill();
      context.beginPath();
      context.moveTo(0, 410);
      context.lineTo(900, 410);
      context.lineWidth = 10;
      context.stroke();
    }

    function drawGrass() {
      context.beginPath();

      for (var i = 0; i < 20; i++) {
        context.moveTo(100 * i, 460);
        context.lineTo(100 * i, 470);
        context.moveTo(100 * i + 50, 485);
        context.lineTo(100 * i + 50, 495);
        context.moveTo(100 * i + 50, 435);
        context.lineTo(100 * i + 50, 445);
      }

      context.lineWidth = 1;
      context.stroke();
      context.lineWidth = 10;
    }

    function drawTrainBody() {
      context.fillStyle = "grey";
      context.save();
      context.beginPath();
      context.arc(450, 250, 50, (3 * Math.PI) / 2, Math.PI / 2, false);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.moveTo(250, 150);
      context.lineTo(250, 200);
      context.lineTo(400, 200);
      context.lineTo(400, 160);
      context.lineTo(390, 160);
      context.lineTo(390, 150);
      context.lineTo(460, 150);
      context.lineTo(460, 150);
      context.lineTo(460, 160);
      context.lineTo(450, 160);
      context.lineTo(450, 200);
      context.lineTo(450, 300);
      context.lineTo(475, 325);
      context.lineTo(150, 325);
      context.lineTo(150, 300);
      context.lineTo(150, 175);
      context.lineTo(137.5, 162.5);
      context.lineTo(137.5, 150);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.rect(175, 180, 50, 50);
      context.closePath();
      context.fillStyle = "white";
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(475, 337.5, 12.5, (3 * Math.PI) / 2, Math.PI / 2, false);
      context.closePath();
      context.restore();
      context.fill();
      context.stroke();
      context.beginPath();
      context.moveTo(475, 325);
      context.lineTo(475, 350);
      context.lineTo(150, 350);
      context.lineTo(150, 325);
      context.closePath();
      context.fill();
      context.stroke();
    }

    function drawTrainWheels() {
      context.beginPath();
      context.arc(180, 380, 30, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(245, 380, 30, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(332.5, 380, 30, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(420, 380, 30, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.stroke();
    }

    function drawRods() {
      context.beginPath();
      context.moveTo(-20, -20);
      context.lineTo(20, 20);
      context.moveTo(-20, 20);
      context.lineTo(20, -20);
      context.closePath();
      context.stroke();
    }

    function drawSmoke() {
      context.beginPath();
      context.moveTo(20, 0);
      context.arc(20, 0, 25, 0, 2 * Math.PI);
      context.moveTo(390, 90);
      context.arc(0, -25, 15, 0, 2 * Math.PI);
      context.moveTo(-20, -33);
      context.arc(-20, -33, 8, 0, 2 * Math.PI);
      context.closePath();
      context.fillStyle = "rgba(255, 255, 255, 0.5)";
      context.fill();
    }
    //SAVE 1
    context.save();
    drawBG();

    context.translate(450, 450);
    context.rotate(time / 1.175);
    drawSun();

    //RESTORE 1
    context.restore();

    drawGround();
    //drawGrass();

    context.translate(translateX, 0);
    drawTrainBody();
    drawTrainWheels();

    context.save();

    context.translate(405, 115);
    context.scale(slider3.value / 100, slider3.value / 100);
    drawSmoke();

    context.restore();
    context.save();

    context.translate(-350 + -1 * (resetX + translateX), 0);
    drawGrass();

    context.restore();

    context.translate(180, 380);
    context.save();
    context.rotate(revolve);
    drawRods();
    context.restore();
    context.translate(65, 0);
    context.save();
    context.rotate(revolve);
    drawRods();
    context.restore();
    context.translate(87.5, 0);
    context.save();
    context.rotate(revolve);
    drawRods();
    context.restore();
    context.translate(87.5, 0);
    context.rotate(revolve);
    drawRods();
    revolve = (rotateX + translateX) / 60;
    context.restore();

    if (translateX < -135) translateX = -133;
    else if (translateX > 399) translateX = 397;
    else translateX = (translateX + slider1.value / 3250) % 400;

    window.requestAnimationFrame(draw);
  }

  function rotation() {
    rotateX = rotateX + 10;
    window.requestAnimationFrame(rotation);
  }

  function setResetX() {
    if (resetX > 185) {
      resetX = 0;
    } else {
      resetX = resetX + 10;
    }
    window.requestAnimationFrame(setResetX);
  }

  rotation();
  setResetX();

  slider1.addEventListener("input", draw);

  draw();
}
window.onload = setup;
