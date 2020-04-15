//import Bubble from './bubble';

function Bubble(x, y){
  this.x = x;
  this.y = y;
  this.r = 90;
  this.col = color(0,0,155)

  this.display = (main) =>{
      stroke(0);
      fill(this.col);
      if(main){
        ellipse(mouseX, mouseY, this.r, this.r);
      } else   ellipse(this.x, this.y, this.r, this.r);
    
  }

  this.update = (main) =>{
    if(main){
      this.x = mouseX;
      this.y = 89;
    }else
      this.x = x;
      this.y = y;
  }

  this.collide = () =>{
    this.col = color(random(255), random(255), random(255));
  }

}

//circle
let x, y;
let moveSpeed = 3;
let diameter = 20, maxDiameter = 180, minDiameter = 20;

//canvas
let canvasX = 700, canvasY = 400;
let bn;
let mainB;

function setup() {
  createCanvas(canvasX, canvasY);
  
  // Starts in the middle
  x = width/2;
  y = height/2;
  
  bn = [new Bubble(90, 40), new Bubble(140, 60), new Bubble(230, 30)];
  mainB = new Bubble(mouseX, mouseY);
}

function draw() {

  background(255, 255, 255);
  ellipse(mouseX,mouseY,10,10);
 
  // Draw a circle
  stroke(50);
  fill(100);
  //ellipse(x, y, diameter, diameter); 

  let hit = collidePointPoint(x,y,mouseX,mouseY)
  
  moveHandler();
  sizeHandler();

  bn.map((x) => x.update(false));
  bn.map((x) => x.display(false));

  mainB.display(true);
  mainB.update(true);

  for(let i = 0;  i < bn.length; i++){
       
    let distance = int(dist(bn[i].x, bn[i].y, mouseX, mouseY)); 

    if(distance < (mainB.r/2 + bn[i].r/2)){
      bn[i].collide();
    }

  }
  
  //calcCollide(bn);


}

function loguinho(){
  console.table([x,y, d])
    moveSpeed = +document.getElementById("value").value;
}
function moveIncress(){
  moveSpeed += 1;
  console.log("MoveS");
  setTimeout(moveIncress, 2000);
}

function sizeHandler(){

  if(mainB.r <= maxDiameter){
    if(keyIsDown(UP_ARROW)) {
      mainB.r += 5;
    }
  }

  if(diameter >= minDiameter){
    if(keyIsDown(DOWN_ARROW)) {
      diameter -= 5;
    }
  }

}
function moveHandler(){
  
  let radius = diameter/2;
  
  if(keyIsDown(65) && x - radius >= 0){
    x -= moveSpeed;
  }
  if(keyIsDown(68)  && x + radius <= canvasX){
    x += moveSpeed;
  }
  if(keyIsDown(87) && y - radius >= 0){
    y -= moveSpeed;
  }
  if(keyIsDown(83) && y + radius <= canvasY){
    //console.log([x, y]);
    y += moveSpeed;
  }
  
}

function calcCollide(bn){

  for(var i = 0; i < bn.length; i++){
    for(var j = 0; j < bn.length; j++){

      let distance = int(dist(bn[i].x, bn[i].y, bn[j].x, bn[j].y));
                      
      if(i != j && distance < (bn[i].r/2)){
        console.table(distance);
        bn[i].collide();
        bn[j].collide();
      }

    }
  }
  
}
// // API Key for MapboxGL. Get one here:
// // https://www.mapbox.com/studio/account/tokens/
// const key = 'pk.eyJ1IjoibWZmZHNwIiwiYSI6ImNrOTBuY2FjaDAzYnkzZ28ydzB5emg3ZnUifQ._u_XyX0wPMhFcMAwxiI0qw';

// // Options for map
// const options = {
//   lat: 0,
//   lng: 0,
//   zoom: 4,
//   style: 'mapbox://styles/mapbox/traffic-night-v2',
//   pitch: 50,
// };

// // Create an instance of MapboxGL
// const mappa = new Mappa('MapboxGL', key);
// let myMap;

// let canvas;
// let meteorites;

// function setup() {
//   canvas = createCanvas(800, 700).parent('corpo');

//   // Create a tile map and overlay the canvas on top.
//   myMap = mappa.tileMap(options);
//   myMap.overlay(canvas);

//   // Load the data
//   const mapAdress = "https://raw.githubusercontent.com/mffdsp/p5js/master/Meteorite_Landings.csv"
//   meteorites = loadTable(mapAdress, 'csv', 'header');

//   // Only redraw the meteorites when the map change and not every frame.
//   myMap.onChange(drawMeteorites);

//   fill(109, 255, 255);
//   stroke(100);
// }

// // The draw loop is fully functional but we are not using it for now.
// function draw() {
    
// }

// function drawMeteorites() {
//   // Clear the canvas
//   clear();
//     console.log("desenjad")
//   for (let i = 0; i < meteorites.getRowCount(); i += 1) {
//     // Get the lat/lng of each meteorite
//     const latitude = Number(meteorites.getString(i, 'reclat'));
//     const longitude = Number(meteorites.getString(i, 'reclong'));

//     // Transform lat/lng to pixel position
//     const pos = myMap.latLngToPixel(latitude, longitude);
//     // Get the size of the meteorite and map it. 60000000 is the mass of the largest
//     // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
//     let size = meteorites.getString(i, 'mass (g)');
//     size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
//     ellipse(pos.x, pos.y, size, size);
//   }
// }