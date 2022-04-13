var output = function (input) {
    var winSize = 220;
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
}
var logoDisplay = new p5(output, "logo");
