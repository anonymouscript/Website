var road;
class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        
        super(config.Scene);
        this.config = config;
        this.scene = config.Scene;
        this.back = this.scene.add.image(0, 0, 'road');
        this.add(this.back);
        
        Align.scaleToGameW(this.back, 0.5);

        this.setSize(this.back.displayWidth, game.config.height);
        this.lineGroup = this.scene.add.group();
        
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * 0.9, 'cars');
        Align.scaleToGameW(this.car, 0.1);
        this.add(this.car);
        road = this;
        //interactive back
        this.back.Road = this;
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLane, this);
        this.addObject();
        //speed wil start at zero, as a grace
        this.speed = 0.0;
        
        
        this.scene.add.existing(this);
   

        
    }
    reload(self){
        var config = this.config;
        this.destroy();
        self = new Road(config);
        
    }
    moveObject() {
        //speed will be mapped so that in the end it slowly speeds up to a max
        
        this.object.y += this.vSpace / this.object.speed * this.speed;
        if (Collision.checkCollide(this.car, this.object)) {
            emitter.emit(G.Collision);
        } 
        if (this.object.y > game.config.height) {
            this.object.destroy();
            this.addObject();

        }

    }

    addObject() {
        var objs = [
            {
                key: "pcar1",
                speed: 10,
                scale: 10

            },
            {
                key: "pcar2",
                speed: 10,
                scale: 10

            },
            {
                key: "cone",
                speed: 20,
                scale: 5
            },
            {
                key: "barrier",
                speed: 20,
                scale: 8

            }]
        var index = Math.floor(Math.random() * objs.length);

        var lane = Math.random() > 0.5 ? 1 : -1;
        this.object = this.scene.add.image(-lane * this.displayWidth / 4, 0, objs[index].key);
        this.object.speed = objs[index].speed;
        Align.scaleToGameW(this.object, objs[index].scale / 100);
        //console.log(this.object.displayWidth);
        this.add(this.object);
        
    }
    static placeRoads(objs, grid){
        grid.fillCells(objs);
        for (const i in objs) {
            const e = objs[i];
            e.y = 0;
            e.height = game.config.height;

        }

    }
    changeLane() {
        if (this.scene.stop) {
            return;
        }
        this.car.x = -this.car.x;

    }
    makeLines() {
        if(!!this.linesMade){
            return;
        }
        this.vSpace = this.displayHeight / 6;
        
        for (var i = 0; i < 20; i++) {
            var line = this.scene.add.image(this.x, this.vSpace * i, 'line');
            this.lineGroup.add(line);
            
        }
	    //placeholder lines to be replaced
        this.topLine = {y: Infinity}
        this.bottomLine = {y:0};
        this.linesMade = true;
    }
    
    moveLines() {
        // This function moves the lines down 
        // in addition this function gives you points for how far you are traveling
        // this is because this is the one that creates movement of the car (kind of)
        
        //also, makeLines is called because no matter how manny times you call it, lines are made once
        this.makeLines();

        this.lineGroup.children.iterate(function (image) {
            image.y += (this.vSpace / 20) * this.speed;
            if (image.y > this.bottomLine.y) {
                this.bottomLine = image;
                this.bottomY = image.y
            }
            if (image.y < this.topLine.y) {
                this.topLine = image;
                this.topY = image.y;
            }

        }.bind(this));
        // I divide the score by 1000 to make it reasonable
        emitter.emit(G.UP_SCORE, (this.vSpace / 20 * this.speed) / 100);   
        // this function moves the botom line to the top to move them
        if (this.topLine.y > 0) {
            this.bottomLine.y = 0 - (this.vSpace);
            
        }
            

    }

}

