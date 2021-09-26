class AlignGrid {
    constructor(config) {
        this.config = config;
        if (!config.scene) {
            throw "Scene required to be pased"
        }
        if (!config.rows) {
            config.rows = 5;
        }
        if (!config.cols) {
            config.cols = 5;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }
        
        this.scene = config.scene;

        this.ch = config.height / config.rows;
        this.cw = config.width / config.cols;

    }
    show() {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);
        for (var i = 0; i < this.config.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        for (var i = 0; i < this.config.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }
        this.graphics.strokePath();

    }
    placeAt(xx, yy,obj) {
        var x2 = this.cw * (xx + 0.5);
        var y2 = this.ch * (yy + 0.5);
        
        obj.x = x2;
        obj.y = y2;

    }
    showNumbers(){
        this.show();
        var count = 0
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; j++) {
                var numText = this.scene.add.text(0,0, count.toString(), {color: '#ff0000'});
                numText.setOrigin(0.5, 0.5);
                this.placeAt(j,i, numText);
                count ++;
                
            }
        }


    }
    get cells(){
        return this.config.cols * this.config.rows;
    }
    scaleToCell(obj, keepAspectRatio = true){
        
    }
    fillCell(){

    }
    fillCells(objs, keepAspectRatio = true){
        if(!objs){
            throw 'must pass an array of items'

        }
        for(let i = 0; i < objs.length; i ++){
            this.scaleToCell(objs[i], keepAspectRatio);
            this.placeAtIndex(i, objs[i]);
        }
    }

    scaleToCell(obj, keepAspectRatio = true){
        if(obj.displayWidth != this.cw){
            obj.displayWidth = this.cw;
            if(keepAspectRatio){
                obj.scaleY = obj.scaleX;
        
            }
        }
        if(obj.displayHeight > this.ch){
            obj.displayHeight = this.ch;
            if (keepAspectRatio) {
                obj.scaleX = obj.scaleY;
            }
        
        }
    }
    placeAtIndex(index, obj){
        var yy = Math.floor(index/this.config.cols);
        var xx = index % this.config.cols;
        this.placeAt(xx, yy, obj)
    }

}