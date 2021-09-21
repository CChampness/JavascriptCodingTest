
var score = 0;
var numList = document.querySelectorAll(".num");
var textList = document.querySelectorAll(".text");
var question = document.querySelector("#question");
var feedback = document.querySelector("#feedback");
var answerBox = document.querySelector("#answers");
var instructionBox = document.querySelector("#instructions");
var initials = document.querySelector("#initials");
var iniIn = document.querySelector("#ini");
var hiScores = document.querySelector("#highscores");
var initialItem = {
  name: "",
  score: 0,
}

function refreshQuizItem (ndx) {
  var quizItem = questionList[ndx];
  question.textContent = quizItem.Question;
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
  trialList = JSON.parse(localStorage.getItem("scoreList"));
  
  // If trialList is null, we would not be able to push to it.
  if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    listOfInitials = trialList;
  }

  // Read our new initials and score
  // var iniIn = document.querySelector("#ini");
  initialItem.name = iniIn.value;
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
  localStorage.setItem("scoreList", JSON.stringify(listOfInitials));

  // Clean up the answer box
  initials.textContent = "";
}

function viewHighScores() {
  // Read in the stored list, if any
  trialList = JSON.parse(localStorage.getItem("scoreList"));
  hiScores.style.display = "block";
  // If trialList is null, we would not be able to push to it.
  if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    listOfInitials = trialList;
  } else {
    console.log("No scores listed");
    var node = document.createElement("LI");
    var textnode = document.createTextNode("No scores listed");
    node.appendChild(textnode);
    document.querySelector("#scoreList").appendChild(node);
    return;
  }

  initialItem.name = iniIn.value;
  initialItem.score = score;

  for(var i = 0; i < listOfInitials.length; i++) {
    console.log(listOfInitials[i].name + " " + listOfInitials[i].score);
    var node = document.createElement("li");
    var textnode = document.createTextNode(listOfInitials[i].name + " scored " + listOfInitials[i].score);
    node.appendChild(textnode);
    document.querySelector("#scoreList").appendChild(node);
  }
}

function clearHigh() {
  localStorage.removeItem("scoreList");
}

function goBack () {
  location.reload();
}

var quizNdx = 0;
var secondsLeft = 10
// gameOn is false before the quiz starts,
// when the time is expired,
// or when all questions are answered.
var gameOn = false;

var timeClock = document.querySelector("#timeClock");

function gameOver(timeIsUp) {
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
    timeClock.textContent = "TIME EXPIRED";
  } else {
    timeClock.textContent = "QUIZ COMPLETE";
  }
  
  secondsLeft = 0;
  feedback.textContent = "";
  question.textContent = "All done. Your final score is " + score;
  answerBox.style.display = "none";
  initials.style.display = "inline";
  hiScores.style.display = "block";
  // viewHighScores();
}

function setTime() {
  // This happens once, when the quiz first starts
  timeClock.textContent = secondsLeft;
  // Sets interval in variable
  var timerInterval = setInterval(function() {
  secondsLeft--;
 
  if(secondsLeft > 0) {
    // This happens every second, when the anonymous function gets triggered
    timeClock.textContent = secondsLeft;
  } else {
    // Stops execution of action at set interval
    clearInterval(timerInterval);
    // Calls function to end the game
    // "true" indicates time ran out, time is up
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
  answerBox.style.display = "block";
  instructionBox.style.display = "none";
  gameOn = true;
  refreshQuizItem(quizNdx);
  setTime(secondsLeft);
}