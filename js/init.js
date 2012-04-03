window.TextGalactic = {};

TextGalactic.Settings = {
	fontSize: 12,
	fontStretch: 10,
	speed: 300,
};

TextGalactic.Settings.halfSize = Math.round(TextGalactic.Settings.fontSize/2);
TextGalactic.Settings.halfStretch = Math.round(TextGalactic.Settings.fontStretch/2);

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}

window.onload=function() {
	var controler = new TextGalactic.Controller("canvas_container");

	// Bind events
	document.onkeydown = function(e) { 
		controler.changeKey((e||window.event).keyCode, 1);
	};
	document.onkeyup = function(e) {
		controler.changeKey((e||window.event).keyCode, 0);
	};

	// Start game
	setInterval(function() { controler.update() }, 24);
};