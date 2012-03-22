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

		this.enemies = this.createEnemies();
	},

	createEnemies: function () {
		var x, y, cells = new TextGalactic.Enemies(this.activeScene, {
			player: this.player
		});
		for (i = 0; i < 6; i++) {
			cells.create();
		}

		return cells;
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
				})
		});
	}
});