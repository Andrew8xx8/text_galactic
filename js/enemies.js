TextGalactic.Enemies = atom.Class({

	initialize: function (scene, options) {
		this.options = options;
		this.scene  = scene;
	},

	create: function (xIndex, yIndex) {
		console.log(this.options);
		var enemy = new TextGalactic.Enemy(this.scene, {
			shape: new Rectangle({
					from: new Point( xIndex, yIndex ),
					size: [TextGalactic.Settings.font_stretch, TextGalactic.Settings.font_size]
				}),
			player: this.options.player
		});

		return enemy;
	},

	erase: function (cell) {
		var row = this.index[cell.options.yIndex];
		delete row[cell.options.xIndex];
		return this;
	},

	find: function (point) {
		if (!this.limit.hasPoint(point)) return null;

		var size   = this.options;
		var xIndex = (point.x / (size.width  + size.padding)).floor();
		var yIndex = (point.y / (size.height + size.padding)).floor();
		var shift  = [-1, 0, 1];

		for (var x = shift.length; x--;) for (var y = shift.length; y--;) {
			var row  = this.index[yIndex+shift[y]];
			var cell = row && row[xIndex+shift[x]];
			if (cell && cell.getCollisionRectangle(this.radius).hasPoint(point)) {
				return cell;
			}
		}
		return null;
	}
});