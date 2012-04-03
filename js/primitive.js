TextGalactic.Primitive = Class.extend({
	moveSpeed: 3,

	animationSpeeed: 0,

	init: function (canvas, options) {
		this.x = (options.x != 'undefined') ? options.x : 0;
		this.y = (options.y != 'undefined') ? options.y : 0;

		if (options.animationSpeed != 'undefined') {
			this.animationSpeed = options.animationSpeed;
		}

		this.shape = canvas.text(
			(options.x != 'undefined') ? options.x : 0, 
			(options.y != 'undefined') ? options.y : 0, 
			(options.text != 'undefined') ? options.text : "A"
		);

		this.bounds = {
			width: canvas.width,
			height: canvas.height,
		};
	},

	move: function (dX, dY) {
		x = this.shape.attr('x');
		y = this.shape.attr('y');
		toX = x + (dX * this.moveSpeed);
		toY = y + (dY * this.moveSpeed);

		if (this.canMove(toX, toY)) {
			this.shape.animate({
				x: this.canMoveX(toX) ? toX : x,
				y: this.canMoveY(toY) ? toY : y,
			}, this.animationSpeed, "linear");
		}
	},

	canMove: function (toX, toY) {
		return true;
	},

	canMoveX: function (toX) {
		return true;
	},

	canMoveY: function (toY) {
		return true;
	}
});