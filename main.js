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
  
    
    //obstacles
    game.load.image('leaf', 'assets/foliage/foliagePack_018.png')
    game.load.image('flower1', 'assets/flowers/flower1.png')
    game.load.image('flower2', 'assets/flowers/flower2.png')
    game.load.image('flower3', 'assets/flowers/flower3.png')
    game.load.image('flower4', 'assets/flowers/flower4.png')
    game.load.image('flowers', 'assets/flowers/flower_spritesheet.png')

    //treats
    game.load.image('cherry', 'assets/flowers/cherry.png')

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
    
    //trees
    game.load.image('trees', 'assets/foliage/tree_spritesheet2.png')
    game.load.image('backgroundTrees', 'assets/foliage/tree_spritesheet2.png')

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
let obstacles;
let flower1;
let flower2;
let flower3;
let flower4;
let flower5;
let leaf;
let jumpTimer = 0;
let treats;
let cherry;
let scoreText;
let score = 0;
let repeatFlower;


function create() {
    // game.time.desiredFps = 30;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 3000, 0);
    game.add.tileSprite(0,0, 3000, 1024, 'sky');
   
    mountains = game.add.tileSprite(0,240,3000, 0, 'mountains')
    mountains.tileScale.y = 2;
    mountains.tileScale.x = 2;
    
    //score
    scoreText = game.add.text(16, 16, 'score:0', {fontSize: '32px',
    fill: '#000' });

    //ground
    platforms = game.add.group();
    platforms.enableBody = true;
    const grass = platforms.create(0, game.world.height -110, 'platform')
    const ground = platforms.create(0, game.world.height -10, 'platform')
    ground.body.immovable = true;
    platform = game.add.tileSprite(0,550,3000, 0, 'green')



    //FLOWERS
    parent = game.add.sprite(-100,530, 'flower1')
    flower2 = game.make.sprite(1000,0, 'flower2')
    flower3 = game.make.sprite(600,0, 'flower3')
    flower4 = game.make.sprite(400,0, 'flower4')
    flower5 = game.make.sprite(800, 0, 'flower1')
    parent.addChild(flower2)
    parent.addChild(flower3)
    parent.addChild(flower4)
    parent.enableBody = true;
    flower2.enableBody = true;
    flower3.enableBody = true;
    flower4.enableBody = true;
    game.physics.enable(parent)

    //repeat flowers
    game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, createFlowers, this)
    // game.physics.enable(flower1)
    // game.physics.enable(flower2)
    // game.physics.enable(flower3)
    // game.physics.enable(flower4)
                            // obstacles = game.add.group();
                            // obstacles.enableBody = true;
                        
                            //     flower1 = obstacles.create(0, game.world.height -50, `flower1`) 
                            //     flower1.position.x = 900;

                            //     flower2 = obstacles.create(0, game.world.height -50, `flower2`) 
                            //     flower2.position.x = 1300;
                            //     flower3 = obstacles.create(0, game.world.height -50, `flower3`) 
                            //     flower3.position.x = 400;
                            //     flower4 = obstacles.create(0, game.world.height -50, `flower4`) 
                            //     flower4.position.x = 1700;
    //repeat Obstacles

    // game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, createFlowers, this)

    //repeat clouds
    game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, createClouds, this);
    clouds = game.add.group();
    // game.world.bringToBottom(clouds)
    clouds.enableBody = true;
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 150)
        let position = randomNumber(-100, 3000)
        let cloud = clouds.create(position, height, `cloud${i}`)
        let speed = randomNumber(15, 25)
        cloud.body.velocity.x = speed;
    }
    
        //trees
        backgroundTrees = game.add.tileSprite(0, -570, 4006, 1200, 'backgroundTrees')
        backgroundTrees.tileScale.y = .5;
        backgroundTrees.tileScale.x = .5;
        game.physics.enable(backgroundTrees)
        trees = game.add.tileSprite(0, -550, 4006, 1200, 'trees')
        trees.tileScale.y = .5
        trees.tileScale.x = .5
        
        game.physics.enable(trees)
    
    // game.camera.follow(fox)
    cursors = game.input.keyboard.createCursorKeys();
    shift = game.input.keyboard.shift;

    //jumping fox
    foxJump = game.add.sprite(153, game.world.height -80, 'jump');
    foxJump.anchor.setTo(0.5);
    game.physics.arcade.enable(foxJump);
    // foxJump.body.bounce.y = 0.1;
    
    foxJump.body.gravity.y = 800;
    foxJump.body.collideWorldBounds = true;
    jump = foxJump.animations.add('jump', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29], 30, false)

    //pause fox
    pauseFox = game.add.sprite(154, game.world.height -80, 'pause')
    pauseFox.anchor.setTo(0.5);

    game.physics.arcade.enable(pauseFox);
    // pauseFox.body.bounce.y = 0.1;
    pauseFox.body.gravity.y = 1000;
    pauseFox.body.collideWorldBounds = true;
    pauseFox.animations.add('pause', [0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        40,41,42,43,44,45,46,47,48,49,
        50,51,52,53,54,], 54, true)

        //fox
    fox = game.add.sprite(153, game.world.height -80, 'fox');
    fox.anchor.setTo(0.5);
    game.physics.arcade.enable(fox);
    // fox.body.bounce.y = 0.1;
    fox.body.gravity.y = 500;
    fox.body.collideWorldBounds = true;
    
    fox.animations.add('fox', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
    // fox.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true);
}


