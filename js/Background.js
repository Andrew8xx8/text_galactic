function Background() { 
	Background.superclass.constructor.apply(this, arguments)
}

extend(Background, GraphicObject);

Background.prototype.draw = function () {
	var context = this.canvas.getContext("2d");
    context.fillStyle = "#222"; 
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}