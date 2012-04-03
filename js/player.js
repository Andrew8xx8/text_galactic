TextGalactic.Player = TextGalactic.Primitive.extend({
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

	getPosition: function () {
		return {
			x: this.shape.attr('x'),
			y: this.shape.attr('y')
		}
	},

	canMoveY: function (toY) {
		if (toY < 0 || toY > this.bounds.height) {
			return false;
		} 

		return true;
	},

	canMoveX: function (toX) {
		if (toX < 0 || toX > this.bounds.width) {
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

	normalize_dx: function (dx) {
		if (dx + this.shape.to.x > this.scene.resources.rectangle.to.x || dx + this.shape.from.x < 0) {
			dx = 0;
		}

		return dx;
	},

	normalize_dy: function (dy) {
		if (dy + this.shape.to.y > this.scene.resources.rectangle.to.y - TextGalactic.Settings.font_size  || dy + this.shape.from.y < 0) {
			dy = 0;
		}

		return dy;
	},
	
	onUpdate: function (time) {
		/*var keys = this.scene.resources.keyboard;
		var moveSpeed = (this.speed * time).toSeconds().round();
		var dx = 0; var dy = 0;

		if (this.rate > this.bulletType.rate / 2) {
			this.options.controller.getBullets().create(
				new Point(this.shape.from.x, this.shape.from.y),
				this.bulletType,
				'up'
			);

			this.rate = 0;
		}

		this.rate++;*/
	},

	update: function (canvas) {
		var healthq = Math.round(this.health/300 * 255);

		this.shape.attr({
			fill: "rgb(255, " + (healthq) + "," + (healthq) + ")"
		})
	}
});