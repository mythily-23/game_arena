let brd;
let brdwid=340;
let brdhgt=640;
let ctxt;
//bird
let birdwid=34;
let birdhgt=24;
let birdx= brdwid/8;
let birdy=brdhgt/2;
let bird={
    x:birdx,
    y:birdy,
    width:birdwid,
    height:birdhgt
}
//pipe
let pipearray=[];
let pipewid=64;
let pipehgt=512;
let pipex=brdwid;
let pipey=0;
let topimg;
let botimg;

let velocityX = -2; //pipes moving left speed
let velocityY=0;
let grav=0.4;

let gameOver = false;
let score = 0;

window.onload = document.addEventListener("keydown",start);
window.onload= function display(){
    brd=document.getElementById("board");
    brd.height=brdhgt;
    brd.width=brdwid;
    ctxt=brd.getContext("2d");

    birdimg= new Image();
    birdimg.src="./flappybird.png";
    birdimg.onload = function(){
        ctxt.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    }

}
function start(){
    var x=document.getElementById("start");
    x.style.display="none";
    document.getElementById("inst").style.display="block";
    document.removeEventListener("keydown",start);
    brd=document.getElementById("board");
    brd.height=brdhgt;
    brd.width=brdwid;
    ctxt=brd.getContext("2d");

    birdimg= new Image();
    birdimg.src="./flappybird.png";
    birdimg.onload = function(){
        ctxt.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
          }

    topimg= new Image();
    topimg.src="./toppipe.png";
    botimg=new Image();
    botimg.src="./bottompipe.png";

    requestAnimationFrame(update);
    
    setInterval(placepipe,1500);
    document.addEventListener("keydown", moveBird);

}
function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    ctxt.clearRect(0,0,brd.width,brd.height);
    //bird
    ctxt.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    velocityY+=grav;
    bird.y = Math.max(bird.y + velocityY, 0); 

    if (bird.y > brd.height) {
        gameOver = true;
    }
    for (let i = 0; i < pipearray.length; i++) {
        let pipe = pipearray[i];
        pipe.x += velocityX;
        ctxt.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; 
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }
    while (pipearray.length > 0 && pipearray[0].x < -pipewid) {
        pipearray.shift();
      }

    ctxt.fillStyle = "white";
    ctxt.font="45px sans-serif";
    ctxt.fillText(score, 5, 45);

    if (gameOver) {
        ctxt.fillText("GAME OVER", 5, 90);
        ctxt.font="18px sans-serif"
        ctxt.fillText("press SPACE or UPARROW or to restart ",6,320);
    }
}
function placepipe(){
    if (gameOver) {
        return;
    }

    let randomPipeY = pipey - pipehgt/4 - Math.random()*(pipehgt/2);
    let open=brd.height/4;
    let topPipe={
        img:topimg,
        x:pipex,
        y:randomPipeY,
        width:pipewid,
        height:pipehgt,
        passed:false
    }
    pipearray.push(topPipe);
    let bottomPipe={
        img:botimg,
        x:pipex,
        y:randomPipeY+pipehgt+open,
        width:pipewid,
        height:pipehgt,
        passed:false
    }
  
    pipearray.push(bottomPipe);
}
function moveBird(e) {
        
    
    if (e.code == "Space" || e.code == "ArrowUp" ) {
        //jump
        velocityY = -6;
    
    if (gameOver) {
        bird.y = birdy;
        pipearray = [];
        score = 0;
        gameOver = false;
    }
}
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&  a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  a.y + a.height > b.y;   
}
