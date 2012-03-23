TextGalactic.BulletTypes = {
	simple: {
		text: ".",
		rate: 10,
		speed: 450,
		color: "#ccc"
	},
	big: {
		text: "o",
		rate: 5,
		speed: 100,
		color: "#ccc"
	},
	rocket: {
		text: "^",
		rate: 3,
		speed: 100,
		color: "#ccc"
	},
	lazer: {
		text: "|",
		rate: 3,
		speed: 300,
		color: "#ccc"
	}
};

TextGalactic.Bullet = atom.Class(
/**
 * @lends TextGalactic.Bullet#
 * @augments LibCanvas.Scene.Element#
 */
{
	Extends: LibCanvas.Scene.Element,
	
	direction: 'up',

	type: TextGalactic.BulletTypes['simple'],

	/** @constructs */
	initialize: function (scene, options) {
		this.parent(scene, options);
		this.moveSpeed = (this.type.speed);
		this.type = options.type;
		this.direction = options.direction;
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

	explode: function (){
		this.destroy;
		this.options.bullets._destroy(this);
	},

	renderTo: function (ctx) {
		//ctx.fill( this.shape);

		ctx.fillStyle = this.type.color;
		ctx.font = "normal normal " + TextGalactic.Settings.font_size + "px courier";
    	ctx.fillText(this.type.text, this.shape._center.x, this.shape._center.y);

		return this.parent();
	}
});