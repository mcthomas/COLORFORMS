var output = function(input) {
//size, posx, posy, trajx, trajy, auxtrajx, auxtrajy, decreasex, increasex, decreasey, increasey, color
var nodes;
input.setup = function() {
  input.createCanvas(900, 200);
  var nodeCount = 2 + Math.floor(Math.random() * 9);
  nodes = new Array(nodeCount);
  for (var i = 0; i < nodeCount; i++) {
    nodes[i] = new Array(6);
    nodes[i][0] = 10;
    nodes[i][1] = 450;
    nodes[i][2] = 100;
    nodes[i][3] = -.5 + Math.random();
    nodes[i][4] = -.5 + Math.random();
    nodes[i][5] = 0;
    nodes[i][6] = 0;
    nodes[i][7] = false;
    nodes[i][8] = false;
    nodes[i][9] = false;
    nodes[i][10] = false;
    nodes[i][11] = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  }
};

input.draw = function() {
  input.clear();
  checkCollisions();
  varyNodeSizes();
  moveNodes();
  drawNodes();
  drawConnections();
};
var checkCollisions = function() {
  for (var i = 0; i < nodes.length; i++) {
      if(!nodes[i][7] && !nodes[i][8]) {
      if((nodes[i][1] >= 885) && (nodes[i][3] > 0)) {
        //nodes[i][3] = -1 * nodes[i][3];
        nodes[i][7] = true;
        nodes[i][5] = nodes[i][3];
      }
      if((nodes[i][1] <= 15) && (nodes[i][3] < 0)) {
        //nodes[i][3] = -1 * nodes[i][3];
        nodes[i][8] = true;
        nodes[i][5] = nodes[i][3];
      }
      }
      else {
        oppAccel(i);
      }
      if(!nodes[i][9] && !nodes[i][10]) {
      if((nodes[i][2] >= 185) && (nodes[i][4] > 0)) {
        //nodes[i][4] = -1 * nodes[i][4];
        nodes[i][9] = true;
        nodes[i][6] = nodes[i][4];
      }
      if((nodes[i][2] <= 15) && (nodes[i][4] < 0)) {
        //nodes[i][4] = -1 * nodes[i][4];
        nodes[i][10] = true;
        nodes[i][6] = nodes[i][4];
      }
      }
      else {
        oppAccel(i);
      }
    }
}
var oppAccel = function(i) {
    //if we hit aux x or aux y, set dec/inc to false
    if(nodes[i][7]) {
        if(nodes[i][3] <= (-1*nodes[i][5])) {
            nodes[i][7] = false;
        }
        else {
            nodes[i][3] -= .01;
        }
    }
    if(nodes[i][8]) {
        if(nodes[i][3] >= (-1*nodes[i][5])) {
            nodes[i][8] = false;
        }
        else {
            nodes[i][3] += .01;
        }
    }
    //replace 7 8 to 9 10, replace 3 5 to 4 6
    if(nodes[i][9]) {
        if(nodes[i][4] <= (-1*nodes[i][6])) {
            nodes[i][9] = false;
        }
        else {
            nodes[i][4] -= .01;
        }
    }
    if(nodes[i][10]) {
        if(nodes[i][4] >= (-1*nodes[i][6])) {
            nodes[i][10] = false;
        }
        else {
            nodes[i][4] += .01;
        }
    }
}
var varyNodeSizes = function() {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i][0] > 15) {
      nodes[i][0]-=.1;
    }
    else if (nodes[i][0] < 5) {
      nodes[i][0]+=.1;
    }
    else {
      nodes[i][0] += (-.1+(Math.random() * (.2).toFixed(1)));
    }
  }
}
var moveNodes = function() {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i][1] += nodes[i][3];
    nodes[i][2] += nodes[i][4];
  }
}
var drawNodes = function() {
  for (var i = 0; i < nodes.length; i++) {
    input.noStroke();
    input.fill(nodes[i][11][0], nodes[i][11][1], nodes[i][11][2]);
    input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
  }
}
var drawConnections = function() {
  
}
};
var nodesDisplay = new p5(output, 'nodes');
