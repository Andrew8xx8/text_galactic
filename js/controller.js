TextGalactic.Controller = atom.Class(
/**
 * @lends TextGalactic.Controller#
 */
{
	/** @constructs */
	initialize: function () {
		var app = new LibCanvas.App( 'canvas', {
				keyboard: true,
				width   : 350,
				height  : 450
			});

		this.ctx = app.libcanvas.ctx;

		this.drawBackground();

		this.activeScene = app.createScene( 'active' );
		
		this.player = this.createPlayer(new Point( 50, 400 ));

		this.enemies = new TextGalactic.Enemies(this.activeScene, this);

		this.bullets = new TextGalactic.Bullets(this.activeScene, this);

		this.createEnemies();

		this.drawScore();
	},

	ctx: null,

	score: 0,

	getBullets: function() {
		return this.bullets;
	},

	getPlayer: function() {
		return this.player;
	},

	getEnemies: function() {
		return this.enemies;
	},

	createEnemies: function () {
		this.getEnemies().create();
		this.getEnemies().create();
		this.getEnemies().create();
		this.getEnemies().create();
		this.getEnemies().create();
	},

	drawBackground: function () {
		this.ctx.fillAll(this.ctx.createGradient(this.ctx.rectangle, {
			'0.0': '#000'
		}));
	},

	drawScore: function () {
		var ctx = this.ctx;
		ctx.fillStyle = "#000";
		ctx.fill(new Rectangle({
			from: [0, this.activeScene.resources.rectangle.to.y - TextGalactic.Settings.font_size],
			size: [this.activeScene.resources.rectangle.to.x, TextGalactic.Settings.font_size]
		}));
		ctx.fillStyle = "#fff";
		ctx.font = "normal normal " + (TextGalactic.Settings.font_size - 5) + "px courier";
    	ctx.fillText(this.score, 10, this.activeScene.resources.rectangle.to.y - 4);
	},

	increaseScore: function (score) {
		this.score = this.score + score;
	},

	createPlayer: function (center) {
		var player = {
			height: TextGalactic.Settings.font_size,
			width: TextGalactic.Settings.font_stretch
		}

		return new TextGalactic.Player( this.activeScene, {
			shape: new Rectangle({
					from: center.clone().move( [-player.width/2, -player.height/2] ),
					size: [player.width, player.height]
				}),
			controller: this		
		});
	}
});