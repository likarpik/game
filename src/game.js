class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image("background", "assets/bg.jpg");
        this.load.spritesheet("player", "assets/pers.png", {frameWidth: 64, frameHeight: 64});
    }

    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(20, 540, "player");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {start: 1, end: 6}),
            frameRate: 10,
            repeat: -1,
        });
        this.player.play("run");
        this.add.text(20, 20, "Loading Game..");

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.movePlayerManager();
    }

    movePlayerManager=()=>{
        if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(200);
            this.player.flipX = false;
        }
        else if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-260);
            this.player.flipX = true;
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursorKeys.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-600);
        }
    }
} 