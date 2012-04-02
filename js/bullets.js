TextGalactic.Bullets = Class.extend({

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

	create: function (fromPoint, bulletType, direction) {
		var bullet = this.storage.push(new TextGalactic.Bullet(this.scene, {
			shape: new Circle(fromPoint, TextGalactic.Settings.font_size),
			type: bulletType,
			direction: direction,
			bullets: this
		}));

		return bullet;
	},

	checkPlayerCollision: function (bullet) {
		var player = this.controller.getPlayer();

		if (player.getCollisionRectangle(bullet.shape.radius).hasPoint(bullet.shape)) {
			player.hit();
			bullet.destroy();
		}
	},

	checkEnemyCollision: function (bullet) {
		var enemy = this.controller.getEnemies().find([bullet.shape._center.x, bullet.shape._center.y]);

		if (enemy !== null) {
			bullet.explode();
		}
	},
});