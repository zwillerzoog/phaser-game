'use strict'
console.log('hello')

let state = {
    fox: {
        run: false,
        jump: false,
        pause: true
    }
}


let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('sheet', 'foliagePack_retina.png')
    //trees
    game.load.image('trees', 'assets/foliage/tree_spritesheet.png')
    game.load.image('backgroundTrees', 'assets/foliage/tree_spritesheet.png')
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
    game.load.image('mountains', 'assets/clouds/pointy_mountains.png')
    game.load.image('grass', 'assets/foliage/grass.png')
    game.load.image('green', 'assets/foliage/green.png')
    game.load.image('platform', 'assets/foliage/green_platform.png')
    
    //fox
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
let mountains;
let backgroundTrees;
let platforms;
let platform;
let hitPlatform;
let jump;
let foxCanJump;



function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 3000, 0);
    game.add.tileSprite(0,0, 3000, 1024, 'sky');
   
    mountains = game.add.tileSprite(0,240,3000, 0, 'mountains')
    mountains.tileScale.y = 2;
    mountains.tileScale.x = 2;
    // game.add.tileSprite(0,490,3000, 0, 'grass')
    
    
    platforms = game.add.group();
    platforms.enableBody = true;
    const grass = platforms.create(0, game.world.height -110, 'platform')
    const ground = platforms.create(0, game.world.height -10, 'platform')
    ground.body.immovable = true;
    // ground.fixedToCamera = true;
//    grass.fixedToCamera = true;

    platform =game.add.tileSprite(0,550,3000, 0, 'green')

    // platform.enableBody = true;
    // platform.body.immovable = true;
    // platforms = game.add.group();
    // platforms.enableBody = true;
    // const ground = platforms.create()

    
    backgroundTrees = game.add.tileSprite(0, -625, 3000, 1200, 'backgroundTrees')
    backgroundTrees.tileScale.y = .5;
    backgroundTrees.tileScale.x = .5;
    game.physics.enable(backgroundTrees)
    trees = game.add.tileSprite(0, -590, 3000, 1200, 'trees')
    trees.tileScale.y = .5
    trees.tileScale.x = .5
    game.physics.enable(trees)
    
    game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, createClouds, this);
    clouds = game.add.group();
    clouds.enableBody = true;
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 150)
        let position = randomNumber(-100, 3000)
        let cloud = clouds.create(position, height, `cloud${i}`)
        let speed = randomNumber(15, 25)
        cloud.body.velocity.x = speed;
    // } else {
    //     cloud.body.velocity = 5 * i;
    // }
    // cloud2.body.velocity.x = 20;
    // let overlap = game.physics.arcade.overlap(cloud, )
    // if(cloud.body.collideWorldBounds) {
    //     console.log('yup')
    // }

}
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();
    // createTrees();



    // trees = game.add.group()
    // trees.enableBody = true;
    // //add offset to trees
    // //make variety, not randomness
    // //one tree every ....100px or whatever
    // // blend in some randomness maybe?
    // let tree;
    // for (let i = 6; i < 17; i++) {
    //     let position = randomNumber(0, 3000);
    //     const tree = trees.create(position, game.world.height -300, `tree${i}`)
        
    //}

    //add parallax scrolling to tree layers!!!!
    //scale sprite up or down
    //foreground where the trees are in front of the fox
    // const tree5 = trees.create(90, game.world.height -300, 'tree5')
    // const tree6 = trees.create(300, game.world.height -300, 'tree6')

    //fox
    fox = game.add.sprite(153, game.world.height -80, 'fox');
    fox.anchor.setTo(0.5);
    game.physics.arcade.enable(fox);
    // fox.body.bounce.y = 0.1;
    fox.body.gravity.y = 500;
    fox.body.collideWorldBounds = true;
    
    fox.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    fox.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    
    game.camera.follow(fox)
    cursors = game.input.keyboard.createCursorKeys();
    shift = game.input.keyboard.shift;

    //jumping fox
    foxJump = game.add.sprite(153, game.world.height -80, 'jump');
    foxJump.anchor.setTo(0.5);
    game.physics.arcade.enable(foxJump);
    // foxJump.body.bounce.y = 0.1;
    
    foxJump.body.gravity.y = 500;
    foxJump.body.collideWorldBounds = true;
    jump = foxJump.animations.add('jump', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29], 30, false)

    //pause fox
    pauseFox = game.add.sprite(154, game.world.height -80, 'pause')
    pauseFox.anchor.setTo(0.5);
    game.physics.arcade.enable(pauseFox);
    // pauseFox.body.bounce.y = 0.1;
    pauseFox.body.gravity.y = 500;
    pauseFox.body.collideWorldBounds = true;
    pauseFox.animations.add('pause', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        40,41,42,43,44,45,46,47,48,49,
        50,51,52,53,54,], 54, true)
}

function createClouds() {
//clouds
clouds = game.add.group();
clouds.enableBody = true;
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 150)
        let position = randomNumber(-2000, -200)
        let cloud = clouds.create(position, height, `cloud${i}`)
        let speed = randomNumber(15, 25)
        cloud.body.velocity.x = speed;
    } 
}

