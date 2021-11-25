var output = function(input) {
//size, posx, posy, trajx, trajy, color
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
    nodes[i][5] = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
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
  
}
var varyNodeSizes = function() {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i][0] > 15) {
      nodes[i][0]--;
    }
    else if (nodes[i][0] < 5) {
      nodes[i][0]++;
    }
    else {
      nodes[i][0] += (-1+(Math.floor(Math.random() * 3)));
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
    input.fill(nodes[i][5][0], nodes[i][5][1], nodes[i][5][2]);
    input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
  }
}
var drawConnections = function() {
  
}
};
var nodesDisplay = new p5(output, 'nodes');
