function GraphicObject (x, y, canvas) {
	this.x = x;
	this.y = y;
	this.canvas = canvas;
}

GraphicObject.prototype.draw = function () {
	console.log(this.x, this.y);
}