var END=0;
var PLAY=1;
var gameState=PLAY;
var ground,groundImage,chef;
var cheese,olive,pepper,spinach,tomato;
var score=0;
var survival_time=0

function preload(){
    backgroundImage=loadImage("kichen.jpg");
    groundImage=loadImage("ground2.png");
    pizzaslice=loadImage("pizzaslice.png");
    chef=loadImage("stickman.png");
    cheese=loadImage("cheese.png");
    olive=loadImage("olive.png");
    pepper=loadImage("pepper.png");
    spinach=loadImage("spinach.png");
    tomato=loadImage("tomato.png");
}

function setup() {
    createCanvas(1200,400);
    ground=createSprite(600,380,1200,30);
    ground.addImage(groundImage);
    toppingsGroup= new Group();
    slicesGroup= new Group();
    invisible_ground=createSprite(600,390,1200,20)
    invisible_ground.visible=false;
    baker=createSprite(100,350,20,20);
    baker.addImage(chef);
    baker.scale=0.2;
    baker.debug=true;
    baker.setCollider("circle",0,20,100); 
}

function draw() {

    background(backgroundImage);
    textSize(20); 
    text("survival time: "+survival_time,100,30);
    text ("score:"+score, 300,30);

    if(gameState===PLAY){
survival_time=survival_time+Math.round(frameCount/500);
if(slicesGroup.isTouching(baker)){
    score=score+5;
    slicesGroup.destroyEach();
}
        ground.velocityX=-5;
        if (ground.x < 0){
            ground.x = ground.width/2;
        }

        if(keyDown("space")){
            baker.velocityY=-15;
        }
        baker.velocityY=baker.velocityY+0.8;
        

        spawnToppings();
        spawnSlices();

        if(toppingsGroup.isTouching(baker)){
        gameState=END;
        }

    }
    else if(gameState===END){

        baker.velocityY=0;
        ground.velocityX=0;

        toppingsGroup.setVelocityXEach(0);
        slicesGroup.setVelocityXEach(0);
       
        toppingsGroup.setLifetimeEach(-1);
        slicesGroup.setLifetimeEach(-1);

    }
    baker.collide(invisible_ground);
    drawSprites();
}
function spawnToppings(){
    if (frameCount % 100 === 0){
         var toppings = createSprite(displayWidth,360,10,40);
             toppings.velocityX = -5;
        
         //generate random obstacles
         var rand = Math.round(random(1,5));
         switch(rand) {
           case 1: toppings.addImage(tomato);
           toppings.scale=0.1;
                   break;
           case 2: toppings.addImage(olive);
           toppings.scale = 0.1;
                   break;
           case 3: toppings.addImage(cheese);
           toppings.scale = 0.2;
                   break;
           case 4: toppings.addImage(pepper);
           toppings.scale = 0.2;
                   break;
           case 5: toppings.addImage(spinach);
           toppings.scale = 0.2;
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         toppings.lifetime = 400;
        
        //add each obstacle to the group
         toppingsGroup.add(toppings);
      }
}
function spawnSlices(){
    if (frameCount % 235 === 0){
        var slices = createSprite(displayWidth,150,10,40);
        slices.addImage(pizzaslice);
        slices.scale=0.2;
        slices.velocityX = -5; 
        slices.y=Math.round(random(150,300));
        slices.lifetime=400;
        slicesGroup.add(slices);
}
}