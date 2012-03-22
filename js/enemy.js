TextGalactic.Enemis = {
	0: {
		text: "W",
		healf: 100,
		speed: 150,
	},
	1: {
		text: "T",
		healf: 150,
		speed: 140,
	},
	2: {
		text: "Y",
		healf: 200,
		speed: 130,
		bullitType: TextGalactic.BullitTypes['big'],	
	},
	3: {
		text: "U",
		healf: 250,
		speed: 120,
	},
	4: {
		text: "I",
		healf: 300,
		speed: 110,
		bullitType: TextGalactic.BullitTypes['lazer'],	
	},
	5: {
		text: "H",
		healf: 350,
		speed: 100,
	},
	6: {
		text: "X",
		healf: 360,
		speed: 90,
		bullitType: TextGalactic.BullitTypes['simple'],	
	},
	7: {
		text: "V",
		healf: 370,
		speed: 70,
	},
	8: {
		text: "M",
		healf: 380,
		speed: 50,
		bullitType: TextGalactic.BullitTypes['simple'],	
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
		this.addEvent( 'moveDrag', this.redraw );
		this.enemy = TextGalactic.Enemis[options.enemyType];
		this.speed = this.enemy.speed;
		this.healf = this.enemy.healf;
		this.dx = (getRandomInt(0, 1) == 0) ? 1: -1;
		this.dy = (getRandomInt(0, 1) == 0) ? 1: -1;
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
			this.collisionRectangle = this.shape.clone().grow(radius*2);
		}
		
		return this.collisionRectangle;
	},

	rate: 0,
	healf: 0,

	dx: 1,
	dy: -1,

	enemyType: 0,

	speed: TextGalactic.Settings.speed - 50	,

	normalize_d: function () {
		if (this.shape.from.y > this.scene.resources.rectangle.to.y) {
			this.destroy();
			this.options.enemies.create();
		}

		if (this.shape.to.x > this.scene.resources.rectangle.to.x || this.shape.from.x < 0) {
			this.dx = -this.dx;
		}
		
		if (this.shape.from.y < -TextGalactic.Settings.font_size * 2) {
			this.dy = -this.dy;
		}
	},

	onUpdate: function (time) {
		var moveSpeed = (this.speed * time).toSeconds().round();

		move(this, this.dx * moveSpeed, this.dy * moveSpeed);

		this.normalize_d();

		// make shoot
		if (this.enemy.bullitType !== undefined) {
			if (this.rate > this.enemy.bullitType.rate * 4) {
				var bullit = new TextGalactic.Bullit( this.scene, {
					shape: new Circle(new Point(this.shape.from.x, this.shape.to.y), TextGalactic.Settings.font_size),
					player: this.options.player 
				});
	
				bullit.type = this.enemy.bullitType;
				bullit.direction = 'down';
				bullit.owner = this;

				this.rate = 0;
			}

			this.rate++;
		}
	},

	renderTo: function (ctx) {
		//ctx.fill( this.shape, ctx.createRectangleGradient( this.shape, this.colors[this.lives] ));
		ctx.fillStyle = "#fff";
		ctx.font = "normal normal " + TextGalactic.Settings.font_size + "px courier";
    	ctx.fillText(this.enemy.text, this.shape.from.x, this.shape.to.y);

		return this.parent();
	}
});