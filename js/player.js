TextGalactic.Player = TextGalactic.Primitive.extend({
	init: function (canvas, options) {
		this._super(canvas, options);

		this.updateColor();

		return this.shape;
	},
	
	getCollisionRectangle: function (radius) {
		if (!this.collisionRectangle) {
			this.collisionRectangle = this.shape.clone();
		}

		return this.collisionRectangle;
	},

	health: 300,

	rate: 0,

	bulletType: TextGalactic.BulletTypes['simple'],

	canShoot: function() {
		
		this.rate++;

		if (this.rate > this.bulletType.rate / 2) {
			this.rate = 0;
			return true;
		}

		return false;
	},

	canMoveY: function (toY) {
		if (this.yOutOfBounds(toY)) {
			return false;
		} 

		return true;
	},

	canMoveX: function (toX) {
		if (this.yOutOfBounds(toX)) {
			return false;
		} 

		return true;
	},

	hit: function () {
		this.health = this.health - 25;
		this.redraw();

		if (this.health < 0) {
			this.destroy();
			this.options.controller.gameOver();
		}

		return this;
	},

	update: function (canvas) {

	},

	updateColor: function() {
		var healthq = Math.round(this.health/300 * 255);

		this.shape.attr({
			fill: "rgb(255, " + (healthq) + "," + (healthq) + ")"
		})
	},
});