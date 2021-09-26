class Referee {

    constructor(scene) {
        this.playerScore = 0;
        this.computerScore = 0;
        this.scene = scene;


    }

    update() {
        if (this.scene.ball.x < ((-config.width / 2) - this.scene.ball.width / 2)) {
            this.computerScore += 1;

        } else if (this.scene.ball.x > (config.width / 2) + this.scene.ball.width / 2) {
            this.playerScore += 1;

        } else return;
        //if one of the two sections is good
        return constants.states.pointScored;
    }
}