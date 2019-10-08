const xTiles = 5;
const yTiles = 6;
const tileSize= 60;
let gm;
let stoneCounter = 0;

function setup() {
  createCanvas(400, 400);
  gm = new GameMaster(xTiles, yTiles);
  gm.newGame();
}

function mousePressed(e) {
  gm.click(mouseX, mouseY);
}

function draw() {
  background(255);
  fill(0);
  gm.update();
}

