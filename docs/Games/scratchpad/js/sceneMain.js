class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
     this.load.image("face", "images/face.png")   
    }
    create() {
        this.face1 = this.add.image(0, 0, "face");
        this.face1.setInteractive();
        Align.center(this.face1);
        this.face1.on("pointerdown", this.faceClick, this);
        this.face1.on("pointerup", this.onUP, this);
    }
    onUP() {
        this.face1.alpha = 1;
    }
    doWalk() {
        this.tweens.add({
            targets: this.char,
            duration: 5000,
            x: game.config.width,
            y: 0,
            alpha: 0,
            scale:0.3,
            onComplete: this.onCompleteHandler,
            onCompleteParams:[this]
        });

    }
    faceClick() {
        this.face1.alpha = 0.5;
    }
    onCompleteHandler(tween, targets, scope) {
        console.log('complete');
        var char = targets[0];
        char.x = 0;
        char.y = game.config.height / 2;
        char.alpha = 1;
        char.scale = 1;
        console.log(char)
        scope.doWalk()
    }
    update() {
       
        
    }
}