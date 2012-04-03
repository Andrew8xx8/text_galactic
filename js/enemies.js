TextGalactic.Enemies =  Class.extend({
	storage: [],

	getCount: function() {
		return this.storage.length;
	},

/*	_destroy: function(object) {
		for (i = 0; i < this.storage.length; i++) {
			if (this.storage[i] == object) {
				this.storage.splice(i, 1);
				this.create();
			}
		}
	},*/

	create: function (canvas) {
		var enemy = new TextGalactic.Enemy(canvas, {
			x: getRandomInt(0, canvas.width),
			y: -TextGalactic.Settings.fontSize * 2,
			type: TextGalactic.EnemiesTypes[getRandomInt(0, 8)],
		});

		enemy.index = this.storage.push(enemy);

		return enemy;
	},

	update: function () {
		for (i = 0; i < this.storage.length; i++) {
			if (typeof(this.storage[i]) == 'object') {
				this.storage[i].update();

				if (this.storage[i].exploded) {
					this.storage[i].destroy();
					delete this.storage[i];
					this.storage.splice(i, 1);
				}
			}
		}
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
					this.controller.increaseScore(this.storage[i].enemy.score);
					this.controller.drawScore();
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