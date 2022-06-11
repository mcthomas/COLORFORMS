var output = function (input) {
    var winSize = 220;
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
}
var logoDisplay = new p5(output, "logo");