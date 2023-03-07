let puntos=[];
let titulo="Semillero de Investigación - Creación en Artes Digitales SIAD";
let facultad="Facultad de Artes y Humanidades";
let convocatoria="Convocatoria 2023-1";
let boton;
let audiofondo;
let cuadro;
let puntero;

function preload(){
  
  
}

function setup() {
  puntero=new Puntero();
  createCanvas(windowWidth, windowHeight);
  	boton = createButton('INSCRÍBETE');
	boton.position(0.4*width,0.65*height);
	boton.mousePressed(formulario);
    boton.size(width*0.2,height*0.065);
    boton.style("font-size",str((width+height)/2*0.03)+"px");
  for (let i = 0; i < 5; i++) {
    puntos.push(new Punto());
  }
  cuadro=new Cuadros();
}
//****************************
function draw() {
  //background(110);
  cuadro.show();
  fill(0,5);
  rectMode(CORNER);
  rect(0,0,width,height);
  puntero.show();
  texto();
  for (let i = 0; i < puntos.length; i++) {
    puntos[i].show();
  }
  pintarLineas();
}

//************************************
class Puntero{
 constructor(){
   this.r=random(100,255);
   this.g=random(100,255);
   this.b=random(100,255);
   this.al=random(50,100);
   this.scale=width*0.3;
   this.px=width*0.5;
   this.py=height*0.9;
   
 }
  show(){
    noStroke();
    push();
    if(mouseIsPressed){
      this.px=mouseX;
      this.py=mouseY;
    }
      translate(this.px,this.py);
      fill(this.r,this.g,this.b,this.al);
      circle(0,0,this.scale+5*sin(0.1*frameCount));
    pop();
  }
}


class Cuadros{
  constructor(){

    this.px=width/2;
    this.py=height/2;
    this.vx=random(-2,2);
    this.vy=random(-2,2);
    this.seedx=0.01;
    this.seedy=0.001;
    this.angle=0;
    this.r=random(255);
    this.g=random(255);
    this.b=random(255);
    this.al=random(100);
    this.scale=10;
    this.inc=2;
    
  }
  show(){

    this.px+=0;//noise(this.seedx);
    this.py+=0;//noise(this.seedy);
    this.seedx+=0.01;
    this.seedy=0.02;
    push();
      translate(this.px,this.py);
      rotate(radians(this.vx));
      this.vx+=noise(this.seedx)*16;
      this.vy+=noise(this.seedy)*16;
      this.al+=noise(this.seedx)*255;
      noFill();
      stroke(this.r,this.g,this.b,this.al)
      //scale(this.scale);
      rectMode(CENTER);
      rect(0,0,this.scale,this.scale)
      this.scale+=this.inc;
    if(this.scale>(width+height)/2||this.scale<0)this.inc=-this.inc
    pop();
  }
}

function texto(){
  fill(50,50);
  rectMode(CENTER);
  rect(0.5*width,0.5*height,0.54*width,0.4*height,20);
  fill(255);
  textSize((width+height)/2*0.038);
  text(titulo,0.49*width,0.59*height,0.5*width,0.5*height);
  if(mouseIsPressed)print(mouseX/width+" : "+mouseY/height);
  text(facultad,0.49*width,0.85*height,0.5*width,0.7*height);
  text(convocatoria, 0.49*width,0.85*height+3*sin(0.08*frameCount),0.5*width,0.5*height);
}
//******************************
function formulario() {
	window.open('https://forms.office.com/r/6deT3UsYp4');
}
//******************************
function pintarLineas(){
  for (let i = 0; i < puntos.length; i++) {
    for(let j=i+1;j<puntos.length;j++){
      let v1=createVector(puntos[i].px,puntos[i].py);
      let v2=createVector(puntos[j].px,puntos[j].py);
      let distancia=dist(v1.x,v1.y,v2.x,v2.y)
      if(distancia<width){
        stroke(255,150);
       line(v1.x,v1.y,v2.x,v2.y); 
      }
    }
    puntos[i].show();
  }
}
//********************************
class Punto{
  
  constructor(){
    this.px=random(width);
    this.py=random(height);
    this.vx=random(2,2);
    this.vy=random(-2,2);
    this.size=random(5,15);
    this.colorR=random(50,254);
    this.colorG=random(50,254);
    this.colorB=random(50,254);
    this.alpha=map(this.size, 5,15,10,100);
    this.ax=random(-1,1);
    this.ay=random(-1,1);
    this.vmax=5;
    this.amax=0.05;
    this.sounds=[];
    for(let i=0;i<4;i++){
      this.sounds[i]=loadSound("nota"+(i)+".mp3"); 
    }
  }
  
  show(){
    fill(this.colorR,this.colorG, this.colorB,this.alpha);
    noStroke();
    circle( this.px,this.py,this.size);
    this.px+=this.vx;
    this.py+=this.vy;
    if(this.px<=0||this.px>=width){
      if(this.px<0)this.px=10;
      if(this.px>width)this.px=width-10;
      if(this.vx>0)this.vx--;
      if(this.vx<0)this.vx++;
      this.vx--;
      this.vx*=-1;
      let iSound=int(random(4));
      this.sounds[iSound].play();
    }
    if(this.py<=0||this.py>=height){
      if(this.py<0)this.py=10;
      if(this.py>height)this.py=height-10;
      if(this.vy>0)this.vy--;
      if(this.vy<0)this.vy++;
      this.vy*=-1;
      this.sounds[int(random(4))].play();
    }
    this.vx-=this.ax;
    this.vx=constrain(this.vx,-this.vmax,this.vmax);
    this.vy-=this.ay;
    this.vy=constrain(this.vy,-this.vmax,this.vmax);
    this.ax=this.px-mouseX;
    this.ax=constrain(this.ax,-this.amax,this.amax);
    this.ay=this.py-mouseY;
    this.ay=constrain(this.ay,-this.amax,this.amax);
  }
}
