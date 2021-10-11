window.onscroll = function () {
  var scrollRatio =
    ((document.body.scrollTop || document.body.parentNode.scrollTop) /
      (document.body.parentNode.scrollHeight -
        document.body.parentNode.clientHeight)) *
    100;
  if (scrollRatio < 25) {
    window.document.getElementById("percentage").style.opacity =
      (scrollRatio / 100) * 4;
    window.document.getElementById("percentage").innerHTML = "2021";
  } else if (scrollRatio < 36) {
    window.document.getElementById("percentage").innerHTML = "2021";
    window.document.getElementById("percentage").style.opacity = 1;
  } else if (scrollRatio < 52) {
    window.document.getElementById("percentage").innerHTML = "2020";
    window.document.getElementById("percentage").style.opacity = 1;
  } else if (scrollRatio < 68) {
    window.document.getElementById("percentage").innerHTML = "2019";
    window.document.getElementById("percentage").style.opacity = 1;
  } else if (scrollRatio < 84) {
    window.document.getElementById("percentage").innerHTML = "2018";
    window.document.getElementById("percentage").style.opacity = 1;
  } else {
    window.document.getElementById("percentage").innerHTML = "2016";
    window.document.getElementById("percentage").style.opacity = 1;
  }
};

var selected = "reset";
var grayscaleOn = `-webkit-filter: grayscale(100%);
   -moz-filter: grayscale(100%);
   -ms-filter: grayscale(100%);
   -o-filter: grayscale(100%);
   filter: grayscale(100%);`;
var grayscaleOff = `-webkit-filter: grayscale(0%);
   -moz-filter: grayscale(0%);
   -ms-filter: grayscale(0%);
   -o-filter: grayscale(0%);
   filter: grayscale(0%);`;

function randSketch() {
  const sketches = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
  ];
  document.getElementById("proc-sketches").src =
    "style/images/proc-sketches/" +
    sketches[Math.floor(Math.random() * 20)] +
    ".png";
}

function select(color) {
  selected = color;
  if (selected == "rButton") {
    document.getElementById("rButton").src =
      "style/images/buttons/rButton-selected.png";
    document.getElementById("yButton").src = "style/images/buttons/yButton.png";
    document.getElementById("gButton").src = "style/images/buttons/gButton.png";
    document.getElementById("bButton").src = "style/images/buttons/bButton.png";
    document.getElementById("reset").src = "style/images/buttons/reset.png";
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOff;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else if (selected == "yButton") {
    document.getElementById("yButton").src =
      "style/images/buttons/yButton-selected.png";
    document.getElementById("rButton").src = "style/images/buttons/rButton.png";
    document.getElementById("gButton").src = "style/images/buttons/gButton.png";
    document.getElementById("bButton").src = "style/images/buttons/bButton.png";
    document.getElementById("reset").src = "style/images/buttons/reset.png";
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOff;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else if (selected == "gButton") {
    document.getElementById("gButton").src =
      "style/images/buttons/gButton-selected.png";
    document.getElementById("yButton").src = "style/images/buttons/yButton.png";
    document.getElementById("rButton").src = "style/images/buttons/rButton.png";
    document.getElementById("bButton").src = "style/images/buttons/bButton.png";
    document.getElementById("reset").src = "style/images/buttons/reset.png";
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOff;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else if (selected == "bButton") {
    document.getElementById("bButton").src =
      "style/images/buttons/bButton-selected.png";
    document.getElementById("yButton").src = "style/images/buttons/yButton.png";
    document.getElementById("rButton").src = "style/images/buttons/rButton.png";
    document.getElementById("gButton").src = "style/images/buttons/gButton.png";
    document.getElementById("reset").src = "style/images/buttons/reset.png";
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOff;
    }
  } else {
    document.getElementById("rButton").src = "style/images/buttons/rButton.png";
    document.getElementById("yButton").src = "style/images/buttons/yButton.png";
    document.getElementById("gButton").src = "style/images/buttons/gButton.png";
    document.getElementById("bButton").src = "style/images/buttons/bButton.png";
    document.getElementById("reset").src =
      "style/images/buttons/reset-selected.png";
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOff;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOff;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOff;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOff;
    }
  }
}

function reset(option) {
  if (selected != "reset") {
    document.getElementById("reset").src = option;
  }
  if (option != "style/images/buttons/reset.png") {
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOff;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOff;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOff;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOff;
    }
  } else {
    select(selected);
  }
}

function rButton(option) {
  if (selected != "rButton") {
    document.getElementById("rButton").src = option;
  }
  if (option != "style/images/buttons/rButton.png") {
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOff;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else {
    select(selected);
  }
}

function yButton(option) {
  if (selected != "yButton") {
    document.getElementById("yButton").src = option;
  }
  if (option != "style/images/buttons/yButton.png") {
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOff;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else {
    select(selected);
  }
}

function gButton(option) {
  if (selected != "gButton") {
    document.getElementById("gButton").src = option;
  }
  if (option != "style/images/buttons/gButton.png") {
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOff;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOn;
    }
  } else {
    select(selected);
  }
}

function bButton(option) {
  if (selected != "bButton") {
    document.getElementById("bButton").src = option;
  }
  if (option != "style/images/buttons/bButton.png") {
    var video = document.getElementsByClassName("video");
    for (let i = 0; i < video.length; i++) {
      video[i].style.cssText = grayscaleOn;
    }
    var graphic = document.getElementsByClassName("graphic");
    for (let i = 0; i < graphic.length; i++) {
      graphic[i].style.cssText = grayscaleOn;
    }
    var app = document.getElementsByClassName("app");
    for (let i = 0; i < app.length; i++) {
      app[i].style.cssText = grayscaleOn;
    }
    var music = document.getElementsByClassName("music");
    for (let i = 0; i < music.length; i++) {
      music[i].style.cssText = grayscaleOff;
    }
  } else {
    select(selected);
  }
}
