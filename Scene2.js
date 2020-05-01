class Scene2 extends Phaser.Scene{
    constructor() {
        super({
            key: 'Scene2'
        })

    }

    preload() {
        this.load.image('background', 'img/Fon.jpg');
        this.load.image('foreground', 'img/Trava.jpg')
        this.load.spritesheet('person', 'img/pers.png', {frameWidth: 64, frameHeight: 64});
    }

    create() {
        this.background = this.add.tileSprite(0,0,'background');
        this.background.setOrigin(0,0);

        this.ground = this.add.tileSprite(0,0,'foreground');
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.background.tilePositionX += 10;
        this.ground.tilePositionX += 10;

        this.person = this.physics.add.sprite(50, 400, 'person');
        this.person.getBounds();
        this.person.setBounce(0.2);
        this.person.setCollideWorldBounds(true);

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'person', frame: 0 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('person', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.person, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(20,20,"Playing game",{font: "25px Arial", fill: "yellow"});
    }

    update() {
        var person = this.person;
        var cursors = this.cursors;
        if (cursors.right.isDown) {
            person.setVelocityX(200);
        }
        else {
            person.setVelocityX(0);
        }
    
    }

}
