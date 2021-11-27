var output = function(input) {
//size, posx, posy, trajx, trajy, auxtrajx, auxtrajy, decreasex, increasex, decreasey, increasey, color, fadeout, fadein
var nodes;
var toBeRemoved = 0;
var toBeAdded = 0;
input.setup = function() {
  input.createCanvas(900, 200);
  var nodeCount = 5 + Math.floor(Math.random() * 11);
  nodes = new Array(nodeCount);
  for(var i = 0; i < nodes.length; i++) {
    nodes[i] = new Array(6);
    nodes[i][0] = 10;
    nodes[i][1] = 25 + Math.floor(Math.random() * 876);
    nodes[i][2] = 25 + Math.floor(Math.random() * 156);
    nodes[i][3] = -.5 + Math.random();
    nodes[i][4] = -.5 + Math.random();
    nodes[i][5] = 0;
    nodes[i][6] = 0;
    nodes[i][7] = false;
    nodes[i][8] = false;
    nodes[i][9] = false;
    nodes[i][10] = false;
    nodes[i][11] = [Math.floor(Math.random() * 257), Math.floor(Math.random() * 257), Math.floor(Math.random() * 257), 256];
    nodes[i][12] = false;
    nodes[i][13] = false;
  }

};

input.draw = function() {
  input.clear();
  augmentNode();
  checkCollisions();
  varyNodeSizes();
  varyNodeColors();
  moveNodes();
  connections();
  drawNodes();
};
var augmentNode = function() {
    var targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    if((Math.floor(Math.random() * 49) == 0) && (nodes.length > 4) && !((nodes.length - toBeRemoved) < 5)) {
        if(!targetNode[13]) {
            targetNode[12] = true;
            toBeRemoved++;
        }
    } 
    targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    if((Math.floor(Math.random() * 50) == 0) && (nodes.length < 16) && !((nodes.length + toBeAdded) > 15)) {
        if(!targetNode[12]) {
        createNode();
        nodes[nodes.length-1][11][3] = 0.0; 
        nodes[nodes.length-1][13] = true;
        toBeAdded++;
        }
    }
    var adjustedSize = nodes.length;
    var i = 0;
    while(i < nodes.length) {
        if (nodes[i][12] && !nodes[i][13]) {
            if (nodes[i][11][3] > 0) {
                nodes[i][11][3] -= .5;
            }
            else {
                nodes.splice(i,1);
                toBeRemoved--;
            }
        }
        else if (nodes[i][13] && !nodes[i][12]) {
            if (nodes[i][11][3] < 256) {
                nodes[i][11][3] += .5;
            }
            else {
                nodes[i][13] = false;
                toBeAdded--;
            }
        }
        i++;
    }
}
var createNode = function() {
    nodes[nodes.length] = new Array(0);
    nodes[nodes.length-1][0] = 10;
    nodes[nodes.length-1][1] = 25 + Math.floor(Math.random() * 876);
    nodes[nodes.length-1][2] = 25 + Math.floor(Math.random() * 156);
    nodes[nodes.length-1][3] = -.5 + Math.random();
    nodes[nodes.length-1][4] = -.5 + Math.random();
    nodes[nodes.length-1][5] = 0;
    nodes[nodes.length-1][6] = 0;
    nodes[nodes.length-1][7] = false;
    nodes[nodes.length-1][8] = false;
    nodes[nodes.length-1][9] = false;
    nodes[nodes.length-1][10] = false;
    nodes[nodes.length-1][11] = [Math.floor(Math.random() * 257), Math.floor(Math.random() * 257), Math.floor(Math.random() * 257), 1];
    nodes[nodes.length-1][12] = false;
    nodes[nodes.length-1][13] = false;
}
var checkCollisions = function() {
  for (var i = 0; i < nodes.length; i++) {
      if(!nodes[i][7] && !nodes[i][8]) {
      if((nodes[i][1] >= 875) && (nodes[i][3] > 0)) {
        nodes[i][7] = true;
        nodes[i][5] = nodes[i][3];
      }
      if((nodes[i][1] <= 25) && (nodes[i][3] < 0)) {
        nodes[i][8] = true;
        nodes[i][5] = nodes[i][3];
      }
      }
      else {
        oppAccel(i);
      }
      if(!nodes[i][9] && !nodes[i][10]) {
      if((nodes[i][2] >= 175) && (nodes[i][4] > 0)) {
        nodes[i][9] = true;
        nodes[i][6] = nodes[i][4];
      }
      if((nodes[i][2] <= 25) && (nodes[i][4] < 0)) {
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
var varyNodeColors = function() {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i][0] > 15) {
      nodes[i][0]-=1;
    }
    else if (nodes[i][0] < 5) {
      nodes[i][0]+=1;
    }
    else {
      nodes[i][11][0] += (-1 + Math.floor(Math.random() * 3));
      nodes[i][11][1] += (-1 + Math.floor(Math.random() * 3));
      nodes[i][11][2] += (-1 + Math.floor(Math.random() * 3));
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
    input.fill(nodes[i][11][0], nodes[i][11][1], nodes[i][11][2], nodes[i][11][3]);
    input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
  }
}
var connections = function() {
    for (var i = 0; i < nodes.length; i++) { 
        for (var j = 0; j < nodes.length; j++) {
            var distance = Math.sqrt(Math.pow(nodes[i][1]-nodes[j][1],2)+Math.pow(nodes[i][2]-nodes[j][2],2));
            if(distance < 100) {
                if((nodes[i][11][3] < 256) && (nodes[j][11][3] < 256)) {
                    if(nodes[i][11][3] < nodes[j][11][3]) {
                        input.stroke(256,256,256,nodes[i][11][3]*(1-(distance/100.0)));
                    }
                    else {
                        input.stroke(256,256,256,nodes[j][11][3]*(1-(distance/100.0)));
                    }
                }
                else if(nodes[i][11][3] < 256) {
                    input.stroke(256,256,256,nodes[i][11][3]*(1-(distance/100.0)));
                }
                else if(nodes[j][11][3] < 256) {
                    input.stroke(256,256,256,nodes[j][11][3]*(1-(distance/100.0)));
                }
                else {
                    input.stroke(256,256,256,256*(1-(distance/100.0)));      
                }
                    input.line(nodes[i][1],nodes[i][2],nodes[j][1],nodes[j][2]);
                    if(nodes[i][1] > nodes[j][1]) {
                        nodes[i][3] -= .005*(1-(distance/100.0));
                        nodes[j][3] += .005*(1-(distance/100.0));
                    }
                    else if(nodes[i][1] < nodes[j][1]) {
                        nodes[i][3] += .005*(1-(distance/100.0));
                        nodes[j][3] -= .005*(1-(distance/100.0));
                    }
                    if(nodes[i][2] > nodes[j][2]) {
                        nodes[i][4] -= .005*(1-(distance/100.0));
                        nodes[j][4] += .005*(1-(distance/100.0));
                    }
                    else if(nodes[i][2] < nodes[j][2]) {
                        nodes[i][4] += .005*(1-(distance/100.0));
                        nodes[j][4] -= .005*(1-(distance/100.0));
                    }

            }
        }
    }
}
};
var nodesDisplay = new p5(output, 'nodes');
