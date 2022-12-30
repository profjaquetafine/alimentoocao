var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Alimente o cão");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //criar o addfood


}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Última Refeição : "+ lastFed%12 + " da tarde/noite", 350,30);
   }else if(lastFed==0){
     text("Última Refeição : 12 AM",350,30);
   }else{
     text("Última Refeição : "+ lastFed + " da manhã", 350,30);
   }
 
  drawSprites();
}

//função para ler o estoque de comida
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//função para atualizasr o estoque de comida e horário da última refeição
function feedDog(){
  dog.addImage(happyDog);
  //Add aqui a função




  
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//função para adicionar comida ao estoque
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
