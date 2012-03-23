TextGalactic.Enemies = atom.Class({

	Extends: TextGalactic.Collection,

	initialize: function (scene, controller) {
		this.parent(scene, controller);
		this.storage = new Array();
	},

	getCount: function() {
		return this.storage.length;
	},

	_destroy: function(object) {
		for (i = 0; i < this.storage.length; i++) {
			if (this.storage[i] == object) {
				this.storage.splice(i, 1);
				this.create();
			}
		}
	},

	create: function () {
		var enemy = new TextGalactic.Enemy(this.scene, {
			shape: new Rectangle({
					from: new Point( 
						getRandomInt(0, this.scene.resources.rectangle.to.x - TextGalactic.Settings.font_size ), 
						-TextGalactic.Settings.font_size * 2 
					),
					size: [TextGalactic.Settings.font_stretch, TextGalactic.Settings.font_size]
				}),
			controller: this.controller,
			enemyType: getRandomInt(0, 8),
			enemies: this
		});

		enemy.index = this.storage.push(enemy);

		return enemy;
	},

	erase: function (cell) {
		var row = this.index[cell.options.yIndex];
		delete row[cell.options.xIndex];
		return this;
	},

	find: function (point) {
		for (i = 0; i < this.storage.length; i++) {
			var shape = this.storage[i].shape;
			if (shape.hasPoint(point)) {
				if (this.storage[i].hit() == null) {
					this.storage[i].destroy();
					this.storage.splice(i, 1);
					this.create();
				}

				return i;
			}
		}

		return null;
	}
});