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

function update() {
	if (key[0] == 1) {
		x++;
	}

	var c = canvas.circle(x, 50, 40);
}

function changeKey(which, to) {
	switch (which){
		case 65:case 37: key[0]=to; break; // left
		case 87: case 38: key[2]=to; break; // up
		case 68: case 39: key[1]=to; break; // right
		case 83: case 40: key[3]=to; break;// down
		case 32: key[4]=to; break; // space bar;
		case 17: key[5]=to; break; // ctrl
	}
}

document.onkeydown=function(e){changeKey((e||window.event).keyCode, 1);};
document.onkeyup=function(e){changeKey((e||window.event).keyCode, 0);};

//window.onerror=function(){
//  alert('An error has occured, the most likely reason is because you are using an incompatible browser.\nYou must be using one of the following browsers or a newer version:\n\n- Internet Explorer 6\n- Firefox 1.5\n- Safari 1.3\n- Opera 9');
//  window.onerror=function(){};
//  return true;
//}

window.onload=function(){
	var controler = new TextGalactic.Controller("canvas_container");
	
	setInterval(function() { controler.update() }, 35);
};