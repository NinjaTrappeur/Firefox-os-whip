var previousAngle = -1, previousTime = -1, soundManager, playing = false, main;


var SoundManager = function () {
    "use strict";
    this.whipePlayer = document.getElementById("whipeSound");
};

SoundManager.prototype.playWhipe = function () {
    "use strict";
    if (!playing) {
        playing = true;
        this.whipePlayer.onended = function () {playing = false; };
        this.whipePlayer.play();
    }
};

var main = function () {
    "use strict";
    soundManager = new SoundManager();
    window.addEventListener('deviceorientation', function (event) {
        var speed = Math.abs(event.alpha - previousAngle) * (new Date().getTime() - previousTime);
        if (previousAngle === -1) {
            previousAngle = event.alpha;
            previousTime = new Date().getTime();
            speed = 0;
        }
        if (speed > 10000) {
            soundManager.playWhipe();
        }
        previousAngle = event.alpha;
        previousTime = new Date().getTime();
    }, false);
};

window.onload = main;
