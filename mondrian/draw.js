function setup() { "use strict";

    var canvas = document.getElementById('myCanvas');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var stretch = slider1.value;

    
    var hues = ["dc2e10", "ffc701", "020877", "12080c", "e5e5e5"];
    
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
    
    function draw() {
        
        var context = canvas.getContext('2d');
        
        
        for (var i = 0; i < 60; i++) {
           context.beginPath();
            
           var coordX = coords[Math.floor(Math.random() * Math.floor(60))][0];
           var coordY = coords[Math.floor(Math.random() * Math.floor(60))][1];
           var sizeX = 80 + stretch;
           var sizeY = 80 + stretch;
           
           
           if (coordX + sizeX > 800) {
               sizeX = 810 - coordX;
           }
           if (coordY + sizeY > 500) {
               sizeY = 490 - coordY;
           }
               
           context.rect(coordX,coordY,sizeX,sizeY);
           
           context.strokeStyle = "#0";
           context.lineWidth = 10;
           context.fillStyle = hues[Math.floor(Math.random() * Math.floor(5))];
           context.fill();
           context.stroke();
        }
    }
    draw();
    slider1.addEventListener("input",draw);
}
window.onload = setup();
