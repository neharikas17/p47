const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var PLAY = 1
var END = 0
var gameState = PLAY

var engine, world;
var bg;

function preload(){

mountainImage = loadImage("mountain1.jpg")
witchImage = loadImage("witch.png")
princessImage = loadImage("princess.png")
sledImage = loadImage("sled.png")
snowmanImage = loadImage("snowman.png")

}



function setup(){
    createCanvas(700,700);
    engine = Engine.create();
    world = engine.world;
    mountain = createSprite(350,350)
    mountain.addImage(mountainImage)
    mountain.velocityY = 3
    a = createSprite(350,400,20,20)
    a.addImage(princessImage)
    a.scale = 0.4
    witch = createSprite(400,600)
    witch.addImage(witchImage)
    witch.scale = 0.2
   snowmanGroup = new Group()
   sledGroup = new Group()
}

function draw(){
    Engine.update(engine);
if(gameState === PLAY){
    if(mountain.y>700){
        mountain.y = 350
    } 
    if(keyDown("space")){
        a.velocityY = a.velocityY-0.3
    }
    a.velocityY = a.velocityY+0.2
    
    if(keyDown("right_arrow")){
        a.x = a.x+2
    }
    if(keyDown("left_arrow")){
        a.x = a.x-2
    } 
    witch.x = a.x + 70;
    //witch.y = 600
    witch.velocityY = - 0.5
    if(witch.y < 300){
        witch.y = 550
    }
        
    spawnSnowman()
    spawnSled()
    

    if(a.isTouching(snowmanGroup)){
        gameState = END
    }
    if(a.isTouching(sledGroup)){
        gameState = END
    }
    if(a.isTouching(witch)){
        gameState = END
    }
    if(a.y > 700 || a.y<0){
        gameState = END
    }
    if(a.x>700 || a.x<0){
        gameState = END
    }
    drawSprites()
}
 
else if(gameState === END){
    a.destroy()
    mountain.destroy()
    witch.destroy()
    sledGroup.destroyEach()
    snowmanGroup.destroyEach()
    background("black")
    fill("green")
    textSize(30)
    text("Game Over", 275,350)
    text("Press R to Restart", 250,450)
    if(keyDown("r")){
        gameState = PLAY
    }
}



}
function spawnSnowman(){
    if(frameCount % 300 === 0){
       snowman = createSprite(Math.round(random(50,700)),0,20,20)
       snowman.addImage(snowmanImage)
        snowman.velocityY = 2
        snowman.scale = 0.15
     snowmanGroup.add(snowman)
    }
}

function spawnSled(){
    if(frameCount % 150 === 0){
        sled = createSprite(Math.round(random(50,700)),0,20,20)
        sled.addImage(sledImage)
        sled.velocityY = 2
        sled.scale = 0.2
        sledGroup.add(sled)
    }
}