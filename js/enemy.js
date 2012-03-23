TextGalactic.EnemiesTypes = {
	0: {
		text: "W",
		health: 100,
		speed: 150,
	},
	1: {
		text: "T",
		health: 150,
		speed: 140,
	},
	2: {
		text: "Y",
		health: 200,
		speed: 130,
		bulletType: TextGalactic.BulletTypes['big'],	
	},
	3: {
		text: "U",
		health: 250,
		speed: 120,
	},
	4: {
		text: "I",
		health: 300,
		speed: 110,
		bulletType: TextGalactic.BulletTypes['lazer'],	
	},
	5: {
		text: "H",
		health: 350,
		speed: 100,
	},
	6: {
		text: "X",
		health: 360,
		speed: 90,
		bulletType: TextGalactic.BulletTypes['simple'],	
	},
	7: {
		text: "V",
		health: 370,
		speed: 70,
	},
	8: {
		text: "M",
		health: 380,
		speed: 50,
		bulletType: TextGalactic.BulletTypes['simple'],	
	}
}

TextGalactic.Enemy = atom.Class(
/**
 * @lends TextGalactic.Enemy#
 * @augments LibCanvas.Scene.Element#
 */
{
	Extends: LibCanvas.Scene.Element,

	colors: {
		3: {
			'0.0': '#f66',
			'1.0': '#900'
		},
		2: {
			'0.0': '#ff6',
			'1.0': '#f60'
		},
		1: {
			'0.0': '#6f6',
			'1.0': '#090'
		}
	},

	/** @constructs */
	initialize: function (scene, options) {
		this.parent( scene, options );
		this.enemy = TextGalactic.EnemiesTypes[options.enemyType];
		this.speed = this.enemy.speed;
		this.health = this.enemy.health;
		this.dx = (getRandomInt(0, 1) == 0) ? 1: -1;
		this.dy = getRandomArbitary(0.8, 1.2);
	},

	getCollisionRectangle: function () {
		return this.shape;
	},

	rate: 0,
	health: 0,

	dx: 1,
	dy: -1,

	enemyType: 0,

	speed: TextGalactic.Settings.speed - 50	,

	hit: function() {
		this.health = this.health - 100;
		this.redraw();

		if (this.health < 0) {
			return null;
		}

		return this;
	},

	normalize_d: function () {
		if (this.shape.from.y > this.scene.resources.rectangle.to.y) {
			this.kill();
		}

		if (this.shape.to.x > this.scene.resources.rectangle.to.x || this.shape.from.x < 0) {
			this.dx = -this.dx;
		}
		
		if (this.shape.from.y < -TextGalactic.Settings.font_size * 2) {
			this.dy = -this.dy;
		}
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

	renderTo: function (ctx) {
		//ctx.fill( this.shape, ctx.createRectangleGradient( this.shape, this.colors[this.lives] ));
		var healthq = Math.round(this.health/this.enemy.health * 255);
		ctx.fillStyle = "rgb(255, " + (healthq) + "," + (healthq) + ")";

		ctx.font = "normal normal " + TextGalactic.Settings.font_size + "px courier";
    	ctx.fillText(this.enemy.text, this.shape.from.x, this.shape.to.y);

		return this.parent();
	},

	kill: function () {
		this.destroy();
		this.options.enemies._destroy(this);
	}
});