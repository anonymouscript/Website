
class ScoreBox extends Phaser.GameObjects.Container {
	constructor(config) {
		super(config.scene);
		this.scene = config.scene;
		this.text1 = this.scene.add.text(0, 0, "Score: 0");
		this.add(this.text1);
		this.text1.setOrigin(0.5, 0.5);

		
		emitter.on(G.SCORE_UPDATED, this.updateScore, this);
		this.scene.add.existing(this);
	}
	updateScore() {
		this.text1.text = "Score: " + Math.floor(model.score);
	}
}