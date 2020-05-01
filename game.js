window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        width: 700,
        height: 462,
        parent: 'canvas',
        backgroundColor: 0x000000,
        scene: [Scene2],
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                  },
                debug: false
            }
        },
    }

    var game = new Phaser.Game(config);
}