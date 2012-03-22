TextGalactic.Controller = atom.Class(
/**
 * @lends TextGalactic.Controller#
 */
{
	/** @constructs */
	initialize: function () {
		var app = new LibCanvas.App( 'canvas', {
				keyboard: true,
				width   : 300,
				height  : 450
			});

		this.drawBackground( app.libcanvas.ctx );

		this.activeScene = app.createScene( 'active' );
		
		this.player = this.createPlayer(new Point( 50, 430 ));

		this.enemies = new TextGalactic.Enemies(this.activeScene, this);

		this.bullits = new TextGalactic.Bullits(this.activeScene, this);

		this.createEnemies()
	},

	getBullits: function() {
		return this.bullits;
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

	drawBackground: function (ctx) {
		ctx.fillAll(ctx.createGradient( ctx.rectangle, {
			'0.0': '#000'
		}));
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