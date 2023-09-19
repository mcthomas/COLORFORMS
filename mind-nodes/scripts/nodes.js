var output = function (input) {
  var nodes;
  var toBeRemoved = 0;
  var toBeAdded = 0;
  var colors = [
    [88, 86, 214], [0, 122, 255], [52, 170, 220], [90, 200, 250], [76, 217, 100],
    [255, 45, 85], [255, 59, 48], [255, 149, 0], [255, 204, 0], [142, 142, 147]
  ];
  var blogLinks = [
    "https://colorforms.works/mind-nodes/minimalism-in-art"
  ];
  var lastNodeHovered = null;

  input.setup = function () {
    input.createCanvas(900, 200);
    nodes = initializeNodes();
  };

  input.draw = function () {
    input.clear();
    augmentNode();
    checkCollisions();
    varyNodeSizes();
    moveNodes();
    connections();
    drawNodes();
  };

  function initializeNodes() {
    var nodeCount = 5 + Math.floor(Math.random() * 11);
    var initializedNodes = [];
    for (var i = 0; i < nodeCount; i++) {
      var currColor = colors[Math.floor(Math.random() * 10)];
      initializedNodes.push([
        10, 25 + Math.floor(Math.random() * 876), 25 + Math.floor(Math.random() * 156),
        -0.5 + Math.random(), -0.5 + Math.random(), 0, 0,
        false, false, false, false, [currColor[0], currColor[1], currColor[2], 256],
        false, false
      ]);
    }
    return initializedNodes;
  }

  function augmentNode() {
    var targetNode;
    if (Math.floor(Math.random() * 49) === 0 && nodes.length > 4 && !(nodes.length - toBeRemoved < 5)) {
      targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (!targetNode[13]) {
        targetNode[12] = true;
        toBeRemoved++;
      }
    }
    if (Math.floor(Math.random() * 50) === 0 && nodes.length < 16 && !(nodes.length + toBeAdded > 15)) {
      targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (!targetNode[12]) {
        createNode();
        nodes[nodes.length - 1][11][3] = 0.0;
        nodes[nodes.length - 1][13] = true;
        toBeAdded++;
      }
    }
    var adjustedSize = nodes.length;
    var i = 0;
    while (i < nodes.length) {
      if (nodes[i][12] && !nodes[i][13]) {
        if (nodes[i][11][3] > 0) {
          nodes[i][11][3] -= 0.5;
        } else {
          nodes.splice(i, 1);
          toBeRemoved--;
        }
      } else if (nodes[i][13] && !nodes[i][12]) {
        if (nodes[i][11][3] < 256) {
          nodes[i][11][3] += 0.5;
        } else {
          nodes[i][13] = false;
          toBeAdded--;
        }
      }
      i++;
    }
  }

  function createNode() {
    var currColor = colors[Math.floor(Math.random() * 10)];
    nodes.push([
      10, 25 + Math.floor(Math.random() * 876), 25 + Math.floor(Math.random() * 156),
      -0.5 + Math.random(), -0.5 + Math.random(), 0, 0,
      false, false, false, false, [currColor[0], currColor[1], currColor[2], 1],
      false, false
    ]);
  }

  function checkCollisions() {
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i][7] && !nodes[i][8]) {
        if (nodes[i][1] >= 850 && nodes[i][3] > 0) {
          nodes[i][7] = true;
          nodes[i][5] = nodes[i][3];
        }
        if (nodes[i][1] <= 50 && nodes[i][3] < 0) {
          nodes[i][8] = true;
          nodes[i][5] = nodes[i][3];
        }
      } else {
        oppAccel(i);
      }
      if (!nodes[i][9] && !nodes[i][10]) {
        if (nodes[i][2] >= 150 && nodes[i][4] > 0) {
          nodes[i][9] = true;
          nodes[i][6] = nodes[i][4];
        }
        if (nodes[i][2] <= 50 && nodes[i][4] < 0) {
          nodes[i][10] = true;
          nodes[i][6] = nodes[i][4];
        }
      } else {
        oppAccel(i);
      }
    }
  }

  function oppAccel(i) {
    if (nodes[i][7]) {
      if (nodes[i][3] <= -1 * nodes[i][5]) {
        nodes[i][7] = false;
      } else {
        nodes[i][3] -= 0.0125;
      }
    }
    if (nodes[i][8]) {
      if (nodes[i][3] >= -1 * nodes[i][5]) {
        nodes[i][8] = false;
      } else {
        nodes[i][3] += 0.0125;
      }
    }
    if (nodes[i][9]) {
      if (nodes[i][4] <= -1 * nodes[i][6]) {
        nodes[i][9] = false;
      } else {
        nodes[i][4] -= 0.0125;
      }
    }
    if (nodes[i][10]) {
      if (nodes[i][4] >= -1 * nodes[i][6]) {
        nodes[i][10] = false;
      } else {
        nodes[i][4] += 0.0125;
      }
    }
  }

  function varyNodeSizes() {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i][0] > 15) {
        nodes[i][0] -= 0.1;
      } else if (nodes[i][0] < 5) {
        nodes[i][0] += 0.1;
      } else {
        nodes[i][0] += -0.1 + Math.random() * 0.2;
      }
    }
  }

  function varyNodeColors() {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i][0] > 15) {
        nodes[i][0] -= 1;
      } else if (nodes[i][0] < 5) {
        nodes[i][0] += 1;
      } else {
        nodes[i][11][0] += -1 + Math.floor(Math.random() * 3);
        nodes[i][11][1] += -1 + Math.floor(Math.random() * 3);
        nodes[i][11][2] += -1 + Math.floor(Math.random() * 3);
      }
    }
  }

  function moveNodes() {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i][1] += nodes[i][3];
      nodes[i][2] += nodes[i][4];
    }
  }

  function drawNodes() {
    for (var i = 0; i < nodes.length; i++) {
      input.noStroke();
      input.fill(
        nodes[i][11][0],
        nodes[i][11][1],
        nodes[i][11][2],
        nodes[i][11][3]
      );
      input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
      var halfDiameter = .5 * nodes[i][0]
      if((input.mouseX > (nodes[i][1] - halfDiameter) && input.mouseX < (nodes[i][1] + halfDiameter)) 
      && (input.mouseY > (nodes[i][2] - halfDiameter) && input.mouseY < (nodes[i][2] + halfDiameter))) {
        document.documentElement.style.cursor = 'pointer';
        lastNodeHovered = i;
      }
      else if (i == lastNodeHovered) {
        document.documentElement.style.cursor = 'auto';
        lastNodeHovered = null;
      }
    }
  }

  function connections() {
    for (var i = 0; i < nodes.length; i++) {
      var mouseDistance = input.dist(
        nodes[i][1], nodes[i][2], input.mouseX, input.mouseY
      );
      if (mouseDistance < 100) {
        input.stroke(
          256,
          256,
          256,
          nodes[i][11][3] * (1 - mouseDistance / 100.0)
        );
        input.line(nodes[i][1], nodes[i][2], input.mouseX, input.mouseY);
        if (nodes[i][1] > input.mouseX) {
          nodes[i][3] -= 0.01 * (1 - mouseDistance / 100.0);
        } else if (nodes[i][1] < input.mouseX) {
          nodes[i][3] += 0.01 * (1 - mouseDistance / 100.0);
        }
        if (nodes[i][2] > input.mouseY) {
          nodes[i][4] -= 0.01 * (1 - mouseDistance / 100.0);
        } else if (nodes[i][2] < input.mouseY) {
          nodes[i][4] += 0.01 * (1 - mouseDistance / 100.0);
        }
      }
      for (var j = 0; j < nodes.length; j++) {
        var distance = Math.sqrt(
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
            Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        if (distance < 100) {
          if (nodes[i][11][3] < 256 && nodes[j][11][3] < 256) {
            if (nodes[i][11][3] < nodes[j][11][3]) {
              input.stroke(
                256,
                256,
                256,
                nodes[i][11][3] * (1 - distance / 100.0)
              );
            } else {
              input.stroke(
                256,
                256,
                256,
                nodes[j][11][3] * (1 - distance / 100.0)
              );
            }
          } else if (nodes[i][11][3] < 256) {
            input.stroke(
              256,
              256,
              256,
              nodes[i][11][3] * (1 - distance / 100.0)
            );
          } else if (nodes[j][11][3] < 256) {
            input.stroke(
              256,
              256,
              256,
              nodes[j][11][3] * (1 - distance / 100.0)
            );
          } else {
            input.stroke(256, 256, 256, 256 * (1 - distance / 100.0));
          }
          input.line(nodes[i][1], nodes[i][2], nodes[j][1], nodes[j][2]);
          if (nodes[i][1] > nodes[j][1]) {
            nodes[i][3] -= 0.001 * (1 - distance / 100.0) * (nodes[j][0] / 15);
            nodes[j][3] += 0.001 * (1 - distance / 100.0) * (nodes[i][0] / 15);
          } else if (nodes[i][1] < nodes[j][1]) {
            nodes[i][3] += 0.001 * (1 - distance / 100.0) * (nodes[j][0] / 15);
            nodes[j][3] -= 0.001 * (1 - distance / 100.0) * (nodes[i][0] / 15);
          }
          if (nodes[i][2] > nodes[j][2]) {
            nodes[i][4] -= 0.001 * (1 - distance / 100.0) * (nodes[j][0] / 15);
            nodes[j][4] += 0.001 * (1 - distance / 100.0) * (nodes[i][0] / 15);
          } else if (nodes[i][2] < nodes[j][2]) {
            nodes[i][4] += 0.001 * (1 - distance / 100.0) * (nodes[j][0] / 15);
            nodes[j][4] -= 0.001 * (1 - distance / 100.0) * (nodes[i][0] / 15);
          }
        }
      }
    }
  }

  input.mouseClicked = function () {
    for (var i = 0; i < nodes.length; i++) {
      var halfDiameter = .5 * nodes[i][0]
      if((input.mouseX > (nodes[i][1] - halfDiameter) && input.mouseX < (nodes[i][1] + halfDiameter)) 
      && (input.mouseY > (nodes[i][2] - halfDiameter) && input.mouseY < (nodes[i][2] + halfDiameter))) {
        window.open(blogLinks[Math.floor(Math.random()*blogLinks.length)]);
      }
    }
  }

};

var nodesDisplay = new p5(output, "nodes");
