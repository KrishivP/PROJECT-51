var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var bullet, bulletImg, bulletGroup;

var zombieGroup;
var zombiePresent = false;
var n = 5;
var score = 0;



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  shooter_1Img = loadImage("assets/shooter_1.png");
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png");

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);

 player.addImage("eyes open",shooterImg)
 player.addImage("shooting",shooter_shooting)
  player.addImage("standing",shooter_1Img)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
    //creating group for bullets
    bulletGroup = new Group()

    //creating group for zombies    
    zombieGroup = new Group();
    //creating the zombie sprite
    createZombie(n);
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("w")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("s")||touches.length>0){
    player.y = player.y+30
  }
  if(keyDown("a")||touches.length>0){
    player.x = player.x-30
  }
  if(keyDown("d")||touches.length>0){
    player.x = player.x+30
  }


//release bullets and change the image of shooter to shooting position when mouse is clicked
if(mouseDown("leftButton")){ 
  player.changeImage("shooting") 
  createBullets();
}

//player goes back to original standing image once we release the mouse button.
else{
  player.changeImage("standing")
}

//destroy zombie when player touches it
/*if(zombieGroup.collide(bullet)){ 

 for(var i=0;i<zombieGroup.length;i++){           
    if(zombieGroup[i].collide(bullet)){
      zombieGroup[i].destroy();
      bullet.destroy();
    }
 }
}*/
  if(bullet != undefined){
  bullet.overlap(zombieGroup, (collector,collected)=>{collected.destroy()})
  }
  if(zombieGroup.length == 0){zombiePresent = false;}

//calling the function to spawn zombies
createZombie(n);

drawSprites();
  fill("white");
  text(mouseX + "," + mouseY, mouseX,mouseY);
}



//creating function to spawn zombies
function createZombie(n){
  if(!zombiePresent){
    for(var i = 0;i<n;i++){

    //giving random x and y positions for zombie to appear
    var y = random(600,900)
    zombie = createSprite(1650,y,40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)   
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
    }
    zombiePresent = true;
  }
}

  function createBullets(){
    bullet = createSprite(player.x+10, player.y, 10,5);
    bullet.velocityX = 5;
    bullet.lifetime = 400;
  }