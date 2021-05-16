
var monkey , monkey_running;
var bananaImage, obstacleImage,banana, obstacle;
var bananaGroup, obstacleGroup;
var survivalTime;
var score=0;
var ground, survivalTime;
var background1, backImage;


function preload(){
  
  backImage= loadImage("jungle.jpg")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
 
}



function setup() {
  createCanvas(600, 400);
  
  monkey= createSprite(60,370,10,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.18;
  
  background1=createSprite(200,100,700,900)
  background1.addImage(backImage)
  background1.x=background1.width/2
  background1.scale=2;
  
   ground = createSprite(100,380,400000,1);
  ground.shapeColor="black";
  ground.x = ground.width /2;
  
   banana = createSprite(600,120,40,10);
   obstacle = createSprite(600,360,10,40);
  survivalTime=0;
  
  
  //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
  background("brown");
 

  
   background1.depth= banana.depth
  banana.depth= banana.depth + 1;
  
      background1.depth= obstacle.depth
   obstacle.depth= obstacle.depth + 1;


  
     
     
      
    
  ground.velocityX=-5
  background1.velocityX=-6;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
  
    if (bananaGroup.isTouching(monkey)) {
    survivalTime=survivalTime + 2;
      bananaGroup.destroyEach();
  }
  
   if (obstacleGroup.isTouching(monkey)) {
       monkey.scale=0.10;
       obstacleGroup.destroyEach();
    
  }
  
  
 
   switch(survivalTime){
      case 0: monkey.scale=0.10;
              break;
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.14;
              break;
      case 30: monkey.scale=0.16;
              break;
      case 40: monkey.scale=0.18;
              break;
      default: break;
   }
  
  
  monkey.collide(ground);
  ground.visible=false;
  
  background1.depth=  monkey.depth
  monkey.depth= monkey.depth + 1;
  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;    
    }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  food();
  obstacles();
  

  
  drawSprites();
  stroke("black");
  textSize(20);
  fill("white");
  
  survivalTime=Math.ceil(frameCount/getFrameRate())
  text("Survival Time: "+ survivalTime,240,50)
}

function food(){
   if (frameCount % 80 === 0) {
banana = createSprite(500,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.17;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime=500;
     
    
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}


function obstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(600,360,10,40);
   obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);

   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.18;
    obstacle.lifetime=120;
    
  
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);

    if (keyDown(RIGHT_ARROW)){
      camera.position.x= obstacleGroup.x+30;
    }
    if (keyDown(LEFT_ARROW)){
      camera.position.x= obstacleGroup.x-30;
    }
    
    
 }

  
}



