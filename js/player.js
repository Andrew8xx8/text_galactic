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

	healf: 300,

	rate: 0,

	speed: TextGalactic.Settings.speed - 50	,

	bullitType: TextGalactic.BullitTypes['simple'],

	hit: function () {
		this.healf = this.healf - 25;
		this.redraw();

		if (this.healf < 0) {
			this.destroy();
		}

		return this;
	},

	normalize_x: function (x) {
		return x;
	},

	normalize_y: function (y) {
		return y;
	},
	
	onUpdate: function (time) {
		var keys = this.scene.resources.keyboard;
		var moveSpeed = (this.speed * time).toSeconds().round();
		var dx = 0; var dy = 0;

		if (keys.keyState('aleft') && keys.keyState('aup')) {
			dx = this.normalize_x(-moveSpeed); 
			dy = this.normalize_y(-moveSpeed);
		} else if (keys.keyState('aleft') && keys.keyState('adown')) {
			dx = this.normalize_x(-moveSpeed); 
			dy = this.normalize_y(moveSpeed);
		} else if (keys.keyState('aright') && keys.keyState('aup')) {
			dx = this.normalize_x(moveSpeed); 
			dy = this.normalize_y(-moveSpeed);
		} else if (keys.keyState('aright') && keys.keyState('adown')) {
			dx = this.normalize_x(moveSpeed);
			dy = this.normalize_y(moveSpeed);
		} if (keys.keyState('aleft')) {
			dx = this.normalize_x(-moveSpeed); 
		} else if (keys.keyState('aright')) {
			dx = this.normalize_x(moveSpeed); 
		} else if (keys.keyState('aup')) {
			dy = this.normalize_y(-moveSpeed); 
		} else if (keys.keyState('adown')) {
			dy = this.normalize_y(moveSpeed);
		}

		move(this, dx, dy);

		if (this.rate > this.bullitType.rate) {
			var bullit = new TextGalactic.Bullit( this.scene, {
				shape: new Circle(new Point(this.shape.from.x, this.shape.from.y), TextGalactic.Settings.font_size),
			});

			bullit.type = this.bullitType;
			bullit.direction = 'up';
			bullit.owner = this;
			
			this.rate = 0;
		}

		this.rate++;
	},

	renderTo: function (ctx) {
		var healfq = Math.round(this.healf/300 * 255);
		ctx.fillStyle = "rgb(255, " + (healfq) + "," + (healfq) + ")";
		ctx.font = "normal normal " + TextGalactic.Settings.font_size + "px courier";
    	ctx.fillText("A", this.shape.from.x, this.shape.to.y);

		return this.parent();
	}
});