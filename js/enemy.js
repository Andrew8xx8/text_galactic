TextGalactic.EnemiesTypes = {
	0: {
		text: "W",
		health: 100,
		speed: 1,
		score: 10,
	},
	1: {
		text: "T",
		health: 150,
		speed: 2,
		score: 20,
	},
	2: {
		text: "Y",
		health: 200,
		speed: 3,
		bulletType: TextGalactic.BulletTypes['big'],	
		score: 30,
	},
	3: {
		text: "U",
		health: 250,
		speed: 4,
		score: 40,
	},
	4: {
		text: "I",
		health: 300,
		speed: 5,
		bulletType: TextGalactic.BulletTypes['lazer'],	
		score: 50,
	},
	5: {
		text: "H",
		health: 350,
		speed: 4,
		score: 40,
	},
	6: {
		text: "X",
		health: 360,
		speed: 3,
		bulletType: TextGalactic.BulletTypes['simple'],	
		score: 30,
	},
	7: {
		text: "V",
		health: 370,
		speed: 2,
		score: 20,
	},
	8: {
		text: "M",
		health: 380,
		speed: 1,
		bulletType: TextGalactic.BulletTypes['simple'],	
		score: 10,
	}
}

TextGalactic.Enemy = TextGalactic.Primitive.extend({
	rate: 0,
	health: 0,

	dX: 1,
	dY: -1,

	init: function (canvas, options) {
		this.type = options.type;
		
		options.text = options.type.text;

		this._super(canvas, options);

		this.moveSpeed = this.type.speed;

		this.animationSpeeed = this.type.speed;		
		
		this.speed = this.type.speed;
		this.health = this.type.health;		
		this.dX = (getRandomInt(0, 1) == 0) ? 1: -1;	
		this.dY = getRandomArbitary(0.4, 1);

		this.updateColor();

		return this.shape;
	},

	updateColor: function() {
		var healthq = Math.round(this.health/this.type.health * 255);

		this.shape.attr({
			fill: "rgb(255, " + (healthq) + "," + (healthq) + ")"
		})
	},

	update: function (canvas) {
		this.move(this.dX, this.dY);
	},

	getCollisionRectangle: function () {
		return this.shape;
	},

	hit: function() {
		this.updateColor();

		this.health = this.health - 100;
		this.redraw();

		if (this.health < 0) {
			return null;
		}

		this.changeVector();

		return this;
	},

	canMoveY: function (toY) {
		if (toY > this.bounds.height) {
			this.explode();
		}

		return true;
	},

	canMoveX: function (toX) {
		if (this.xOutOfBounds(toX)) {
			this.dX = -this.dX;
		} 

		return true;
	},

	changeVector: function() {
		this.dX = (getRandomInt(0, 1) == 0) ? 1: -1;
		this.dY = getRandomArbitary(0.8, 1.3);
	},

	onUpdate: function (time) {
		if (this.health > 0) {
			var moveSpeed = (this.speed * time).toSeconds().round();

			move(this, this.dx * moveSpeed, this.dy * moveSpeed);

			this.normalize_d();

			// make shoot
			if (this.enemy.bulletType !== undefined) {
				if (this.rate > this.enemy.bulletType.rate * 4) {
					this.options.controller.getBullets().create(
						new Point(this.shape.from.x, this.shape.to.y),
						this.enemy.bulletType,
						'down'
					);

					this.rate = 0;
				}

				this.rate++;
			}
		}
	},
});