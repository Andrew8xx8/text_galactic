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
		
	},

	move: function (dx, dy) {
		this.shape.animate({
			x: this.shape.attr('x') + (dx * this.moveSpeed),
			y: this.shape.attr('y') + (dy * this.moveSpeed),
		}, this.animationSpeed, "linear");
	}
});