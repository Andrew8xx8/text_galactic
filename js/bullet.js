TextGalactic.BulletTypes = {
	simple: {
		text: ".",
		rate: 10,
		speed: 5,
		color: "#ccc"
	},
	big: {
		text: "o",
		rate: 5,
		speed: 4,
		color: "#ccc"
	},
	rocket: {
		text: "^",
		rate: 3,
		speed: 2,
		color: "#ccc"
	},
	lazer: {
		text: "|",
		rate: 4,
		speed: 300,
		color: "#ccc"
	}
};

TextGalactic.Bullet = TextGalactic.Primitive.extend({
	direction: 'up',

	type: TextGalactic.BulletTypes['simple'],

	exploded: false,

	init: function (canvas, options) {
		this.type = options.type;
		options.text = options.type.text;

		this._super(canvas, options);

		this.moveSpeed = this.type.speed;

		this.direction = options.direction;
		this.animationSpeeed = this.type.speed;

		this.shape.attr({
			fill: options.type.color
		});
		
		return this.shape;
	},

	update: function () {
		this.move(0, (this.direction == 'up') ? -1 : 1);
	},

	canMove: function (toX, toY) {
		if (toY < 0 || toY > this.bounds.height) {
			this.explode()

			return false;
		} 

		return true;
	},

	getContainer: function () {
		return this.scene.resources.rectangle.clone().grow( -this.shape.radius*2 );
	},

	onUpdate: function (time) {
		var moveSpeed = (this.moveSpeed * time).toSeconds().round();

		if (this.direction == 'up') {
			move(this, 0, -moveSpeed);
			this.options.bullets.checkEnemyCollision(this);
		} else {
			move(this, 0, moveSpeed);
			this.options.bullets.checkPlayerCollision(this);
		}
		// Deestroy bullet if it's the canvas
		if (
			this.shape._center.y > this.scene.resources.rectangle.to.y 
			|| this.shape._center.y < this.scene.resources.rectangle.from.y 
		) {
			this.destroy();
		}
	},

	explode: function () {
		this.exploded = true;
		this.shape.remove();
	},

	destroy: function () {
		for(var x in this) {
			delete this[x];
		}
	}
});