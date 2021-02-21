var tower, towerImage

var ghost, ghostImage

var invisibleBlock, invisibleBlockGroup

var door, doorImage, doorGroup

var climber, climberImage, climberGroup

var gameState = "play"

var spookySound

function preload() {
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.play();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 4
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3
  
  
  
  invisibleBlockGroup = new Group();
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background(0);
  if(gameState === "play") {
    
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x - 3
  }
  
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x + 3
  }
  if(keyDown("space")) {
    ghost.velocityY = -10
  }
  
  ghost.velocityY = ghost.velocityY + 0.8
  
  if(tower.y > 400) {
    tower.y = 300
  }
  spawnDoors();
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0
 }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end"
  }
  drawSprites();
  }
  if(gameState === "end") {
    stroke("yellow");
    fill("red");
    textSize(30);
    text("Game Over!", 230, 250);
  }
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.x = Math.round(random(120, 400));
    climber.x = door.x
    invisibleBlock.x = door.x
    door.addImage(doorImage);
    climber.addImage(climberImage);
    door.velocityY = 1
    climber.velocityY = 2
    invisibleBlock.velocityY = 1
    ghost.depth = door.depth
    ghost.depth += 1
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true
  }
}