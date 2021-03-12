let osztas = 8;
let szog = 0;
let w = 0;
let h = 0;
let size = 10;
let padding = 10;
let num = 1;

let pozX = [];
let pozY = [];
let pozSize = [];

function setup() {
  w = (windowHeight - padding * 2) / 2;
  h = (windowHeight - padding * 2) / 2;
  let cnv = createCanvas(windowHeight - padding * 2, windowHeight - padding * 2);
  background(0);
  cnv.id('snowflake');
  stroke(100)
  point(w, h);
  szoveg();
}

function draw() {
  //  
}

function windowResized() {
  w = (windowHeight - padding * 2) / 2;
  h = (windowHeight - padding * 2) / 2;
  resizeCanvas(windowHeight - padding * 2, windowHeight - padding * 2);
  translate(-w, -h);
  szoveg();
  stroke(100)
  point(w, h);
  ElementRedraw();
}

function mousePressed() {
  let x = mouseX - w;
  let y = mouseY - h;
  ElementAdd(x, y);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    osztas = osztas + 1;
    ElementRedraw();
  }
  if (keyCode === DOWN_ARROW & osztas > 2) {
    osztas = osztas - 1;
    ElementRedraw();
  }
  if (key === 'q') {
    size = size + 1;
    ElementRedraw();
  }
  if (key === 'a' & size > 1) {
    size = size - 1;
    ElementRedraw();
  }
  if (key === 's') {
    translate(w, h);
    ElementRedraw(1);
    saveCanvas("snowflake-" + num, "jpg");
    num++;
  }
  if (keyCode === 32) {
    clear();
    background(0);
    pozX = [];
    pozY = [];
    pozSize = [];
    szoveg();
  }
  return false;
}

function keyReleased() {
  if (key === 's') {
    ElementRedraw();
  }
}

function ElementAdd(x, y) {
  translate(w, h);
  pozX = append(pozX, x);
  pozY = append(pozY, y);
  pozSize = append(pozSize, size);
  // stroke(255);
  circle(x, y, size);
  ElementRotate(x, y, size);
}

function ElementRotate(x, y, size) {
  stroke(255);
  fill(175, 75);
  szog = (PI * 2) / osztas;
  for (i = 0; i <= PI * 2; i = i + szog) {
    circle(x, y, size);
    rotate(szog);
    circle(x, -y, size);
  }
}

function ElementRedraw(status) {
  clear();
  background(0);
  if (!status) szoveg();
  for (c = 0; c < pozX.length; c++) {
    ElementRotate(pozX[c], pozY[c], pozSize[c]);
  }
}

function szoveg() {
  noStroke();
  textSize(12);
  fill(220, 220, 220);
  textAlign(LEFT);
  text("Tükröződések száma: " + osztas + " (+UP/-Down)", 10, 20);
  text("Kör(+Q/-A):", w - 50, 20);
  text("Save: S", w + 85, 20);
  textAlign(RIGHT);
  text("Újrakezd: SPACE", w * 2 - 10, 20);
  translate(w, h);
  circleNEW();
}

function circleNEW() {
  stroke(255);
  fill(175, 175);
  circle(30, -h + 16, size);
}
