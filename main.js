'use strict'
console.log('hello')

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('sheet', 'foliagePack_retina.png')
    game.load.image('tree5', 'assets/foliage/005.png')
    game.load.image('cloud1', 'assets/clouds/cloud1.png')
    game.load.image('cloud2', 'assets/clouds/cloud2.png')
    game.load.image('cloud3', 'assets/clouds/cloud3.png')
    game.load.image('cloud4', 'assets/clouds/cloud4.png')
    game.load.image('cloud5', 'assets/clouds/cloud5.png')
    game.load.image('cloud6', 'assets/clouds/cloud6.png')
    game.load.image('cloud7', 'assets/clouds/cloud7.png')
    game.load.image('cloud8', 'assets/clouds/cloud8.png')
    game.load.image('cloud0', 'assets/clouds/cloud9.png')
    game.load.image('sky', 'assets/clouds/sky.png')
    game.load.image('grass', 'assets/foliage/grass.png')
    game.load.spritesheet('fox', 'assets/fox_running.png', 153, 139)
}

let fox;
let cursors;
let trees;
let clouds;

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2000, 0);
    game.add.tileSprite(0,0, 3000, 1024, 'sky');
    game.add.tileSprite(0,500,3000, 10, 'grass')

    trees = game.add.group()
    trees.enableBody = true;
    const tree5 = trees.create(90, game.world.height -300, 'tree5')

    //fox
    fox = game.add.sprite(153, game.world.height -300, 'fox');
    fox.anchor.setTo(0.5);
    game.physics.arcade.enable(fox);
    fox.body.bounce.y = 0.2;
    fox.body.gravity.y = 300;
    fox.body.collideWorldBounds = true;
    fox.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    fox.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    game.camera.follow(fox)
    cursors = game.input.keyboard.createCursorKeys();

    //clouds
    clouds = game.add.group();
    clouds.enableBody = true;
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 150)
        let position = randomNumber(-100, 900)
        let cloud = clouds.create(position, height, `cloud${i}`)
        cloud.body.velocity.x = 20;

    } 
   
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function update() {
    
    fox.body.velocity.x = 0;
    // game.physics.arcade.collide(fox, )

    //controls
    if(cursors.left.isDown) {
        fox.body.velocity.x = -250;
        fox.animations.play('left');
        fox.scale.setTo(1, 1)
    } else if (cursors.right.isDown) {
        fox.body.velocity.x = 250;
        fox.animations.play('right')
        fox.scale.setTo(-1, 1)
    } 
    
    else {
        fox.animations.stop();
        fox.frame = 6;
    }
}

function render() {
    
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(fox, 32, 500);
    
    }


