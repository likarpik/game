class Game extends Phaser.Scene {
    constructor() {
        super("Game");
        this.bombScale = 0.3;
    }

    preload() {
        this.load.image("background", "assets/Fon_sim1.jpg");
        this.load.image("ground", "assets/Trava.png");
        this.load.spritesheet("player", "assets/pers.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("bomb", "assets/ghost.png", {frameWidth: 314, frameHeight: 296});
    }

    create() {
        this.background = this.add.tileSprite(400, 300, 800, 600, "background");
        this.ground = this.add.tileSprite(400, 575, 800, 100, "ground");
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;
        //this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(20, 526, "player");
        this.physics.world.enable(this.player);
        this.physics.world.enable(this.ground);
        this.player.body.gravity.y = 74;
        this.player.getBounds();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2);
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {start: 1, end: 6}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "boom",
            frames: this.anims.generateFrameNumbers("bomb", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
          });
    
        this.bombs = this.physics.add.group();
        this.timedEvent1 = this.time.addEvent({ delay: 3000, callback: onEvent1, callbackScope: this, loop: true});
        this.add.text(20, 20, "Game..");
        this.player.play("run");


        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //this.physics.add.collider(this.player, this.ground);

        function onEvent1() {
            this.timedEvent1.reset({ delay: Phaser.Math.Between(500,1000), callback: onEvent1, callbackScope: this, loop: true});
            let bomb = this.bombs.create(800, Phaser.Math.Between(100, 540), "bomb");
            bomb.setScale(this.bombScale);
            bomb.setCircle(5);
            bomb.anims.play("boom", true);
            bomb.setBounceY(1.2);
            this.bombs.setVelocityX(Phaser.Math.Between(-1000, -500));
        };

        this.physics.add.collider(this.player, this.bombs);
    }

    update = () => {
        this.movePlayerManager();
        this.background.tilePositionX += 5;
        this.ground.tilePositionX += 5;
    }

    movePlayerManager=()=>{
        if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(200);
            this.player.flipX = false;
        }
        else if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.flipX = true;
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursorKeys.up.isDown){ //&& this.player.body.touching.down){
            this.player.setVelocityY(-1000);
        }
    }
} 