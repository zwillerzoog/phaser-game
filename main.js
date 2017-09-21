'use strict'
console.log('hello')


let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('sheet', 'foliagePack_retina.png')
    //trees
    game.load.image('tree5', 'assets/foliage/005.png')
    game.load.image('tree6', 'assets/foliage/foliagePack_006.png')
    game.load.image('tree7', 'assets/foliage/foliagePack_007.png')
    game.load.image('tree8', 'assets/foliage/foliagePack_008.png')
    game.load.image('tree9', 'assets/foliage/foliagePack_009.png')
    game.load.image('tree10', 'assets/foliage/foliagePack_010.png')
    game.load.image('tree11', 'assets/foliage/foliagePack_011.png')
    game.load.image('tree12', 'assets/foliage/foliagePack_012.png')
    game.load.image('tree13', 'assets/foliage/foliagePack_013.png')
    game.load.image('tree14', 'assets/foliage/foliagePack_014.png')
    game.load.image('tree15', 'assets/foliage/foliagePack_015.png')
    game.load.image('tree16', 'assets/foliage/foliagePack_016.png')
    game.load.image('tree17', 'assets/foliage/foliagePack_017.png')
    game.load.image('tree18', 'assets/foliage/foliagePack_018.png')
    game.load.image('tree19', 'assets/foliage/foliagePack_019.png')
    game.load.image('tree20', 'assets/foliage/foliagePack_020.png')
    game.load.image('tree21', 'assets/foliage/foliagePack_021.png')




    //clouds
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
    //add offset to trees
    //make variety, not randomness
    //one tree every ....100px or whatever
    // blend in some randomness maybe?
    for (let i = 6; i < 17; i++) {
        let position = randomNumber(0, 3000);
        const tree = trees.create(position, game.world.height -300, `tree${i}`)
    }
    //add parallax scrolling to tree layers!!!!
    //scale sprite up or down
    //foreground where the trees are in front of the fox
    // const tree5 = trees.create(90, game.world.height -300, 'tree5')
    // const tree6 = trees.create(300, game.world.height -300, 'tree6')

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
    
    foxJump.body.gravity.y = 300;
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
    //use collide world bounds to see when the clouds leave the world
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 150)
        let position = randomNumber(-100, 900)
        let cloud = clouds.create(position, height, `cloud${i}`)
        //if (cloud(i) has left/collided the world) {
        // when cloud has left, spawn another
        //} 
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
        //case idle elapsed time:
        default:
            pauseFox.visible = true;
            // foxJump.animations.stop();
            fox.animations.stop();
            //change sprite sheet png
            //run animation and pause
            //two states
            //if left idle for 30 seconds, play twitch 
            //maybe like a timeout?
            pauseFox.animations.play('pause')
            // fox.frame = 6;
    }
    let jumping;
    //jumping
    switch(true) {
        case cursors.up.isDown:
            jumpRequest();
            fox.visible = false;
            pauseFox.visible = false;
            foxJump.visible = true;
            jumping = true;
            //jumping is true
            if (jumping)
            foxJump.animations.play('jump');
            //;look into phaser interrupts
            //state machine
            //THIS doesn't work. Why?
            //inside a rectangle
            //3 parts to jump
            // foxJump.body.velocity.y = -300;
            // fox.body.velocity.y = -100;
            //fall look up phaser physics for gravity
            //falling animation is midair idling
            break;
        default:
            // pauseFox.visible = true;
            foxJump.visible = false;
            foxJump.animations.stop();
            // foxJump.frame = 0;
            pauseFox.animations.play('pause')
    }

}

function jumpRequest() {
    //what is character doing? can he jump?
    //THEN jump === true
}


function render() {
    
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(fox, 32, 500);
    
    }


