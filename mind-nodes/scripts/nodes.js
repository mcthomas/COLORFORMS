var output = function (input) {
  var nodes;
  var toBeRemoved = 0;
  var toBeAdded = 0;
  var colors = [
    [255, 59, 48], [255, 149, 0], [255, 204, 0],
    [42, 173, 67], [0, 122, 255], [125, 82, 224]
  ];
  // Post links for each color, filled in from the contents list on the page.
  var postLinks = colors.map(function () { return []; });
  var lastNodeHovered = null;

  input.setup = function () {
    input.createCanvas(900, 200);
    readPosts();
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

  // A post is linked from the nodes that share its bookmark icon's color, so a
  // post added to the contents list is picked up without any change here.
  function readPosts() {
    var posts = document.querySelectorAll('#contents a[href]');
    for (var i = 0; i < posts.length; i++) {
      var icon = posts[i].querySelector('.post img');
      if (icon && icon.complete) {
        registerPost(posts[i].href, icon);
      } else if (icon) {
        icon.addEventListener('load', registerPost.bind(null, posts[i].href, icon));
      }
    }
  }

  function registerPost(href, icon) {
    var colorIndex = bookmarkColor(icon);
    if (colorIndex >= 0) {
      postLinks[colorIndex].push(href);
    }
  }

  // Index in `colors` of the color closest to the icon's own, or -1.
  function bookmarkColor(icon) {
    try {
      var canvas = document.createElement('canvas');
      canvas.width = icon.naturalWidth;
      canvas.height = icon.naturalHeight;
      var context = canvas.getContext('2d');
      context.drawImage(icon, 0, 0);
      var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      var sum = [0, 0, 0];
      var count = 0;
      for (var p = 0; p < pixels.length; p += 4) {
        if (pixels[p + 3] > 200) {
          sum[0] += pixels[p];
          sum[1] += pixels[p + 1];
          sum[2] += pixels[p + 2];
          count++;
        }
      }
      if (count > 0) {
        var closest = -1;
        var closestDistance = Infinity;
        for (var c = 0; c < colors.length; c++) {
          var distance = Math.pow(sum[0] / count - colors[c][0], 2) +
            Math.pow(sum[1] / count - colors[c][1], 2) +
            Math.pow(sum[2] / count - colors[c][2], 2);
          if (distance < closestDistance) {
            closest = c;
            closestDistance = distance;
          }
        }
        return closest;
      }
    } catch (e) {
      // The image can't be read when the page is opened straight from disk.
    }
    // Fall back to the icon's number: bkmk-1.png is the first color, and so on.
    var number = /(\d+)\.\w+$/.exec(icon.getAttribute('src') || '');
    return number ? (parseInt(number[1], 10) - 1) % colors.length : -1;
  }

  // The post a node leads to, if any post has its color.
  function nodeLink(node) {
    var links = postLinks[node[14]];
    return links.length ? links[Math.floor(node[15] * links.length)] : null;
  }

  function initializeNodes() {
    var nodeCount = 5 + Math.floor(Math.random() * 11);
    var initializedNodes = [];
    for (var i = 0; i < nodeCount; i++) {
      var colorIndex = Math.floor(Math.random() * colors.length);
      var currColor = colors[colorIndex];
      initializedNodes.push([
        10, 25 + Math.floor(Math.random() * 876), 25 + Math.floor(Math.random() * 156),
        -0.5 + Math.random(), -0.5 + Math.random(), 0, 0,
        false, false, false, false, [currColor[0], currColor[1], currColor[2], 256],
        false, false, colorIndex, Math.random()
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
    var colorIndex = Math.floor(Math.random() * colors.length);
    var currColor = colors[colorIndex];
    nodes.push([
      10, 25 + Math.floor(Math.random() * 876), 25 + Math.floor(Math.random() * 156),
      -0.5 + Math.random(), -0.5 + Math.random(), 0, 0,
      false, false, false, false, [currColor[0], currColor[1], currColor[2], 1],
      false, false, colorIndex, Math.random()
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
      // Clear what is under the node, as far as the node is opaque, so no line shows through it.
      input.erase(Math.min(255, nodes[i][11][3]), 0);
      input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
      input.noErase();
      input.fill(
        nodes[i][11][0],
        nodes[i][11][1],
        nodes[i][11][2],
        nodes[i][11][3]
      );
      input.circle(nodes[i][1], nodes[i][2], nodes[i][0]);
      var halfDiameter = .5 * nodes[i][0]
      if((input.mouseX > (nodes[i][1] - halfDiameter) && input.mouseX < (nodes[i][1] + halfDiameter)) 
      && (input.mouseY > (nodes[i][2] - halfDiameter) && input.mouseY < (nodes[i][2] + halfDiameter))
      && nodeLink(nodes[i])) {
        document.documentElement.style.cursor = 'pointer';
        lastNodeHovered = i;
      }
      else if (i == lastNodeHovered) {
        document.documentElement.style.cursor = 'auto';
        lastNodeHovered = null;
      }
    }
  }

  // Draws a line between two circles that stops at each circle's edge.
  function edgeLine(x1, y1, r1, x2, y2, r2) {
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (d <= r1 + r2) {
      return;
    }
    var ux = (x2 - x1) / d;
    var uy = (y2 - y1) / d;
    input.line(x1 + ux * r1, y1 + uy * r1, x2 - ux * r2, y2 - uy * r2);
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
        edgeLine(nodes[i][1], nodes[i][2], nodes[i][0] / 2, input.mouseX, input.mouseY, 0);
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
          edgeLine(nodes[i][1], nodes[i][2], nodes[i][0] / 2, nodes[j][1], nodes[j][2], nodes[j][0] / 2);
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
    nodeNavigate();
  }

  input.touchEnded = function () {
    nodeNavigate();
  }

  function nodeNavigate() {
    for (var i = 0; i < nodes.length; i++) {
      var halfDiameter = .5 * nodes[i][0]
      if((input.mouseX > (nodes[i][1] - halfDiameter) && input.mouseX < (nodes[i][1] + halfDiameter)) 
      && (input.mouseY > (nodes[i][2] - halfDiameter) && input.mouseY < (nodes[i][2] + halfDiameter))
      && nodeLink(nodes[i])) {
        window.open(nodeLink(nodes[i]));
      }
    }
  }

};

var nodesDisplay = new p5(output, "nodes");