function createClouds() {
//clouds
clouds = game.add.group();
clouds.enableBody = true;
    for (let i = 0; i < 9; i++) {
        let height = randomNumber(0, 90)
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

function createFlowers() {
    if (repeatFlower) {
        console.log('hi', repeatFlower.body.velocity.x)
    }
    repeatFlower = game.add.sprite(-100,530, 'flower1')
    flower2 = game.make.sprite(1000,0, 'flower2')
    flower3 = game.make.sprite(600,0, 'flower3')
    flower4 = game.make.sprite(400,0, 'flower4')
    flower5 = game.make.sprite(800, 0, 'flower1')
    repeatFlower.addChild(flower2)
    repeatFlower.addChild(flower3)
    repeatFlower.addChild(flower4)
    repeatFlower.enableBody = true;
    flower2.enableBody = true;
    flower3.enableBody = true;
    flower4.enableBody = true;
    game.physics.enable(repeatFlower)
    // obstacles = game.add.group();
    // obstacles.enableBody = true;
    // console.log(obstacles)
        // flower1 = obstacles.create(0, game.world.height -50, `flower1`) 
        // flower1.position.x = 1900;

        // flower2 = obstacles.create(0, game.world.height -50, `flower2`) 
        // flower2.position.x = 1300;
        // flower3 = obstacles.create(0, game.world.height -50, `flower3`) 
        // flower3.position.x = 1400;
        // flower4 = obstacles.create(0, game.world.height -50, `flower4`) 
        // flower4.position.x = 2500;
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}



function update() {
    // hitPlatform = game.physics.arcade.collide(fox, platforms)
    // game.physics.arcade.collide(platforms, fox);
    // game.physics.arcade.collide(obstacles, fox);
    game.physics.arcade.overlap(leaf, fox, idle, null, this);
    game.physics.arcade.overlap(fox, flower1, overlap, null, this)
    game.physics.arcade.overlap(fox, flower2, overlap, null, this)
    game.physics.arcade.overlap(fox, flower3, overlap, null, this)
    game.physics.arcade.overlap(fox, flower4, overlap, null, this)
    
    game.physics.arcade.overlap(flower1, fox, overlap, null, this)
    game.physics.arcade.overlap(flower2, fox, overlap, null, this)
    game.physics.arcade.overlap(flower3, fox, overlap, null, this)
    game.physics.arcade.overlap(flower4, fox, overlap, null, this)
    // game.physics.arcade.moveToObject(foxJump, fox, 10, 100);
    // game.physics.arcade.moveToObject(pauseFox, fox, 50, 50)
    fox.body.velocity.x = 0;
    foxJump.body.velocity.y = 0;
    
    // pauseFox.visible = false;
    // foxJump.visible = false;
    // fox.visible = false;
    // console.log('onDown', cursors.up)
    // jumpRequest();
//controls

function actionChecker() {
    let action = 'pause';
    if (cursors.up.isDown) {
        action = 'jumping'
    } else if (cursors.up.isDown && cursors.right.isDown) {
        action = 'jumping'
    } else if (cursors.right.isDown && !cursors.up.isDown) {
        action = 'running'
    } else {
        action = 'pause'
    }
    return action
}

// function runChecker() {
//     let running = false;
//     if (cursors.up.isDown)
// }

if (actionChecker() === 'jumping') {
    jumpRequest()
} else if (actionChecker() === 'running') {
    runRequest()
} else if (actionChecker() === 'pause') {
    idle()
}

}

function stopRequest() {
    idle();
}

function jumpRequest() {
    foxJump.scale.setTo(-1,1)
    foxJump.revive()
    fox.kill()
    pauseFox.kill();
    foxJump.animations.play('jump')
    // foxJump.body.velocity.y = -100
    // fox.body.velocity.y =-100
    // pauseFox.body.velocity.y = -100
}

function runRequest() {
    // console.log(flower1.body.velocity)
    // console.log(flower1.children[1].body.velocity)
    trees.tilePosition.x += -6;
    backgroundTrees.tilePosition.x += -5
    // flower1.body.velocity.x = -100;
    flower2.body.velocity.x = -200;
    flower3.body.velocity.x = -200;
    flower4.body.velocity.x = -200;
    if (jump.isPlaying) {
        foxJump.revive();
    } else {
    fox.revive()
    foxJump.kill()
    pauseFox.kill()
    fox.scale.setTo(-1,1)
    fox.revive()
    fox.animations.play('fox', 30);

    }
}

function idle() {
    //  console.log('reapeat', repeatFlower)
    if (repeatFlower) {
        repeatFlower.body.velocity.x = 0;
    }
    Phaser.Timer.pause = true;
    // console.log(Phaser)
    // parent.body.velocity.x = 0;
    flower2.body.velocity.x = 0;
    flower3.body.velocity.x = 0;
    flower4.body.velocity.x = 0;
    if (jump.isPlaying) {
        // console.log('he jumpin', foxJump.body.position)
        foxJump.revive()
    } else {
        pauseFox.scale.setTo(-1,1)
        pauseFox.revive()
        fox.kill()
        foxJump.kill()
        pauseFox.animations.play('pause', 12)
    }
}

function overlap(sprite, obstacle) {
    obstacle.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function render() {
    
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(fox, 32, 500);
    
    }


