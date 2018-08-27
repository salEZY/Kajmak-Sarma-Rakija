let startBtn = document.querySelector('#startGame');
let gameWindow = document.querySelector('.game');
let rules = document.querySelector('.holder');
let desc = document.querySelector('#desc');
let compChoice = document.querySelector('#compChoice');
let scoreImg = document.querySelector('#scoreImg');
let weapons = ['img/rakija.jpg', 'img/sarma.jpg', 'img/kajmak.jpg'];
let winImg = ['img/win1.jpg','img/win2.jpg', 'img/win3.jpg','img/win4.jpg', 'img/win5.jpg'];
let loserImg = ['img/lose1.jpg','img/lose2.jpg', 'img/lose3.jpg', 'img/lose4.jpg', 'img/lose5.jpg'];
let rakija = document.querySelector('#rakija').getAttribute('src');
let sarma = document.querySelector('#sarma').getAttribute('src');
let kajmak = document.querySelector('#kajmak').getAttribute('src');
let compAtt;
let move;
let p1 = document.querySelectorAll('.btns');
let result = document.querySelector('.result');
let tryAgain = document.querySelector('#tryAgain');
let clockSpan = document.querySelector("#clock");
let mainMenu = document.querySelector('#backToMain');
let welcome = document.querySelector('.welcome');

let audio;

startBtn.addEventListener('click', startGame);
tryAgain.addEventListener('click', retry);
mainMenu.addEventListener('click', backToMenu);

function startGame() {
  audio  = new Audio();
  audio.src = "img/sumadijo.mp3";
  audio.volume = 0.1;
  audio.loop = 1;
  audio.play();

  desc.style.display = "none";
  rules.style.display = "none";
  startBtn.style.display = "none";
  gameWindow.style.display = "block";
  welcome.style.display = "none";
  p1.forEach(function(e){
    e.addEventListener('click', pick);
  } 
  )
}

function gamePlay(){
  computerMove();
  scoring();
  p1.forEach(function(e){
    e.removeEventListener('click', pick)
  } 
  )
}

function scoring(){
	if((move == "rakija" && compAtt == "img/sarma.jpg") ||(move == "kajmak" && compAtt == "img/rakija.jpg") ||(move =="sarma" && compAtt == "img/kajmak.jpg")){
    result.style.color = "green";
		result.innerHTML = "VICTORY";
    winImage();
	}else if((move == "rakija" && compAtt == "img/kajmak.jpg") || (move == "kajmak" && compAtt == "img/sarma.jpg") || (move == "sarma" && compAtt == "img/rakija.jpg")){
    result.style.color = "red";
		result.innerHTML = "DEFEAT";
    loserImage();
	}else{
    result.style.color = "black";
		result.innerHTML = "DRAW";
    scoreImg.setAttribute('src', "img/draw.jpg")
	}
  tryAgain.style.display = "block";
  mainMenu.style.display = "block";
}

function computerMove() {
  let compCalc = Math.floor(Math.random() * weapons.length);
  let compMove = weapons[compCalc];
  compChoice.setAttribute('src', compMove);
  compAtt = compChoice.getAttribute('src');
}

function pick () {
  this.style.border = "4px solid red"; 
  move = this.id;
  this.style.opacity = "1";
  gamePlay();
}

function retry () {
  result.innerHTML = "";
  scoreImg.setAttribute('src', "");
  compChoice.setAttribute('src', "img/question.png");
  p1.forEach(function(e){
    tryAgain.style.display = "none";
    mainMenu.style.display = "none";
    e.style.border = "1px solid black";
    e.style.opacity = "0.3";
    e.addEventListener('click', pick);
  } 
  )
}

function backToMenu() {
  audio.pause();
  result.innerHTML = "";
  scoreImg.setAttribute('src', "");
  compChoice.setAttribute('src', "img/question.png");
  desc.style.display = "block";
  rules.style.display = "block";
  startBtn.style.display = "block";
  gameWindow.style.display = "none";
  welcome.style.display = "block";
  p1.forEach(function(e){
    tryAgain.style.display = "none";
    mainMenu.style.display = "none";
    e.style.border = "1px solid black";
    e.style.opacity = "0.3";
    e.addEventListener('click', pick);
  } 
  )
}

function winImage() {
  let winImgCalc = Math.floor(Math.random() * winImg.length);
  let winImgChoice = winImg[winImgCalc];
  scoreImg.setAttribute('src', winImgChoice);
}

function loserImage() {
  let loserImgCalc = Math.floor(Math.random() * loserImg.length);
  let loserImgChoice = loserImg[loserImgCalc];
  scoreImg.setAttribute('src', loserImgChoice);
}

function time () {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  if (h < 10) {
    h = `0${h}`;
  }
  if (m < 10) {
  m = `0${m}`;
  }
  if (s < 10) {
  s = `0${s}`;
  }

  clockSpan.innerHTML = `${h}:${m}:${s}`;
}
time();
setInterval(time, 1000);