TextGalactic.Bullits = atom.Class({

	Extends: TextGalactic.Collection,

	initialize: function (scene, controller) {
		this.parent(scene, controller);
		this.storage = new Array();
	},
	
	_destroy: function(object) {
		for (i = 0; i < this.storage.length; i++) {
			if (this.storage[i] == object) {
				this.storage.splice(i, 1);
			}
		}
	},

	create: function (fromPoint, bullitType, direction) {
		var bullit = this.storage.push(new TextGalactic.Bullit(this.scene, {
			shape: new Circle(fromPoint, TextGalactic.Settings.font_size),
			type: bullitType,
			direction: direction,
			bullits: this
		}));

		return bullit;
	},

	checkPlayerCollision: function (bullit) {
		var player = this.controller.getPlayer();

		if (player.getCollisionRectangle(bullit.shape.radius).hasPoint(bullit.shape)) {
			player.hit();
			bullit.destroy();
		}
	},

	checkEnemyCollision: function (bullit) {
		var enemy = this.controller.getEnemies().find([bullit.shape._center.x, bullit.shape._center.y]);

		if (enemy !== null) {
			bullit.explode();
		}
	},
});