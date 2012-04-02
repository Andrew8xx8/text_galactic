TextGalactic.Controller = Class.extend({
	activeKeys: [0,0,0,0,0], 

	init: function (container) {
		this.canvas = Raphael(document.getElementById(container),400,300);

		this.player = this.createPlayer();		

		this.bullets = this.canvas.set();
	//	console.log(this.player);
	},

	createPlayer: function (center) {
		return new TextGalactic.Player(this.canvas, {
			x: 10, 
			y: 20,
			text: "A"
		});
	},

	update: function() {
		//this.player.onUpdate();
		//console.log(this.activeKeys);
		this.movePlayer();

		this.playerShoot();

		this.player.update(this.canvas);
console.log(this.bullets);
		this.bullets.attr({
			fill: "#fff"
		});
		this.bullets.animate({
			scale: 1,
		}, 10, "linear");
	},

	movePlayer: function () {
		if (this.activeKeys['aleft'] && this.activeKeys['aup']) {
			this.player.move(-1, -1);
		} else if (this.activeKeys['aleft'] && this.activeKeys['adown']) {
			this.player.move(-1, 1);
		} else if (this.activeKeys['aright'] && this.activeKeys['aup']) {			
			this.player.move(1, -1);
		} else if (this.activeKeys['aright'] && this.activeKeys['adown']) {
			this.player.move(1, 1);
		} else if (this.activeKeys['aleft']) {
			this.player.move(-1, 0);
		} else if (this.activeKeys['aright']) {
			this.player.move(1, 0);
		} else if (this.activeKeys['aup']) {
			this.player.move(0, -1);
		} else if (this.activeKeys['adown']) {
			this.player.move(0, 1);
		}
	},

	playerShoot: function () {
		if (this.activeKeys['ctrl'] && this.player.canShoot()) {
			var start = this.player.getPosition();
			this.bullets.push(this.canvas.text(
				start.x, start.y, this.player.bulletType.text
			));
		}
	},

	draw: function () {
		
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

	gameOver: function () {
		var ctx = this.ctx;

		ctx.fillStyle = "#fff";
		ctx.font = "normal normal " + (TextGalactic.Settings.font_size + 15) + "px courier";
		ctx.fillText(
			"Game over", 
			Math.round(this.activeScene.resources.rectangle.to.x / 2) - 110, 
			Math.round(this.activeScene.resources.rectangle.to.y / 2)
		);
		ctx.font = "normal normal " + (TextGalactic.Settings.font_size) + "px courier";
		ctx.fillText(
			"You score: " + this.score, 
			Math.round(this.activeScene.resources.rectangle.to.x / 2) - 100, 
			Math.round(this.activeScene.resources.rectangle.to.y / 2) + (TextGalactic.Settings.font_size + 15)
		);
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

	changeKey: function (which, to) {
		switch (which){
			case 65: case 37: // left
				this.activeKeys['aleft'] = to; 
				break;
			case 87: case 38:  // up
				this.activeKeys['aup'] = to; 
				break;
			case 68: case 39: // right
				this.activeKeys['aright'] = to; 
				break;
			case 83: case 40: // down
				this.activeKeys['adown'] = to; 
				break;
			case 32: // space bar;
				this.activeKeys[4] = to; 
				break;
			case 17: // ctrl
				this.activeKeys['ctrl'] = to; 
				break;
		}
	},

});