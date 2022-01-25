var ship,shipImg;
var enemy1,enemyImg;
var enemy2,enemy2Img,enemyGroup;
var bg,backgroundImg;
var missile,missileImg,missileGroup;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  shipImg=loadImage("The fighter plane.png");
  enemyImg=loadImage("enemy4.png");
  enemy2Img=loadImage("enemy.png");
  backgroundImg=loadImage("bg.png");
  missileImg=loadImage("Missile-Background-PNG.png");
}

function setup(){
  createCanvas(600,600);
  bg=createSprite(300,300,10,10);
  bg.addImage(backgroundImg);
  bg.velocityY=1;

  ship=createSprite(400,400,40,40);
  ship.addImage("ship",shipImg);
  ship.scale=0.1;
  
  missileGroup=new Group();
  enemyGroup=new Group();
}

function draw(){
background(0);
frameRate(30);
if(gameState===PLAY){
//moving background
if(bg.y<400){
  bg.y=300;
}

//creating edge
edges=createEdgeSprites();
   ship.collide(edges);

//controll for ship
if(keyCode===LEFT_ARROW){
  ship.x=ship.x-1;
}
if(keyCode===RIGHT_ARROW){
  ship.x=ship.x+1;
}
//shooting for spaceship 
if(keyCode===32){
  Missiles();
}
Enemy();
drawSprites();
}
}

function Enemy(){
  if(frameCount%100===0){
    enemy2=createSprite(400,100,40,40);
    enemy2.addImage("enemy2",enemy2Img);
    enemy2.velocityY=1;
    enemy2.scale=0.08;
    enemy2.x=Math.round(random(10,500));
    enemy2.y=Math.round(random(50,100));
    enemyGroup.add(enemy2)
    console.log(enemy2.depth);
    if(enemy2.isTouching(missileGroup)){
      enemy2.destroy();
    }
  }
  }

function Missiles(){
   if(frameCount%50===0){
    missile=createSprite(ship.x,ship.y,40,40);
  missile.addImage("missile",missileImg);
  missile.velocityY=-1;
  missile.scale=0.08;
  missile.depth=enemy2.depth
    enemy2.depth=enemy2.depth+1;
    console.log(missile.depth);
    missileGroup.add(missile);
}
}
