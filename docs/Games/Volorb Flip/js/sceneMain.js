var currentScene;
class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('face', 'images/face.png');
    }
    create() {
        currentScene = this;
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        console.log("Scene is loading")
        model.score = 100;

        this.sb = new ScoreBox({ scene: this });
        this.sb.x = game.config.width / 2;
        this.sb.y = 50;

        var gridConfig = { scene: this, height: game.config.height, width: game.config.width };
        this.alignGrid = new AlignGrid(gridConfig);
        this.alignGrid.showNumbers();

        this.face = this.add.sprite(0, 0, 'face');
        this.index = 0;

        
        this.time = 0
        
    }
    update() {
        
        if(this.time == 60){ 
            this.time = 0;
            this.index %= this.alignGrid.cells;
            this.alignGrid.placeAtIndex(this.index, this.face);
            this.index++;
        } else {
            this.time ++;
        }


    }
}