var scene
var config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: {
        create: create,
        preload: preload,
        update: update
    }
};
var game = new Phaser.Game(config);
var lines;
var balls;
var keys;

function create() {

    //center camera
    console.log(this);
    this.playerscore = this.add.text(-25, -config.height / 2, 0, { fontFamily: "Times New Roman", fontSize: "20px" });
    this.computerscore = this.add.text(25, -config.height / 2, 0, { fontFamily: "Times New Roman", fontSize: "20px" });
    this.playerscore.textSize = 30;

    let camera = this.cameras.main;
    camera.centerOn(0, 0);
    this.physics.world.setBounds((-config.width / 2) - 25, -config.height / 2, (config.width) + 25, config.height);
    this.physics.world.setBoundsCollision();
    keys = {
        w: this.input.keyboard.addKey("W"),
        s: this.input.keyboard.addKey("S"),
        i: this.input.keyboard.addKey("I"),
        k: this.input.keyboard.addKey("K")
    };

    //using variables to easily change the height

    lines = this.physics.add.group();

    lines.immovable = true;

    this.line1 = lines.create(-config.width * 3 / 8, 0, 'line').setOrigin(1, 0.5);
    this.line1.body.immovable = true;
    this.line1.setCollideWorldBounds(true);
    this.line2 = lines.create(config.width * 3 / 8, 0, 'line').setOrigin(0, 0.5);
    this.line2.body.immovable = true;
    this.line2.setCollideWorldBounds(true);
    balls = this.physics.add.group();

    this.ball = balls.create(0, 0, 'ball');
    this.ball.setVelocityX(300);
    this.ball.setVelocityY(100);
    this.ball.body.bounce.set(1.005);
    this.ball.setOrigin(0.5, 0.5);

    this.ball.maxSpeed = 0;
    scene = this

    this.ball.setCollideWorldBounds(true);

    this.physics.add.collider(lines, balls);
    //this.line1 = this.add.image("line", 10,0).setOrigin(1,0.5);
    //this.line2 = this.add.image("line", 100, 100).setOrigin(0,0.5);


    this.referee = new Referee(this);

}

function makeBall() {
    ball = balls.create(0, 0, 'ball');
    ball.setVelocityX(300);
    ball.setVelocityY(100);
    ball.body.bounce.set(1.005);
    ball.setOrigin(0.5, 0.5);
    ball.setCollideWorldBounds(true);

    scene.physics.add.collider(lines, balls);
    return ball;
}

function preload() {
    this.load.image("ball", "img/ball.png");
    this.load.image("line", "img/line.png");
}

function update() {

    refereeVerdict = this.referee.update();
    if (refereeVerdict == constants.states.pointScored) {
        this.ball.destroy();
        this.line1.y, this.line2.y = 0;
        this.playerscore.setText(this.referee.playerScore);
        this.computerscore.setText(this.referee.computerScore);
        this.ball = makeBall();
        this.physics.pause();

        setTimeout(this.physics.resume.bind(this.physics), 3000)
    }



    const step = 4;


    if (keys.w.isDown) {
        console.log("W DOWN")

        this.line1.setVelocityY(-10 * 60);

    } else if (keys.s.isDown) {

        this.line1.setVelocityY(10 * 60);
    } else {

        this.line1.setVelocityY(0);
    }
    /*if(keys.i.isDown){

        
        this.line2.setVelocityY(-10 * 60);

    } else if(keys.k.isDown){
        
        this.line2.setVelocityY(10 * 60);
    } else {
   
        this.line2.setVelocityY(0);
    }*/

    /*if(this.ball.y -10 < this.line2.y && this.ball.x >0){

        
        this.line2.setVelocityY(-10 * 60);

    } else if(this.ball.y + 10 > this.line2.y && this.ball.x > 0){
        
        this.line2.setVelocityY(10 * 60);
    } else {
   
        this.line2.setVelocityY(0);
    }*/
    if (this.line2.y + 10 > this.ball.y && this.ball.y > this.line2.y - 10) {
        this.line2.setVelocityY(0);

    } else if (this.ball.y > this.line2.y) {
        this.line2.setVelocityY(60 * 10);
    } else {
        this.line2.setVelocityY(60 * -10);
    }
}