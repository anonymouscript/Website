class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.spritesheet('boy', 'images/boy.png', { frameWidth: 120, frameHeight: 200 });
    }
    create() {
        this.char = this.add.sprite(0, game.config.height / 2, 'boy');
        var frameNames = this.anims.generateFrameNumbers('boy');
        this.anims.create({
            key: 'walk',
            frames: frameNames,
            frameRate: 8,
            repeat: -1

        });
        //this.char.play('walk')
        this.char.play('walk');

        this.doWalk()
        /* var width = this.game.config.width
        var height = this.game.config.height
        this.face1 = this.add.image(width/2,height/2 , "face");
        this.face2 = this.add.image(0, 0, 'face')
        this.face2.setOrigin(0,0)
        this.face3 = this.add.image(width, 0, 'face')
        this.face3.setOrigin(1,0)
        this.face4 = this.add.image(0, height, 'face')
        this.face4.setOrigin(0,1)
        this.face5 = this.add.image(width,height, 'face')
        this.face5.setOrigin(1,1)
        console.log("Ready!");*/
        /*
         
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