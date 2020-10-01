function setup() { "use strict";
    
    var canvas = document.getElementById('myCanvas');
    var slider1 = document.getElementById('slider1');
    slider1.value = 50;
    var slider2 = document.getElementById('slider2');
    slider2.value = 50;
    var button1 = document.getElementById('button1');
    
    var hues = ["#dc2e10", "#ffc701", "#020877", "#12080c", "#e5e5e5"];
    
    var coords = [
                  [10, 10],
                  [90, 10],
                  [170, 10],
                  [250, 10],
                  [330, 10],
                  [410, 10],
                  [490, 10],
                  [570, 10],
                  [650, 10],
                  [730, 10],
                  [10, 90],
                  [90, 90],
                  [170, 90],
                  [250, 90],
                  [330, 90],
                  [410, 90],
                  [490, 90],
                  [570, 90],
                  [650, 90],
                  [730, 90],
                  [10, 170],
                  [90, 170],
                  [170, 170],
                  [250, 170],
                  [330, 170],
                  [410, 170],
                  [490, 170],
                  [570, 170],
                  [650, 170],
                  [730, 170],
                  [10, 250],
                  [90, 250],
                  [170, 250],
                  [250, 250],
                  [330, 250],
                  [410, 250],
                  [490, 250],
                  [570, 250],
                  [650, 250],
                  [730, 250],
                  [10, 330],
                  [90, 330],
                  [170, 330],
                  [250, 330],
                  [330, 330],
                  [410, 330],
                  [490, 330],
                  [570, 330],
                  [650, 330],
                  [730, 330],
                  [10, 410],
                  [90, 410],
                  [170, 410],
                  [250, 410],
                  [330, 410],
                  [410, 410],
                  [490, 410],
                  [570, 410],
                  [650, 410],
                  [730, 410],
                  ];
    
    var sizesX = [];
    var sizesY = [];
    var coordsX = [];
    var coordsY = [];
    var colors = [];
    sizesX.length = 60;
    sizesY.length = 60;
    coordsX.length = 60;
    coordsY.length = 60;
    colors.length = 60;
    var slider1Prev = slider1.value;
    var slider2Prev = slider2.value;

    var coordX;
    var coordY;
    var sizeX;
    var sizeY;
    var color;
    
    function drawDef() {
        
        slider1.value = 50;
        slider2.value = 50;
        
        var context = canvas.getContext('2d');
        
        context.beginPath();

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = 0; i < 60; i++) {
            
            context.beginPath();
            coordX = coords[Math.floor(Math.random() * Math.floor(60))][0];
            coordY = coords[Math.floor(Math.random() * Math.floor(60))][1];
            sizeX = 80 + (80*(Math.floor(Math.random() * Math.floor(10))));
            sizeY = 80 + (80*(Math.floor(Math.random() * Math.floor(10))));
            
            if (coordX + sizeX > 800) {
                sizeX = 810 - coordX;
            }
            if (coordY + sizeY > 490) {
                sizeY = 490 - coordY;
            }
            
            color = hues[Math.floor(Math.random() * Math.floor(5))];
            
            sizesX[i] = sizeX;
            sizesY[i] = sizeY;
            coordsX[i] = coordX;
            coordsY[i] = coordY;
            colors[i] = color;
            
            context.beginPath();
            context.rect(coordX,coordY,sizeX,sizeY);
            context.strokeStyle = "000000";
            context.lineWidth = 10;
            context.fillStyle = color;
            context.fill();
            context.stroke();
        }
        
    }
    
    function drawAug() {
        
        var context = canvas.getContext('2d');
        
        context.beginPath();

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.beginPath();
        
        context.rect(10,10,800,480);
        context.strokeStyle = "000000";
        context.lineWidth = 10;
        context.fillStyle = "e5e5e5";
        context.fill();
        context.stroke();
        
        for (var i = 0; i < 60; i++) {
                    
            
            if (coordsX[i] + sizesX[i] > 800) {
                sizesX[i] = 800 - coordsX[i];
            }
            
            sizesX[i]+=(8.2*(slider1.value - slider1Prev));
            
            if (coordsY[i] + sizesY[i] > 490) {
                sizesY[i] = 490 - coordsY[i];
            }
            
            sizesY[i]+=(5*(slider2.value - slider2Prev));

            context.beginPath();
            context.rect(coordsX[i],coordsY[i],sizesX[i],sizesY[i]);
            context.lineWidth = 10;
            context.strokeStyle = "000000";
            context.fillStyle = colors[i];
            context.fill();
            context.stroke();
        }
        
        context.beginPath();
        context.rect(10,10,800,480);
        context.lineWidth = 10;
        context.strokeStyle = "000000";
        context.stroke();
        
        context.beginPath();
        context.rect(2.5,2.5,817.5,497.5);
        context.lineWidth = 5;
        context.strokeStyle = "FFFFFF";
        context.stroke();
        
        slider1Prev = slider1.value;
        slider2Prev = slider2.value;
        
    }
    
    slider1.addEventListener("input",drawAug);
    slider2.addEventListener("input",drawAug);
    button1.addEventListener("click",drawDef);
    drawDef();
    
}
window.onload = setup();
