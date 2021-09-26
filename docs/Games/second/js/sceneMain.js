class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);
    }
    create() {
        this.catSound = this.sound.add('cat');
        this.catSound.play();
        this.counter = 0;
    }




    update() {
        

    }
}