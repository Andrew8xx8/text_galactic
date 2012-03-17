function extend(Child, Parent) {
    var F = function() { }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}


function TextGalactic (width, height) {
	this.canvasWidth = width;
	this.canvasHeight = height;

	this.canvas = document.getElementById("game");
	this.canvas.width = width; // задаём размеры холста
	this.canvas.height = height;
}

function game(tg) {	
	bg = new Background(0, 0, tg.canvas);
	bg.draw();

	player = new Player(160, 200, tg.canvas);
	player.draw();

	
}