var controller;
var emitter;
class Controller {
    constructor() {
        if (typeof model == undefined) {
            model = new Model();
        }
        emitter = new Phaser.Events.EventEmitter();
        
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_SCORE, this.upScore);
        
    }
    setScore(score) {
        model.score = score;
        
    }
    upScore(points) {
        var score = model.score;
        score += points;
        model.score = score;
    }
    
}
