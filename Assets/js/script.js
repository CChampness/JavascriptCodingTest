
var score = 0;
var numList = document.querySelectorAll(".num");
var textList = document.querySelectorAll(".text");
var q = document.querySelector("h3");
var feedback = document.querySelector("#feedback");
// var scoreBox = document.querySelector("#scoreBox");
var answerBox = document.querySelector("#answers");
var initials =  document.querySelector("#initials");
var initialItem = {
  name: "",
  score: 0,
}

function refreshQuizItem (ndx) {
  var quizItem = questionList[ndx];
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

var numOfInitials = 0;
var listOfInitials = [];
var trialList = [];

// This function is called when the "Save" button event fires.
function getInitials() {
  // Read in the stored list, if any
  trialList = JSON.parse(localStorage.getItem("initials"));
  
  // If trialList is null, we would not be able to push to it.
  if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    listOfInitials = trialList;
  }

  // Read our new initials and score
  var initials = document.querySelector("#ini");
  console.log("read in:" + initials.value);
  initialItem.name = initials.value;
  initialItem.score = score;
// CHANGE TO IGNORE CASE!!!
  var found = false;
  for(var i = 0; i < listOfInitials.length && !found; i++) {
    if (initialItem.name === listOfInitials[i].name) {
      found = true;
      if (initialItem.score > listOfInitials[i].score) {
        listOfInitials[i].score = initialItem.score;
      }
      console.log("listOfInitials[i].name " + listOfInitials[i].name);
    }
  }
  if (!found) {
    listOfInitials.push(initialItem);
  }
  localStorage.setItem("initials", JSON.stringify(listOfInitials));
 }

function reportHighScores() {

}

var quizNdx = 0;
var secondsLeft = 60
var gameOn = false;

var h4 = document.querySelector("h4");

function gameOver(timeIsUp) {
  console.log("time is up=" + timeIsUp)
  numList[0].textContent = "";
  numList[1].textContent = "";
  numList[2].textContent = "";
  numList[3].textContent = "";
  textList[0].textContent = "";
  textList[1].textContent = "";
  textList[2].textContent = "";
  textList[3].textContent = "";
  gameOn = false;
  if (timeIsUp) {
    h4.textContent = "TIME EXPIRED";
  } else {
    h4.textContent = "";
  }
  // scoreBox.textContent = "Your final score is " + score;
  secondsLeft = 0;
  console.log("score: " + score);
  feedback.textContent = "";
  q.textContent = "All done. Your final score is " + score;
  initials.style.display = "inline";
  reportHighScores();
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
    // "true" indicates time is up
    if (gameOn) {
      gameOver(true);
    }
  }}, 1000);
}

function scoreAnswer(key, ndx) {
  if (key === questionList[ndx].Answer) {
    score++;
    feedback.textContent = "Correct!"
  } else {
    secondsLeft -= 10;
    feedback.textContent = "Wrong!"
  }
  quizNdx++;
  if (quizNdx == questionList.length) {
    // Time not expired, user answered all questions
    gameOver(false);
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
  document.querySelector("#startButton").style.display = "none";
  gameOn = true;
  refreshQuizItem(quizNdx);
  setTime(secondsLeft);
}