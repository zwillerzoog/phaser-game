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
    game.load.image('green', 'assets/foliage/green.png')
    game.load.spritesheet('fox', 'assets/fox/fox_running.png', 153, 139)
    game.load.spritesheet('jump', 'assets/fox/fox_jump.png', 153, 139)
    game.load.spritesheet('pause', 'assets/fox/fox_pause.png', 153, 139)
}

let fox;
let cursors;
let trees;
let clouds;
let shift;
let foxJump;
let pauseFox;

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2000, 0);
    game.add.tileSprite(0,0, 3000, 1024, 'sky');
    game.add.tileSprite(0,490,3000, 0, 'grass')
    game.add.tileSprite(0,550,3000, 0, 'green')

    trees = game.add.group()
    trees.enableBody = true;
    const tree5 = trees.create(90, game.world.height -300, 'tree5')

    //fox
    fox = game.add.sprite(153, game.world.height -0, 'fox');
    fox.anchor.setTo(0.5);
    game.physics.arcade.enable(fox);
    fox.body.bounce.y = 0.2;
    fox.body.gravity.y = 300;
    fox.body.collideWorldBounds = true;
    
    fox.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    fox.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    
    game.camera.follow(fox)
    cursors = game.input.keyboard.createCursorKeys();
    shift = game.input.keyboard.shift;

    //jumping fox
    foxJump = game.add.sprite(153, game.world.height -0, 'jump');
    foxJump.anchor.setTo(0.5);
    game.physics.arcade.enable(foxJump);
    foxJump.body.bounce.y = 0.6;
    foxJump.body.gravity.y = 100;
    foxJump.body.collideWorldBounds = true;
    foxJump.animations.add('jump', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29], 30, true)

    //pause fox
    pauseFox = game.add.sprite(154, game.world.height -0, 'pause')
    pauseFox.anchor.setTo(0.5);
    game.physics.arcade.enable(pauseFox);
    pauseFox.body.bounce.y = 0.2;
    // pauseFox.body.gravity.y = 300;
    pauseFox.body.collideWorldBounds = true;
    pauseFox.animations.add('pause', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        40,41,42,43,44,45,46,47,48,49,
        50,51,52,53,54,], 54, true)

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
    game.physics.arcade.moveToObject(foxJump, fox, 10, 50);
    game.physics.arcade.moveToObject(pauseFox, fox, 50, 50)
    fox.body.velocity.x = 0;
    pauseFox.visible = false;
    foxJump.visible = false;
    fox.visible = false;
//controls

    //running
    switch (true) {

        case cursors.left.isDown:
            fox.visible = true;
            fox.body.velocity.x = -250;
            fox.animations.play('left');
            fox.scale.setTo(1, 1)
            //jump
            foxJump.scale.setTo(1,1)
            
            //pause
            pauseFox.scale.setTo(1,1)
            
            pauseFox.animations.stop();
            break;

        case cursors.right.isDown:
            fox.visible = true;
            fox.body.velocity.x = 250;
            fox.animations.play('right')
            fox.scale.setTo(-1, 1)
            //jump
            foxJump.scale.setTo(-1,1)
            foxJump.visible = false;
            //pause
            pauseFox.scale.setTo(-1,1)
            pauseFox.visible = false;
            pauseFox.animations.stop();
            break;
        default:
            pauseFox.visible = true;
            foxJump.animations.stop();
            fox.animations.stop();
            pauseFox.animations.play('pause')
            // fox.frame = 6;
         

    }

    //jumping
    switch(true) {
        case cursors.up.isDown:
            fox.visible = false;
            pauseFox.visible = false;
            foxJump.visible = true;
            foxJump.animations.play('jump');
            fox.body.velocity.y = 300;
            foxJump.body.velocity.y=900;
            break;
        // case cursors.up.isDown && cursors.right.isDown:
        //     fox.visible = false;
        //     foxJump.visible = true;
        //     fox.body.velocity.x = 250;
            
        //     break;
        // case cursors.up.isDown && cursors.left.isDown:
        //     fox.visible = false;
        //     foxJump.visible = true;
        //     fox.body.velocity.x = -250;
        //     break;
        default:
            // pauseFox.visible = true;
            foxJump.visible = false;
            foxJump.animations.stop();
            // foxJump.frame = 0;
            pauseFox.animations.play('pause')
    }
}


function render() {
    
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(fox, 32, 500);
    
    }


