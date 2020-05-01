class Scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "img/bg.jpg");
        this.load.spritesheet("person", "img/pers.png", {frameWidth: 64, frameHeight: 64});
    }

    create() {
        this.add.text(20,20,"Loading game..");
        this.scene.start("playGame");
    }

}

