
// var score = 
var score = 0;
var numList = document.querySelectorAll("#num");
var textList = document.querySelectorAll("#text");
var q = document.querySelector("h3");
var feedback = document.querySelector("#feedback");

function refreshQuizItem (ndx) {
  var quizItem = questionList[ndx];
  var q = document.querySelector("h3");
  q.textContent = quizItem.Question;
  numList[0].textContent = "1. ";
  numList[1].textContent = "2. ";
  numList[2].textContent = "3. ";
  numList[3].textContent = "4. ";
  textList[0].textContent = quizItem.a;
  textList[1].textContent = quizItem.b;
  textList[2].textContent = quizItem.c;
  textList[3].textContent = quizItem.d;
}

var quizNdx = 0;
var secondsLeft = 60
var gameOn = false;

var h4 = document.querySelector("h4");
function gameOver() {
  gameOn = false;
  h4.textContent = "GAME OVER";
  secondsLeft = 0;
  console.log("score: " + score);
}

function setTime() {
  h4.textContent = secondsLeft;
  // Sets interval in variable
  var timerInterval = setInterval(function() {
  secondsLeft--;
  h4.textContent = secondsLeft;
 
  if(secondsLeft <= 0) {
    // Stops execution of action at set interval
    clearInterval(timerInterval);
    // Calls function to end the game
    gameOver();
  }}, 1000);
}

function scoreAnswer(key, ndx) {
  if (key === questionList[ndx].Answer) {
    score++;
    feedback.textContent = "Correct"
    // document.querySelector("#scoreboard").textContent = score;
  } else {
    secondsLeft -= 10;
    feedback.textContent = "Wrong"
  }
  quizNdx++;
  if (quizNdx == questionList.length) {
    gameOver();
  } else {
    refreshQuizItem(quizNdx);
  }
}

document.addEventListener('keydown', catchKey);

function catchKey(e) {
  if (!gameOn) {
    return;
  }
  var keyCode = `${e.code}`;
  var key = keyCode[5];
  if (key === "1") {
    scoreAnswer("a", quizNdx);
  } else if (key === "2") {
    scoreAnswer("b", quizNdx);
  } else if (key === "3") {
    scoreAnswer("c", quizNdx);
  } else if (key === "4") {
    scoreAnswer("d", quizNdx);
  }
}

function startQuiz() {
  gameOn = true;
  refreshQuizItem(quizNdx);
  setTime(secondsLeft);
}