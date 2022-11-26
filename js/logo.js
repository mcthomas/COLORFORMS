var output = function (input) {
    var winSize = 220;
    var gameMode = false;
    ball = null;
    activePaddle = null;
    //Divides a line into three proportional to the window size; q1 is a start coord, q2 is length, q3 is end coord
    var q1 = .25*winSize;
    var q2 = .5*winSize;
    var q3 = .75*winSize;
    var colInc = 3.53;
    var lineWidth = .04*winSize;
    var halfLineWidth = .5*lineWidth;
    var radius = q1;
    var grad1 = [256,0,0,0];
    input.setup = function () {
        input.createCanvas(winSize,winSize);
        input.frameRate(60);
    }
    input.draw = function () {
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
      console.log(input.mouseX);
      console.log(input.mouseY);
      if(!gameMode && input.mouseX > 0 && input.mouseX < winSize && input.mouseY > 0 && input.mouseY < winSize) {
        gameMode = true;
        disableKeyScroll();
      }
    }
    input.keyPressed = function() {

    }
    var game = function () {
      drawBall();
      collisionDetector();
      paddleHandler();
    }
    var drawBall = function () {
      if(ball == null) {
        ball = new Ball();
      }
      input.noStroke();
      input.fill(64,64,64);
      input.circle(ball.x, ball.y, 1.25*lineWidth); 
      ball.x += ball.dx;
      ball.y += ball.dy;
    }
    class Ball {
      constructor() {
        this.x = winSize/2;
        this.y = winSize/2;
        this.dx = -0.5 + Math.random();
        this.dy = -0.5 + Math.random();
        //Here we do some extra math to ensure dx and dy will add to 1 (for consistent speed)
        if (this.dy < 0) {
          this.dy = -1 * (1 - input.abs(this.dx));
        }
        else if (this.dy > 0) {
          this.dy = 1 - input.abs(this.dx);
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
    if((activePaddle == "LU") && intersects(ball.x, ball.y)) {
      ball.dx = collisionResolver(ball.dx);
    }
    if((activePaddle == "RU") && intersects(ball.x, ball.y)) {
      ball.dx = collisionResolver(ball.dx);
    }
    if((activePaddle == "LD") && intersects(ball.x, ball.y)) {
      ball.dx = collisionResolver(ball.dx);
    }
    if((activePaddle == "RD") && intersects(ball.x, ball.y)) {
      ball.dx = collisionResolver(ball.dx);
    }
  }
  var collisionResolver = function (axis) {
    axis = -1 * axis;
    return axis
  }
  var intersects = function (x, y) {
    switch(activePaddle) {
      case "LU":
        if((x < 100) && (input.abs(x-y) < 50)) {
          return true;
        }
        break;
      case "RU":
        if((x > 100) && (input.abs(x-y) < 50)) {
          return true;
        }
        break;
      case "LD":
        if((x < 100) && (input.abs(x-y) > 150)) {
          return true;
        }
        break;
      case "RD":
        if((x < 100) && (input.abs(x-y) > 150)) {
          return true;
        }
        break
    }
  }
  var paddleHandler = function () {
    //left 37, right 39, up 38, down 40
    if (input.keyIsDown(37) && input.keyIsDown(38) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
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
    else if (input.keyIsDown(37) && input.keyIsDown(40) && !input.keyIsDown(38) && !input.keyIsDown(39)) {
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
    else if (input.keyIsDown(37) && !input.keyIsDown(38) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
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
    else if (input.keyIsDown(38) && !input.keyIsDown(37) && !input.keyIsDown(39) && !input.keyIsDown(40)) {
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
  var disableKeyScroll = function () {
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
  }
}
var logoDisplay = new p5(output, "logo");
