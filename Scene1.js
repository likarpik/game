class Scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "img/bg.jpg");
        this.load.image("person", "img/person_br_color.png");
    }

    create() {
        this.add.text(20,20,"Loading game..");
        this.scene.start("playGame");
    }

}

