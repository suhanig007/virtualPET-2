//Create variables here
var dog;
var dogNormal, dogHappy;
var database;
var foodS;
var foodStock;
var feed
var addFood
var foodObj, fedTime, lastFed;

function preload() {
  //load images here
  dogNormal = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png")

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)


  dog = createSprite(800,200,150,150)
  dog.scale = (0.15)
  dog.addImage(dogNormal)

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("add the food");
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);

  foodObj = new Food();



}


function draw() {
  background(46, 139, 87)
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed :" + lastFed % 12 + "PM", 350, 30);
  }
  else if (lastFed === 0) {
    text("Last Fed :12 AM", 350, 30)
  }
  else {
    text("Last Fed :" + lastFed + "AM", 350, 30)
  }
  drawSprites()
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function addFoods() {
foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog()
{
  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  {
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
}
