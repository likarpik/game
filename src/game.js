class Game extends Phaser.Scene {
    constructor() {
        super("Game");
        this.bombScale = 0.25;
        this.score = 0;
    }

    preload() {
        this.load.image("background", "assets/Fon_sim1.jpg");
        this.load.image("liany", "assets/liany_2.png");
        this.load.image("ground", "assets/Trava2.png");
        this.load.image("back_2", "assets/back_2.png");
        this.load.spritesheet("player", "assets/pers.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("bomb", "assets/ghost.png", {frameWidth: 314, frameHeight: 296});
        this.load.audio("music", "assets/nightwish.mp3");
        this.load.audio("death", "assets/death.mp3");
    }

    create() {
        //this.physics.resume();
        this.background = this.add.tileSprite(400, 300, 800, 600, "background");
        this.liany = this.add.tileSprite(400, 100, 800, 300, "liany");
        this.physics.add.existing(this.liany);
        this.liany.body.immovable = true;
        this.liany.body.moves = false;
        this.ground = this.add.tileSprite(400, 580, 800, 100, "ground");
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;
        //this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(20, 500, "player");
        this.physics.world.enable(this.player);
        this.physics.world.enable(this.ground);
        this.player.body.gravity.y = 100;
        this.player.getBounds();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2);
        let music = this.sound.add("music");
        music.setLoop(true);
        music.play();
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
        this.player.play("run");


        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //this.physics.add.collider(this.player, this.ground);

        function onEvent1() {
            this.timedEvent1.reset({ delay: Phaser.Math.Between(800,1000), callback: onEvent1, callbackScope: this, loop: true});
            let bomb = this.bombs.create(800, Phaser.Math.Between(100, 540), "bomb");
            bomb.setScale(this.bombScale);
            bomb.setCircle(5);
            bomb.anims.play("boom", true);
            bomb.setBounceY(1.2);
            this.bombs.setVelocityX(Phaser.Math.Between(-800, -500));
        };

        function hit(player){
            this.physics.pause();
            music.stop();
            let death = this.sound.add("death");
            death.play();
            this.timedEvent1.paused = true;
            this.player.setTint(0xff0000);
            this.score = 0;
            this.scene.start("Game");

        };
        
        this.physics.add.collider(this.player, this.bombs, hit, null, this);
        
        this.physics.add.collider(this.player, this.liany);

        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: '#FFFFFF' });
    }

    update = () => {
        this.movePlayerManager();
        this.score += 1;
        this.scoreText.setText('SCORE: ' + this.score);
        this.background.tilePositionX += 5;
        this.liany.tilePositionX += 5;
        this.ground.tilePositionX += 5;
    }

    movePlayerManager=()=>{
        if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(300);
            this.player.flipX = false;
        }
        else if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-400);
            this.player.flipX = true;
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursorKeys.up.isDown && this.player.body.onFloor()){ 
            this.player.setVelocityY(-1200);
        }
    }
} 