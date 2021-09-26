var model;
class Model {
    constructor() {
        this._score = 0;
        this._lives = 1;
        this._extraLiveAt = [150, 500];
        
    }
    set score(val) {
        this._score = val;
        
        emitter.emit(G.SCORE_UPDATED);
    }
    get nextLife(){
        return this._extraLiveAt[0];
    }

    nextScore(){
        this._extraLiveAt.shift();
        this._extraLiveAt[1] = this._extraLiveAt[0] * 2;
    }
    
    get score() {
        return this._score;

    }
    set lives(i){
        this._lives = i;
    }
    get lives(){
        return this._lives;
    }
}