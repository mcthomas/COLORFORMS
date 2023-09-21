var output = function (input) {
    var winSize = 220;
    touchX = winSize / 2;
    touchY = winSize / 2;
    var gameMode = false;
    var particleCollisions = [];
    ball = null;
    var balls = 3;
    activePaddle = null;
    //Divides a line into three proportional to the window size; q1 is a start coord, q2 is length, q3 is end coord
    var q1 = .25*winSize;
    var q2 = .5*winSize;
    var q3 = .75*winSize;
    var colInc = 3.53;
    var lineWidth = .04*winSize;
    var radius = q1;
    var grad1 = [256,0,0,0];
    var score = 0;
    var startTime = 0;
    var gameOver = false;
    var loseImg = null;
    let wall = new Audio('style/sounds/wall.mp3');
    wall.volume = 0.025;
    let paddle = new Audio('style/sounds/paddle.mp3');
    paddle.volume = 0.025;
    let out = new Audio('style/sounds/out.mp3');
    out.volume = 0.025;
    input.preload = function () {
      hairline = input.loadFont('style/fonts/Hairline.ttf')
      loseImg = input.loadImage('style/images/lose.png');
    }
    input.setup = function () {
        input.createCanvas(winSize + 100, winSize + 100);
        input.frameRate(60);
    }
    input.draw = function () {
      input.translate(50, 50, 0);
      //each rect dimensions wil be q2xlineWidth (we won't see the full spectrum at once, would require 6 rects instead of 4)
      input.background(204,204,204);
      color();
      input.fill(204, 204, 204);
      //Rounding left segment, top then bottom
      roundCorners(0, q1, 0, q1+7, .25*lineWidth, q1+3, .75*lineWidth, q1+3, lineWidth, q1+7, lineWidth, q1, 0, q1);
      roundCorners(0, q3, 0, q3-7, .25*lineWidth, q3-3, .75*lineWidth, q3-3, lineWidth, q3-7, lineWidth, q3, 0, q3);
      //Rounding bottom segment, left then right
      roundCorners(q1, winSize-lineWidth, q1+7, winSize-lineWidth, q1+3, winSize-.75*lineWidth, q1+3, winSize-.25*lineWidth, q1+7, winSize, q1, winSize, q1, winSize-lineWidth);
      roundCorners(q3, winSize-lineWidth, q3-7, winSize-lineWidth, q3-3, winSize-.75*lineWidth, q3-3, winSize-.25*lineWidth, q3-7, winSize, q3, winSize, q3, winSize-lineWidth);
      //Rounding top segment, left then right
      roundCorners(q1, 0, q1+7, 0, q1+3, .75*lineWidth, q1+3, .25*lineWidth, q1+7, lineWidth, q1, lineWidth, q1, 0);
      roundCorners(q3, 0, q3-7, 0, q3-3, .75*lineWidth, q3-3, .25*lineWidth, q3-7, lineWidth, q3, lineWidth, q3, 0);
      //Rouding right segment, top then bottom
      roundCorners(winSize-lineWidth, q1, winSize-lineWidth, q1+7, winSize-.25*lineWidth, q1+3, winSize-.75*lineWidth, q1+3, winSize, q1+7, winSize, q1, winSize-lineWidth, q1);
      roundCorners(winSize-lineWidth, q3, winSize-lineWidth, q3-7, winSize-.25*lineWidth, q3-3, winSize-.75*lineWidth, q3-3, winSize, q3-7, winSize, q3, winSize-lineWidth, q3);
      if(gameMode){
        game();
      }
    }
    var color = function() {
      for(var i = 0; i < q2; i+=1) {
          if(i <= radius) {
            input.stroke(grad1[0], grad1[1], grad1[2], i/radius*256);
            input.fill(grad1[0], grad1[1], grad1[2], i/radius*256);
          }
          else if(i >= (q2-radius)) {
            input.stroke(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
            input.fill(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
          }
          else
            input.stroke(grad1[0], grad1[1], grad1[2], 256);
            input.fill(grad1[0], grad1[1], grad1[2], 256);
            input.line(0,q1+i,lineWidth,q1+i);
          calcHue(grad1);
      }
      for(var i = 0; i < q2; i+=1) {
            if(i <= radius) {
              input.stroke(grad1[0], grad1[1], grad1[2], i/radius*256);
              input.fill(grad1[0], grad1[1], grad1[2], i/radius*256);
            }
            else if(i >= (q2-radius)) {
              input.stroke(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
              input.fill(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
            }
            else
          input.stroke(grad1[0], grad1[1], grad1[2]);
          input.fill(grad1[0], grad1[1], grad1[2]);
          input.line(q1+i,winSize,q1+i,winSize-lineWidth);
          calcHue(grad1);
          }
      for(var i = 0; i < q2; i+=1) {
        if(i <= radius) {
          input.stroke(grad1[0], grad1[1], grad1[2], i/radius*256);
          input.fill(grad1[0], grad1[1], grad1[2], i/radius*256);
        }
        else if(i >= (q2-radius)) {
          input.stroke(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
          input.fill(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
        }
        else
          input.stroke(grad1[0], grad1[1], grad1[2]);
          input.fill(grad1[0], grad1[1], grad1[2]);
          input.line(winSize-lineWidth,q3-i,winSize,q3-i);
          calcHue(grad1);
      }
      for(var i = 0; i < q2; i+=1) {
        if(i <= radius) {
          input.stroke(grad1[0], grad1[1], grad1[2], i/radius*256);
          input.fill(grad1[0], grad1[1], grad1[2], i/radius*256);
        }
        else if(i >= (q2-radius)) {
          input.stroke(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
          input.fill(grad1[0], grad1[1], grad1[2], ((q2-i)/radius)*256);
        }
        else
          input.stroke(grad1[0], grad1[1], grad1[2]);
          input.fill(grad1[0], grad1[1], grad1[2]);
          input.line(q3-i,0,q3-i,lineWidth);
          calcHue(grad1);
      }
    }
    var calcHue = function (RGB) {
        //3 components, 6 combos: 100 110 010 011 001 101 
        if(RGB[0] >= 256 && RGB[1] <= 0 && RGB[2] <= 0) {
            RGB[3] = 0;
        }
        else if(RGB[0] >= 256 && RGB[1] >= 256 && RGB[2] <= 0){
            RGB[3] = 1;
        }
        else if(RGB[0] <= 0 && RGB[1] >= 256 && RGB[2] <= 0){
            RGB[3] = 2;
        }
        else if(RGB[0] <= 0 && RGB[1] >= 256 && RGB[2] >= 256){
            RGB[3] = 3;
        }
        else if(RGB[0] <= 0 && RGB[1] <= 0 && RGB[2] >= 256){
            RGB[3] = 4;
        }
        else if(RGB[0] >= 256 && RGB[1] <= 0 && RGB[2] >= 256){
            RGB[3] = 5;
        }
        if(RGB[3] == 0) {
            RGB[1] += colInc;
        }
        else if(RGB[3] == 1) {
            RGB[0] -= colInc;
        }
        else if(RGB[3] == 2) {
            RGB[2] += colInc;
        }
        else if(RGB[3] == 3) {
            RGB[1] -= colInc;
        }
        else if (RGB[3] == 4) {
            RGB[0] += colInc;
        }
        else {
            RGB[2] -= colInc;
        }
    }
    var roundCorners = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7) {
      input.beginShape();
      input.vertex(x1, y1);
      input.vertex(x2, y2);
      input.bezierVertex(x3, y3, x4, y4, x5, y5);
      input.vertex(x6, y6);
      input.vertex(x7, y7);
      input.endShape();
    }
    input.mousePressed = function() {
      if(!gameMode && input.mouseX > 0 && input.mouseX < winSize && input.mouseY > 0 && input.mouseY < winSize) {
        gameMode = true;
        disableKeyScroll();
      }
    }
    input.keyPressed = function() {

    }
    var game = function () {
      if(!gameOver) {
        drawStats();
        checkGameOver();
        drawParticles();
        drawBall();
        collisionDetector();
        paddleHandler();
      }
      else {
        if((input.millis() - startTime) > 2500) {
          gameOver = false;
          score = 0;
          balls = 3;
          gameMode = false;
        }
        else {
          drawStats();
          input.image(loseImg, winSize / 2.6, winSize / 2.5, loseImg.width / 2, loseImg.height / 2)
        }
      }
    }
    var drawStats = function () {
      input.translate(-50, -50, 0);
      input.textFont(hairline);
      input.textSize(18);
      input.textAlign(input.RIGHT);
      if(gameOver) {
        input.fill(grad1[0], grad1[1], grad1[2], 256);
      }
      else {
        input.fill(64,64,64);
      }
      input.text(score, 210, 15);
      input.stroke(64, 64, 64);
      input.strokeWeight(1);
      input.noFill();
      if(balls > 0){
        input.fill(64,64,64);
      }
      input.circle(112, 9, 7);
      input.noFill();
      if(balls > 1){
        input.fill(64,64,64);
      }
      input.circle(122, 9, 7);
      input.noFill();
      if(balls > 2){
        input.fill(64,64,64);
      }
      input.circle(132, 9, 7);
      input.translate(50, 50, 0);
    }
    var checkGameOver = function () {
      if(balls == -1) {
        gameOver = true;
        startTime = input.millis();
      }
    }
    var drawBall = function () {
      if(ball == null) {
        ball = new Ball();
      }
      input.noStroke();
      input.fill(64,64,64);
      input.circle(ball.x, ball.y, 1.25*lineWidth); 
      if((input.millis() - startTime) > 1500) {
        ball.x += ball.dx;
        ball.y += ball.dy;
      }
    }
    class Ball {
      constructor() {
        this.x = winSize/2;
        this.y = winSize/2;
        var d1 = (Math.random() * .2) + .2
        var d2 = 1 - input.abs(d1);
        if(Math.random() < 0.5) {
          this.dx = (Math.random() < 0.5 ? -1 : 1) * d1
          this.dy = (Math.random() < 0.5 ? -1 : 1) * d2
        }
        else {
          this.dx = (Math.random() < 0.5 ? -1 : 1) * d2
          this.dy = (Math.random() < 0.5 ? -1 : 1) * d1
        }
      }
    }
  var collisionDetector = function () {
    //The four wall collisions; padding of 5 added for center-ball tracking radius
    if((ball.x-5 <= lineWidth) && (ball.y+5 >= q1) && (ball.y-5 <= q3)) {
      ball.dx = collisionResolver(ball.dx);
    } 
    if((ball.x+5 >= winSize - lineWidth) && (ball.y+5 >= q1) && (ball.y-5 <= q3)) {
      ball.dx = collisionResolver(ball.dx);
    } 
    if((ball.x+5 >= q1) && (ball.x-5 <= q3) && (ball.y-5 <= lineWidth)) {
      ball.dy = collisionResolver(ball.dy);
    } 
    if((ball.x+5 >= q1) && (ball.x-5 <= q3) && (ball.y+5 >= winSize - lineWidth)) {
      ball.dy = collisionResolver(ball.dy);
    } 
    //The four paddle collisions
    if(intersects(ball.x, ball.y)) {
      collisionResolver();
    }
  }
  var collisionResolver = function (coord = null) {
    if (coord == null) {
      paddle.play();
      var signX = 1
      var signY = 1
      switch(activePaddle) {
        case "LU":
          var oldBallDx = ball.dx;
          ball.dx = -1 * ball.dy;
          ball.dy = -1 * oldBallDx;
          break;
        case "RU":
          var oldBallDx = ball.dx;
          ball.dx = ball.dy;
          ball.dy = oldBallDx;
          break;
        case "LD":
          var oldBallDx = ball.dx;
          ball.dx = ball.dy;
          ball.dy = oldBallDx;
          break;
        case "RD":
          var oldBallDx = ball.dx;
          ball.dx = -1 * ball.dy;
          ball.dy = -1 * oldBallDx;
          break;
      }
    }
    else {
      wall.play();
      particleCollisions.push([ball.x, ball.y, ball.dx, ball.dy, input.millis()])
      var vel = input.abs(ball.dx) + input.abs(ball.dy)
      score += (10 * vel);
      if(vel < 10) {
        colInc += .015;
        if(coord < 0) {
          return (-1 * coord) + .5;
        }
        else {
          return (-1 * coord) - .5;
        }
      }
      else {
        return -1 * coord
      }
    }
    return
  }
  var intersects = function (x, y) {
    //Invert X
    var invX = winSize - x;
    //Invert Y
    var invY = winSize - y;
    var sum = x + y;
    var vel = input.abs(ball.dx) + input.abs(ball.dy) + 1;
    switch(activePaddle) {
      case "LU":
        if((x + y) < 75 && (x + y) > (75 - vel)) {
          return true;
        }
        break;
      case "RU":
        if(sum > 75 && sum < 365 && (x + invY) > 365 && (x + invY) < (365 + vel)) {
          return true;
        }
        break;
      case "LD":
        if(sum > 74 && sum < 365 && (invX + y) > 365 && (x + invY) < (365 + vel)) {
          return true;
        }
        break;
      case "RD":
        if((x + y) > 365 && (x + y) < (365 + vel)) {
          return true;
        }
        break
    }
    if(((x + y) < 72.5) || 
    ((x + y) > 367.5) || 
    (sum > 72.5 && sum < 367.5 && (x + invY) > 366) || 
    (sum > 72.5 && sum < 367.5 && (invX + y) > 366)) {
      out.play();
      balls -= 1;
      ball = new Ball();
      colInc = 3.53;
      grad1 = [256,0,0,0];
      startTime = input.millis();
      return false;
    }
  }
  var paddleHandler = function () {
    if (input.keyIsDown(37) && input.keyIsDown(38) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
      //LU
      input.fill(175, 175, 175);
      activePaddle = "LU";
      drawPaddle("LU");
    }
    else if (input.keyIsDown(65) && input.keyIsDown(87) && !input.keyIsDown(68) && !input.keyIsDown(83)) {
      //LU
      input.fill(175, 175, 175);
      activePaddle = "LU";
      drawPaddle("LU");
    }
    else if (touchX < 110 && touchY < 135) {
      //LU
      input.fill(175, 175, 175);
      activePaddle = "LU";
      drawPaddle("LU");
    }
    else if (input.keyIsDown(39) && input.keyIsDown(38) && !input.keyIsDown(37) && !input.keyIsDown(40)) {
      //RU
      input.fill(175, 175, 175);
      activePaddle = "RU"
      drawPaddle("RU");
    }
    else if (input.keyIsDown(68) && input.keyIsDown(87) && !input.keyIsDown(83) && !input.keyIsDown(65)) {
      //RU
      input.fill(175, 175, 175);
      activePaddle = "RU"
      drawPaddle("RU");
    }
    else if (touchX > 110 && touchY < 135) {
      //RU
      input.fill(175, 175, 175);
      activePaddle = "RU"
      drawPaddle("RU");
    }
    else if (input.keyIsDown(37) && input.keyIsDown(40) && !input.keyIsDown(38) && !input.keyIsDown(39)) {
      //LD
      input.fill(175, 175, 175);
      activePaddle = "LD"
      drawPaddle("LD");
    }
    else if (input.keyIsDown(65) && input.keyIsDown(83) && !input.keyIsDown(87) && !input.keyIsDown(68)) {
      //LD
      input.fill(175, 175, 175);
      activePaddle = "LD"
      drawPaddle("LD");
    }
    else if (touchX < 110 && touchY > 135) {
      //LD
      input.fill(175, 175, 175);
      activePaddle = "LD"
      drawPaddle("LD");
    }
    else if (input.keyIsDown(39) && input.keyIsDown(40) && !input.keyIsDown(37) && !input.keyIsDown(38)) {
      //RD
      input.fill(175, 175, 175);
      activePaddle = "RD"
      drawPaddle("RD");
    }
    else if (input.keyIsDown(68) && input.keyIsDown(83) && !input.keyIsDown(65) && !input.keyIsDown(87)) {
      //RD
      input.fill(175, 175, 175);
      activePaddle = "RD"
      drawPaddle("RD");
    }
    else if (touchX > 110 && touchY > 135) {
      //RD
      input.fill(175, 175, 175);
      activePaddle = "RD"
      drawPaddle("RD");
    }
    else if (input.keyIsDown(37) && !input.keyIsDown(38) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
      //L
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LU");
      drawPaddle("LD");
    }
    else if (input.keyIsDown(65) && !input.keyIsDown(87) && !input.keyIsDown(68) && !input.keyIsDown(83)) {
      //L
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LU");
      drawPaddle("LD");
    }
    else if (input.keyIsDown(39) && !input.keyIsDown(37) && !input.keyIsDown(38) && !input.keyIsDown(40)) {
      //R
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("RU");
      drawPaddle("RD");
    }
    else if (input.keyIsDown(68) && !input.keyIsDown(65) && !input.keyIsDown(87) && !input.keyIsDown(83)) {
      //R
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("RU");
      drawPaddle("RD");
    }
    else if (input.keyIsDown(38) && !input.keyIsDown(37) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
      //U
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LU");
      drawPaddle("RU");
    }
    else if (input.keyIsDown(87) && !input.keyIsDown(65) && !input.keyIsDown(68) && !input.keyIsDown(83)) {
      //U
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LU");
      drawPaddle("RU");
    }
    else if (input.keyIsDown(40) && !input.keyIsDown(37) && !input.keyIsDown(38) && !input.keyIsDown(39)) {
      //D
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LD");
      drawPaddle("RD");
    }
    else if (input.keyIsDown(83) && !input.keyIsDown(65) && !input.keyIsDown(87) && !input.keyIsDown(68)) {
      //D
      input.noFill();
      input.stroke(175, 175, 175)
      activePaddle = null;
      drawPaddle("LD");
      drawPaddle("RD");
    }
    else {
      activePaddle = null;
    }
  }
  var drawPaddle = function (paddle) {
    input.push();
    input.angleMode(input.DEGREES);
    switch (paddle) {
      case "LU":
        input.translate(lineWidth-10, q1-2.5);
        input.rotate(315);
        input.rect(0, 0, q1*1.37, 10, 5);
        break;
      case "RU":
        input.translate(q3+2.5, 0);
        input.rotate(45);
        input.rect(0, 0, q1*1.37, 10, 5);
        break;
      case "LD":
        input.translate(lineWidth-2.5, q3-5);
        input.rotate(45);
        input.rect(0, 0, q1*1.37, 10, 5);
        break;
      case "RD":
        input.translate(q3-4.5, q3+q1-6.5);
        input.rotate(315);
        input.rect(0, 0, q1*1.37, 10, 5);
        break
    }
    input.pop();
  }
  var drawParticles = function () {
    for(var i = 0; i < particleCollisions.length; i++) {
      if((particleCollisions[i][4] + 500) < input.millis()) {
        particleCollisions.splice(i, 1);
      }
    }
    for(var i = 0; i < particleCollisions.length; i++) {
      input.fill(256, 256, 256, 256);
      input.noStroke();
      var dxVariation = Math.random() - .5;
      var dyVariation = Math.random() - .5;
      input.ellipse(
        particleCollisions[i][0] + ((particleCollisions[i][2] + dxVariation) * ((input.millis() - particleCollisions[i][4]) / 500) * 15), 
        particleCollisions[i][1] + ((particleCollisions[i][3] + dyVariation) * ((input.millis() - particleCollisions[i][4]) / 500) * 15), 
        2, 
        2
      );  
    }
  }
  input.touchStarted = function () {
    touchX = input.mouseX;
    touchY = input.mouseY;
  }
  input.touchEnded = function () {
    touchX = winSize / 2;
    touchY = winSize / 2;
  }
  var disableKeyScroll = function () {
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
  }
}
var logoDisplay = new p5(output, "logo");