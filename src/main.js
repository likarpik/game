window.onload = () => {

    let config = {
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        scene: [Game],
        physics: {
            default: "arcade",
            arcade:{
                gravity: {
                    y: 800,
                },
                debug: false
            }
        }
    }

    let game = new Phaser.Game(config);
}