TextGalactic.Controller = Class.extend({
	init: function (container) {
		this.canvas = Raphael(document.getElementById(container),400,300);

		this.player = this.createPlayer();
		
		console.log(this.player);
	},

	createPlayer: function (center) {
		var player = {
			height: TextGalactic.Settings.font_size,
			width: TextGalactic.Settings.font_stretch
		}

		return new TextGalactic.Player(this.canvas);
	},

	update: function() {
		console.log(this);
	///	this.player.onUpdate();
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
});