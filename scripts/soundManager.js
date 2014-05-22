var previousAngle = -1, soundManager, playing = false;


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
    if (!screen.mozLockOrientation("portrait-primary")) {
        console.log("Impossible to set the display orientation to portrait." +
            "Are you using firefox?");
    }
    soundManager = new SoundManager();
    window.addEventListener('deviceorientation', function (event) {
        if (previousAngle === -1) {
            previousAngle = event.alpha;
        }
        if (Math.abs(event.alpha - previousAngle) > 20) {
            soundManager.playWhipe();
        }
        previousAngle = event.alpha;
    }, false);
};