function createTrees() {
    trees = game.add.group()
    trees.enableBody = true;
    //add offset to trees
    //make variety, not randomness
    //one tree every ....100px or whatever
    // blend in some randomness maybe?
    let tree;
    for (let i = 6; i < 17; i++) {
        let random = randomNumber(0, 900);
        let position = random * i;
        const tree = trees.create(position, game.world.height -300, `tree${i}`)
        
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function update() {
    hitPlatform = game.physics.arcade.collide(fox, platforms)
    game.physics.arcade.collide(platforms, fox);
    game.physics.arcade.moveToObject(foxJump, fox, 10, 100);
    game.physics.arcade.moveToObject(pauseFox, fox, 50, 50)
    fox.body.velocity.x = 0;
    foxJump.body.velocity.y =0;
    pauseFox.visible = false;
    foxJump.visible = false;
    fox.visible = false;
    
    // jumpRequest();
//controls

    //running
    switch (true) {

        // case cursors.left.isDown:
        //     fox.visible = true;
        //     // fox.body.velocity.x = -250;
            
        //     fox.animations.play('left');
        //     fox.scale.setTo(1, 1)
        //     //jump
        //     foxJump.scale.setTo(1,1)
        //     //pause
        //     pauseFox.scale.setTo(1,1)
        //     pauseFox.animations.stop();
        //     //trees
        //     trees.tilePosition.x += 10;
        //     backgroundTrees.tilePosition += 2;
        //     //clouds
        //     // clouds.position.x += 10;
        //     break;
        case cursors.right.isDown && cursors.up.isDown:
        console.log('big whoop')
        fox.visible = false;
        fox.animations.stop()
        foxJump.visible = true;
        break;
        case cursors.right.isDown && cursors.up.isUp:
            fox.visible = false;
            foxJump.visible = true;
            // foxJump.visible = true;
            // fox.body.velocity.x = 250;
            fox.animations.play('right')
            fox.scale.setTo(-1, 1)
            //jump
            foxJump.scale.setTo(-1,1)
            // foxJump.visible = false;
            //pause
            pauseFox.scale.setTo(-1,1)
            // pauseFox.visible = false;
            pauseFox.animations.stop();
            //trees
            trees.tilePosition.x += -8;
            backgroundTrees.tilePosition.x += -2;
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
            pauseFox.animations.play('pause', 15)
            // fox.frame = 6;
    }
    let jumping;
    //jumping
    switch(true) {
        case cursors.up.isDown:
            // foxCanJump = true;
            // console.log(fox)
            jumpRequest();
                            // fox.visible = false;
                            // pauseFox.visible = false;
                            // foxJump.visible = true;
                            // jumping = true;
            //jumping is true
        // if (jumping)
        //  foxJump.animations.play('jump');
            //;look into phaser interrupts
            //state machine
            //THIS doesn't work. Why?
            //inside a rectangle
            //3 parts to jump
        // foxJump.body.velocity.y = -100;
            // fox.body.velocity.y = -100;
            //fall look up phaser physics for gravity
            //falling animation is midair idling
            break;
        default:
            // pauseFox.visible = true;
            // foxCanJump = false;
            // foxJump.visible = false;
            // foxJump.animations.stop();
            // foxJump.frame = 0;
            pauseFox.animations.play('pause', 15)
    }

}

function jumpRequest() {
    // if (jump.isFinished) {
    //     //already jumping
    //     console.log('finishedjumping! it returned')
    //     // console.log(jump, 'jump from if')
    //     // console.info(jump);
    //     return;
    // }

    // if (jump.isPlaying) {
    //     //already jumping
    //     console.error('already jumping!')
    //     // console.log(jump, 'jump from if')
    //     // console.info(jump);
    //     return;
    // }

    //what is character doing? can he jump?
    //THEN jump === true
    
    // console.log(fox.body.touching.down)
    // if (cursors.up.isDown && fox.body.touching.down && hitPlatform) {
        // fox.visible = false;
        // pauseFox.visible = false;
        // foxJump.visible = true;
        // let shouldLoop = false;
        // console.log(jump.currentFrame.index)
        // jump.currentFrame.index = 0;
            // console.log('yup he can')
            // console.log(foxCanJump)
        //    jump.isFinished = false;
        // console.log('jump, ', jump)
        // if (!jump.isFinished) {
            // fox.visible = false;
            // pauseFox.visible = false;
            foxJump.visible = true;
            fox.visible = false;
            // console.log(jump.currentFrame.index)
            // jump.next(10)

            // jump.onComplete.add(stopJump)
            foxJump.animations.play('jump');


}

function stopJump() {
    console.log('hey')
    pauseFox.visible = true;
    foxJump.animations.stop('jump', 0)
    jump.isFinished = true;
}




function collisionHandler(object) {
    if (object.body.collideWorldBounds) {
        console.log('hey it worked!!')
    }
}


function render() {
    
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(fox, 32, 500);
    
    }


