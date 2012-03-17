LibCanvas.extract();

window.TextGalactic = {};

TextGalactic.Settings = {
	font_size: 24,
	font_stretch: 17,
	speed: 300,
};

function move(object, dx, dy) {
	if (dx !== 0 || dy !== 0) {
		object.collisionRectangle = null;
		object.shape.move(new Point(dx, dy));
		object.redraw();
	}
	
	return object;
}

atom.dom(function () {
	new TextGalactic.Controller();
});