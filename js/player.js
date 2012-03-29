TextGalactic.Player = atom.Class(
/**
 * @lends TextGalactic.Enemy#
 * @augments LibCanvas.Scene.Element#
 */
{
	Extends: LibCanvas.Scene.Element,

	/** @constructs */
	initialize: function (scene, options) {
		this.parent( scene, options );
		this.addEvent( 'moveDrag', this.redraw );
	},

	get strokeRectangle () {
		var shape = this.shape.clone();
		var shift = new Point(.5, .5);
		shape.from.move(shift);
		shape.to.move(shift, true);
		return shape;
	},

	getCollisionRectangle: function (radius) {
		if (!this.collisionRectangle) {
			this.collisionRectangle = this.shape.clone();
		}

		return this.collisionRectangle;
	},

	health: 300,

	rate: 0,

	speed: TextGalactic.Settings.speed - 50	,

	bulletType: TextGalactic.BulletTypes['simple'],

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
		var keys = this.scene.resources.keyboard;
		var moveSpeed = (this.speed * time).toSeconds().round();
		var dx = 0; var dy = 0;

		if (keys.keyState('aleft') && keys.keyState('aup')) {
			dx = this.normalize_dx(-moveSpeed); 
			dy = this.normalize_dy(-moveSpeed);
		} else if (keys.keyState('aleft') && keys.keyState('adown')) {
			dx = this.normalize_dx(-moveSpeed); 
			dy = this.normalize_dy(moveSpeed);
		} else if (keys.keyState('aright') && keys.keyState('aup')) {
			dx = this.normalize_dx(moveSpeed); 
			dy = this.normalize_dy(-moveSpeed);
		} else if (keys.keyState('aright') && keys.keyState('adown')) {
			dx = this.normalize_dx(moveSpeed);
			dy = this.normalize_dy(moveSpeed);
		} if (keys.keyState('aleft')) {
			dx = this.normalize_dx(-moveSpeed); 
		} else if (keys.keyState('aright')) {
			dx = this.normalize_dx(moveSpeed); 
		} else if (keys.keyState('aup')) {
			dy = this.normalize_dy(-moveSpeed); 
		} else if (keys.keyState('adown')) {
			dy = this.normalize_dy(moveSpeed);
		}

		move(this, dx, dy);

		if (this.rate > this.bulletType.rate) {
			this.options.controller.getBullets().create(
				new Point(this.shape.from.x, this.shape.from.y),
				this.bulletType,
				'up'
			);

			this.rate = 0;
		}

		this.rate++;
	},

	renderTo: function (ctx) {
		var healthq = Math.round(this.health/300 * 255);
		ctx.fillStyle = "rgb(255, " + (healthq) + "," + (healthq) + ")";
		ctx.font = "normal normal " + TextGalactic.Settings.font_size + "px courier";
    	ctx.fillText("A", this.shape.from.x, this.shape.to.y);

		return this.parent();
	}
});