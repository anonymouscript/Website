var game;
window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        parent: 'game',
        scene: [SceneMain]
    };
    game = new Phaser.Game(config);
};