window.TextGalactic = {};

TextGalactic.Settings = {
	font_size: 24,
	font_stretch: 17,
	speed: 300,
};


var map,
	canvas,
	overlay,
	bigsky,
	bigsky2,
	arena;
//variables initiated at the bottom of the code...

var pi=Math.PI;

var total=0;

var arenaSize=21;

var total=0;

var samples=200;

var key=[0,0,0,0,0]; // left, right, up, down

var face=[];

var now = 0;

var x = 0;
var y = 0;

//window.onerror=function(){
//  alert('An error has occured, the most likely reason is because you are using an incompatible browser.\nYou must be using one of the following browsers or a newer version:\n\n- Internet Explorer 6\n- Firefox 1.5\n- Safari 1.3\n- Opera 9');
//  window.onerror=function(){};
//  return true;
//}

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