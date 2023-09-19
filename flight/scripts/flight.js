function setup() {
  var observerCanvas = document.getElementById("observerCanvas");
  var cameraCanvas = document.getElementById("cameraCanvas");
  var observerContext = observerCanvas.getContext("2d");
  var cameraContext = cameraCanvas.getContext("2d");
  var translateX = 0;
  var slider1 = document.getElementById("slider1");
  slider1.value = 100;
  var slider2 = document.getElementById("slider2");
  slider2.value = 72.5;

  var rotateX = 200;

  var revolve = 5;

  var context = cameraContext; // default to drawing in the camera window

  function draw() {
    // clear both canvas instances
    observerCanvas.width = observerCanvas.width;
    cameraCanvas.width = cameraCanvas.width;

    // use the sliders to get the angles
    var tParam = slider1.value * 0.01;
    var viewAngle = slider2.value * 0.02 * Math.PI;

    //Defines the moveToTx function to interface with the glmatrix library
    function moveToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.moveTo(res[0], res[1]);
    }

    //Defines the lineToTx function to interface with the glmatrix library
    function lineToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.lineTo(res[0], res[1]);
    }

    //Constructs airplane objects
    function drawAirplane1(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = color;

      moveToTx([-0.0125, 0, -0.025], Tx);
      lineToTx([-0.05, 0, -0.05], Tx);
      lineToTx([0.05, 0, -0.05], Tx);
      lineToTx([0.0125, 0, -0.025], Tx);
      lineToTx([0.0125, 0, 0.025], Tx);
      lineToTx([0.1, 0, -0.025], Tx);
      lineToTx([0.1, 0, 0], Tx);
      lineToTx([0.0125, 0, 0.065], Tx);
      lineToTx([0.0125, 0, 0.125], Tx);
      lineToTx([0, 0, 0.15], Tx);
      lineToTx([-0.0125, 0, 0.125], Tx);
      lineToTx([-0.0125, 0, 0.065], Tx);
      lineToTx([-0.1, 0, 0], Tx);
      lineToTx([-0.1, 0, -0.025], Tx);
      lineToTx([-0.0125, 0, 0.025], Tx);

      lineToTx([-0.0125, 0.05, -0.025], Tx);
      lineToTx([-0.05, 0.05, -0.05], Tx);
      lineToTx([0.05, 0.05, -0.05], Tx);
      lineToTx([0.0125, 0.05, -0.025], Tx);
      lineToTx([0.0125, 0.05, 0.025], Tx);
      lineToTx([0.1, 0.05, -0.025], Tx);
      lineToTx([0.1, 0.05, 0], Tx);
      lineToTx([0.0125, 0.05, 0.065], Tx);
      lineToTx([0.0125, 0.05, 0.125], Tx);
      lineToTx([0, 0.05, 0.15], Tx);
      lineToTx([-0.0125, 0.05, 0.125], Tx);
      lineToTx([-0.0125, 0.05, 0.065], Tx);
      lineToTx([-0.1, 0.05, 0], Tx);
      lineToTx([-0.1, 0.05, -0.025], Tx);
      lineToTx([-0.0125, 0.05, 0.025], Tx);
      lineToTx([-0.0125, 0, 0.025], Tx);

      context.closePath();
      context.fill();
    }

    function drawAirfield(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = "green";
      moveToTx([3.5, 0, -3.5], Tx);
      lineToTx([3.5, 0, 3.5], Tx);
      lineToTx([-3.5, 0, 3.5], Tx);
      lineToTx([-3.5, 0, -3.5], Tx);
      context.closePath();
      context.fill();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = color;
      moveToTx([0.5, 0, 2.9], Tx);
      lineToTx([0.5, 0, 3.1], Tx);
      lineToTx([-2, 0, 3.1], Tx);
      lineToTx([-2, 0, 2.9], Tx);
      context.closePath();
      context.fill();

      Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.strokeStyle = "yellow";
      moveToTx([0.4, 0.01, 3], Tx);
      lineToTx([0.2, 0.01, 3], Tx);
      moveToTx([0, 0.01, 3], Tx);
      lineToTx([-0.2, 0.01, 3], Tx);
      moveToTx([-0.4, 0.01, 3], Tx);
      lineToTx([-0.6, 0.01, 3], Tx);
      moveToTx([-0.8, 0.01, 3], Tx);
      lineToTx([-1, 0.01, 3], Tx);
      moveToTx([-1.2, 0.01, 3], Tx);
      lineToTx([-1.4, 0.01, 3], Tx);
      moveToTx([-1.6, 0.01, 3], Tx);
      lineToTx([-1.8, 0.01, 3], Tx);

      context.stroke();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = color;
      moveToTx([-2.2, 0, 2.3], Tx);
      lineToTx([-2.4, 0, 2.3], Tx);
      lineToTx([-2.4, 0, -1.2], Tx);
      lineToTx([-2.2, 0, -1.2], Tx);
      context.closePath();
      context.fill();

      Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.strokeStyle = "yellow";
      moveToTx([-2.3, 0, 2], Tx);
      lineToTx([-2.3, 0, 1.8], Tx);
      moveToTx([-2.3, 0, 1.6], Tx);
      lineToTx([-2.3, 0, 1.4], Tx);
      moveToTx([-2.3, 0, 1.2], Tx);
      lineToTx([-2.3, 0, 1], Tx);
      moveToTx([-2.3, 0, 0.8], Tx);
      lineToTx([-2.3, 0, 0.6], Tx);
      moveToTx([-2.3, 0, 0.4], Tx);
      lineToTx([-2.3, 0, 0.2], Tx);
      moveToTx([-2.3, 0, 0], Tx);
      lineToTx([-2.3, 0, -0.2], Tx);
      moveToTx([-2.3, 0, -0.4], Tx);
      lineToTx([-2.3, 0, -0.6], Tx);
      moveToTx([-2.3, 0, -0.8], Tx);
      lineToTx([-2.3, 0, -1], Tx);

      context.stroke();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      moveToTx([-2.05, 0.5, 2.65], Tx);
      lineToTx([-2.05, 0.5, 2.45], Tx);
      lineToTx([-1.85, 0.5, 2.45], Tx);
      lineToTx([-1.85, 0.5, 2.65], Tx);
      context.closePath();
      context.fill();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = "rgba(0, 156, 226, .5)";
      moveToTx([-2.05, 0.5, 2.65], Tx);
      lineToTx([-2.05, 0.5, 2.45], Tx);
      lineToTx([-2.05, 0.6, 2.45], Tx);
      lineToTx([-2.05, 0.6, 2.65], Tx);
      context.closePath();
      context.fill();
      moveToTx([-1.85, 0.5, 2.65], Tx);
      lineToTx([-1.85, 0.5, 2.45], Tx);
      lineToTx([-1.85, 0.6, 2.45], Tx);
      lineToTx([-1.85, 0.6, 2.65], Tx);
      context.closePath();
      context.fill();
      moveToTx([-1.85, 0.5, 2.65], Tx);
      lineToTx([-2.05, 0.5, 2.65], Tx);
      lineToTx([-2.05, 0.6, 2.65], Tx);
      lineToTx([-1.85, 0.6, 2.65], Tx);
      context.closePath();
      context.fill();
      moveToTx([-1.85, 0.5, 2.45], Tx);
      lineToTx([-2.05, 0.5, 2.45], Tx);
      lineToTx([-2.05, 0.6, 2.45], Tx);
      lineToTx([-1.85, 0.6, 2.45], Tx);
      context.closePath();
      context.fill();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = "white";
      moveToTx([-1.9, 0, 2.5], Tx);
      lineToTx([-2, 0, 2.5], Tx);
      lineToTx([-2, 0.5, 2.5], Tx);
      lineToTx([-1.9, 0.5, 2.5], Tx);
      context.closePath();
      context.fill();
      moveToTx([-1.9, 0, 2.5], Tx);
      lineToTx([-1.9, 0, 2.6], Tx);
      lineToTx([-1.9, 0.5, 2.6], Tx);
      lineToTx([-1.9, 0.5, 2.5], Tx);
      context.closePath();
      context.fill();
      moveToTx([-1.9, 0, 2.6], Tx);
      lineToTx([-2, 0, 2.6], Tx);
      lineToTx([-2, 0.5, 2.6], Tx);
      lineToTx([-1.9, 0.5, 2.6], Tx);
      context.closePath();
      context.fill();
      moveToTx([-2, 0, 2.5], Tx);
      lineToTx([-2, 0, 2.6], Tx);
      lineToTx([-2, 0.5, 2.6], Tx);
      lineToTx([-2, 0.5, 2.5], Tx);
      context.closePath();
      context.fill();

      moveToTx([-2.05, 0.6, 2.65], Tx);
      lineToTx([-2.05, 0.6, 2.45], Tx);
      lineToTx([-1.85, 0.6, 2.45], Tx);
      lineToTx([-1.85, 0.6, 2.65], Tx);
      context.closePath();
      context.fill();

      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.strokeStyle = "black";
      moveToTx([-1.95, 0.6, 2.55], Tx);
      lineToTx([-1.95, 0.7, 2.55], Tx);
      context.stroke();
    }

    function drawAntenna(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.strokeStyle = "black";
      moveToTx([-0.5, -0.5, -0.5], Tx);
      lineToTx([0.5, 0.5, 0.5], Tx);
      context.stroke();
    }

    //Draws 3D axes objects
    function draw3DAxes(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);

      context.strokeStyle = color;
      context.beginPath();
      // Axes
      moveToTx([1.2, 0, 0], Tx);
      lineToTx([0, 0, 0], Tx);
      lineToTx([0, 1.2, 0], Tx);
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, 1.2], Tx);
      // Arrowheads
      moveToTx([1.1, 0.05, 0], Tx);
      lineToTx([1.2, 0, 0], Tx);
      lineToTx([1.1, -0.05, 0], Tx);
      moveToTx([0.05, 1.1, 0], Tx);
      lineToTx([0, 1.2, 0], Tx);
      lineToTx([-0.05, 1.1, 0], Tx);
      moveToTx([0.05, 0, 1.1], Tx);
      lineToTx([0, 0, 1.2], Tx);
      lineToTx([-0.05, 0, 1.1], Tx);
      // X-label
      moveToTx([1.3, -0.05, 0], Tx);
      lineToTx([1.4, 0.05, 0], Tx);
      moveToTx([1.3, 0.05, 0], Tx);
      lineToTx([1.4, -0.05, 0], Tx);
      // Y-label
      moveToTx([-0.05, 1.4, 0], Tx);
      lineToTx([0, 1.35, 0], Tx);
      lineToTx([0.05, 1.4, 0], Tx);
      moveToTx([0, 1.35, 0], Tx);
      lineToTx([0, 1.28, 0], Tx);
      // Z-label
      moveToTx([-0.05, 0, 1.3], Tx);
      lineToTx([0.05, 0, 1.3], Tx);
      lineToTx([-0.05, 0, 1.4], Tx);
      lineToTx([0.05, 0, 1.4], Tx);

      context.stroke();
    }

    //Returns effective equation for hermite curve

    var Hermite = function (t) {
      return [
        2 * t * t * t - 3 * t * t + 1,
        t * t * t - 2 * t * t + t,
        -2 * t * t * t + 3 * t * t,
        t * t * t - t * t,
      ];
    };

    //Returns effective equation for hermite curve derivative
    var HermiteDerivative = function (t) {
      return [
        6 * t * t - 6 * t,
        3 * t * t - 4 * t + 1,
        -6 * t * t + 6 * t,
        3 * t * t - 2 * t,
      ];
    };

    var Bezier = function (t) {
      return [];
    };

    var BezierDerivative = function (t) {
      return [];
    };

    //Function to correct update cubic curve vector, with respect to the hermite function, coord set, and
    function Cubic(basis, P, t) {
      var b = basis(t);
      var result = vec3.create();
      vec3.scale(result, P[0], b[0]);
      vec3.scaleAndAdd(result, result, P[1], b[1]);
      vec3.scaleAndAdd(result, result, P[2], b[2]);
      vec3.scaleAndAdd(result, result, P[3], b[3]);
      return result;
    }

    //Points to guide hermite curve
    var p0 = [0, 200, 0];
    var d0 = [150, 0, 0];
    var p1 = [300, 100, 150];
    var d1 = [-100, -200, 300];
    var p2 = [0, 0, 300];
    var d2 = [0, 0, 0];

    //Values and derivatives for the two points forming hermite curve
    var P0 = [p0, d0, p1, d1]; // First two points and tangents
    var P1 = [p1, d1, p2, d2]; // Last two points and tangents

    //Returns a vector returned by Cubic() based on the Hermite function, segment, and slider value
    var C0 = function (t_) {
      return Cubic(Hermite, P0, t_);
    };
    var C1 = function (t_) {
      return Cubic(Hermite, P1, t_);
    };
    var antennaCurve = function (t_) {
      return Cubic(Hermite, P0, t_);
    };

    //Returns a vector returned by Cubic() derivative based on the Hermite function, segment, and slider value
    var C0prime = function (t_) {
      return Cubic(HermiteDerivative, P0, t_);
    };
    var C1prime = function (t_) {
      return Cubic(HermiteDerivative, P1, t_);
    };

    //Accepts the slider value, then determines which of the two hermite
    //curve segments to return a vector via the respective call to Cubic() via C0() & C1()
    var Ccomp = function (t) {
      if (t < 1) {
        var u = t;
        return C0(u);
      } else {
        var u = t - 1.0;
        return C1(u);
      }
    };

    //Accepts the slider value, then determines which of the two hermite
    //curve segments to return a dertivative vector via the respective call to Cubic() via C0prime() & C(1)prime()
    var Ccomp_tangent = function (t) {
      if (t < 1) {
        var u = t;
        return C0prime(u);
      } else {
        var u = t - 1.0;
        return C1prime(u);
      }
    };

    //CameraCurve sets the eye coordinates 0, 1, and 3 to u, v, and w respectively;
    //trig functions for u and w take the angle var to create the circular motion
    //about the y axis, as if on a rail, whereas v determines where the eye is
    //positioned along the y (world) axis
    //***Partially borrowed from JSBin but mostly modified***
    var CameraCurve = function (angle) {
      var distance = 120.0;
      var eye = vec3.create();
      eye[0] = distance * Math.sin(viewAngle);
      eye[1] = Math.abs(60 * Math.sin(viewAngle / 2));
      eye[2] = distance * Math.cos(viewAngle);
      return [eye[0], eye[1], eye[2]];
    };

    //Draws and appropriately colors the paths to be taken by the object, taking
    //both the begin and end vectors to incrementally draw the path for
    //the interval passed
    //***Mostly borrowed from JSBin***
    function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
      context.strokeStyle = color;
      context.beginPath();
      moveToTx(C(t_begin), Tx);
      for (var i = 1; i <= intervals; i++) {
        var t =
          ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
        lineToTx(C(t), Tx);
      }
      context.stroke();
    }

    // create two lookAt transforms; one for the camera
    // and one for the "external observer"

    // Create Camera (lookAt) transform

    //Where the center of camera is placed
    var eyeCamera = CameraCurve(viewAngle);
    //Designates where the camera is looking
    var targetCamera = vec3.fromValues(0, 0, 0); // Aim at the origin of the world coords
    //Designates vector, in world coords, to show in screen vertically
    var upCamera = vec3.fromValues(0, 1, 0); // Y-axis of world coords to be vertical
    var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
    // Change to reflect changes in index.html dimensions
    mat4.fromTranslation(Tviewport, [400, 450, 0]); // Move the center of the
    // "lookAt" transform (where
    // the camera points) to the
    // canvas coordinates (200,300)
    mat4.scale(Tviewport, Tviewport, [100, -100, 1]); // Flip the Y-axis,
    // scale everything by 100x

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera, -100, 100, -100, 100, -1, 1);

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver, -120, 120, -120, 120, -1, 1);

    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();

    mat4.multiply(tVP_PROJ_VIEW_Camera, Tviewport, TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera, tVP_PROJ_VIEW_Camera, TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer, Tviewport, TprojectionObserver);

    // Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
    mat4.fromTranslation(Tmodel, Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1], tangent[0]);
    mat4.rotateZ(Tmodel, Tmodel, angle);

    //var antennaRotation = mat4.create();
    //mat4.rotate(antennaRotation,antennaRotation,revolve,Ccomp(tParam));
    //drawAntenna("grey",antennaRotation,100);
    //"grey",tVP_PROJ_VIEW_Camera,100.0

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_Observer,
      eyeCamera
    );
    var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera, TlookAtCamera);
    mat4.multiply(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_MOD2_Observer,
      TlookFromCamera
    );

    // Draw the following in the Camera window
    context = cameraContext;
    draw3DAxes("black", tVP_PROJ_VIEW_Camera, 100.0);
    drawAirfield("grey", tVP_PROJ_VIEW_Camera, 100.0);

    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Camera,1.0);
    drawTrajectory(0.0, 1.0, 100, C0, tVP_PROJ_VIEW_Camera, "red");
    drawTrajectory(0.0, 1.0, 100, C1, tVP_PROJ_VIEW_Camera, "blue");
    // draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera,100.0); // Uncomment to see "model" coords
    drawAirplane1("black", tVP_PROJ_VIEW_MOD_Camera, 100.0);

    var antennaContext = mat4.create();

    //mat4.multiply(antennaContext,Tviewport,TprojectionCamera);
    mat4.multiply(antennaContext, tVP_PROJ_VIEW_Camera, TlookAtCamera);

    mat4.rotate(antennaContext, antennaContext, revolve, C0prime(1));
    //mat4.translate(antennaContext,antennaContext,[0,3,3,4]);
    drawAntenna("grey", antennaContext, 100);

    revolve = (rotateX + translateX) / 60;
    rotateX = rotateX + 10;

    if (translateX < -135) translateX = -133;
    else if (translateX > 399) translateX = 397;
    else translateX = (translateX + slider1.value / 3250) % 400;

    window.requestAnimationFrame(draw);
  }

  //slider1.addEventListener("input",draw);
  //slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
