var scene;
class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        this.road1 = 0;
    }
    preload() {
        this.load.image('road', 'images/road.jpg');
        this.load.spritesheet('cars', 'images/cars.png', { frameWidth: 56, frameHeight: 126 });
        this.load.image('line', 'images/line.png');
        this.load.image("pcar1", 'images/pcar1.png');
        this.load.image('pcar2', 'images/pcar2.png');
        this.load.image('cone', 'images/cone.png');
        this.load.image('barrier', 'images/barrier.png');
    }
    create() {
        // here I will assign the controller, then it will start a chain reaction
        // 
        scene = this;
        var gridConfig = { scene: this, height: game.config.height, width: game.config.width };
        var alignGrid = new AlignGrid(gridConfig);
        
        this.roadGrid = new AlignGrid({scene: this, height: game.config.height, width: game.config.width, rows: 1, cols: 1});
        
        this.alignGrid = alignGrid;
        controller = new Controller();
        
        
        this.frameRate = game.loop.actualFps;
        var road = new Road({ Scene: this } );
        

        this.roads = [road];
        
        road.x = game.config.width / 2;
          
        
        //grace period is a number of frames
        // not seconds
        this.gracePeriod = this.frameRate * 5;

        this.scoreBox = new ScoreBox({ scene: this });
        this.alignGrid.placeAtIndex(4, this.scoreBox);
        this.updateRoad = this.updateGrace.bind(this);
        emitter.on(G.UP_LIVES, this.upLives.bind(this));
        emitter.on(G.COLLISION, this.gameOver.bind(this));

    }
    gameOver(){
        if(!this.god){ 
            this.updateRoad = this.updateCrash;
        }
    }
    upLives(){
        model.lives = model.lives + 1;
        var lives = model.lives;
        let length = this.roads.length + 1;
        for(const i in this.roads){
            this.roads[i].destroy();
        }
        this.roads = []
        for (let i = 0; i < length; i++) {
                       
        var newRoad = new Road({Scene:this});
        this.roads.push(newRoad);
        }
        let gridConf = {scene: this, rows: 1, cols: lives, height: game.config.height, width: game.config.width};
        let grid = new AlignGrid(gridConf);
        //grid.fillCells(this.roads, false);
        Road.placeRoads(this.roads, grid);
        this.updateRoad = this.updateCrash;
        this.stop = true;


    }
    updateCrash(){
        
    }
    update(){
        this.updateRoad();
    }
    updateGrace(){
        
            
        
        for(let i = 0; i < this.roads.length; i ++){ 
        let road = this.roads[i];
        road.speed += 1 / (this.gracePeriod)
        road.moveLines();
        road.moveObject();
        if (road.speed >= 1){
            this.updateRoad = this.updateReg.bind(this);
        }

    }
    }
    updateReg() {
        for (let i = 0; i < this.roads.length; i++) {
            const road = this.roads[i];
            
        
        
            road.moveLines();
            road.moveObject();
            road.speed += 1 / (this.frameRate * 60 * 2)
        }
    }
}
