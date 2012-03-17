TextGalactic.Enemis = {
	0: {
		text: "W",
		healf: 100,
		speed: 100,
		//bullitType: TextGalactic.BullitTypes['simple'],	
	},
	1: {
		text: "T",
		healf: 150
	},
	2: {
		text: "Y",
		healf: 200
	},
	3: {
		text: "U",
		healf: 250
	},
	4: {
		text: "I",
		healf: 300
	},
	5: {
		text: "H",
		healf: 350
	},
	6: {
		text: "X",
		healf: 360
	},
	7: {
		text: "V",
		healf: 370
	},
	8: {
		text: "M",
		healf: 380
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
		this.enemy = TextGalactic.Enemis[this.enemyType];
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

	enemyType: 0,

	speed: TextGalactic.Settings.speed - 50	,

	onUpdate: function (time) {
		//var moveSpeed = (enemy.speed * time).toSeconds().round();

		//this.vmove( +moveSpeed );

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