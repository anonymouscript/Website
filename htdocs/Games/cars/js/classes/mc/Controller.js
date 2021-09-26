var controller;
var emitter;
class Controller {
    constructor() {
        model = new Model();
        emitter = new Phaser.Events.EventEmitter();
        this.emitter = emitter;
        emitter.on(G.SCORE_UPDATED, this.updateScore);
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_SCORE, this.upScore)
        emitter.on(G.EXTRA_LIVE_SCORE_MET, model.nextScore.bind(model));
        
        
    }
    setScore(score) {
        model.score = score;
        
    }
    updateScore(){
        let score = model.score;
        if(score > model.nextLife){
            emitter.emit(G.EXTRA_LIVE_SCORE_MET);
            emitter.emit(G.UP_LIVES);
        }
    }
    upScore(points) {
        var score = model.score;
        score += points;
        model.score = score;
    }
    
}
