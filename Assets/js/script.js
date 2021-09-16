var questionList = [
    {"Question": "What is an element?",
     "a": "Most general base class from which all element objects inherit",
     "b": "tbd",
     "c": "tbd",
     "d": "tbd",
     "Answer": "a"
    },
    {"Question": "What is a method?",
     "a": "Function which an object makes available to its callers",
     "b": "tbd",
     "c": "tbd",
     "d": "tbd",
     "Answer": "a"
    },
    {"Question": "What is a property?",
        "a": "Values associated with a JavaScript object",
        "b": "tbd",
        "c": "tbd",
        "d": "tbd",
        "Answer": "a"
       }
];

var Question = {
    "Question": "What is an element?",
     "a": "Most general base class from which all element objects inherit",
     "b": "tbd",
     "c": "tbd",
     "d": "tbd",
     "Answer": "a"
};

function refreshQuizItem (ndx) {
  var quizItem = questionList[ndx];
  console.log(quizItem.Question);
  var q = document.querySelector("h3");
  console.log(q);
  q.textContent = quizItem.Question;
  var answerList = document.querySelectorAll("li");
  answerList[0].textContent = "1. " + quizItem.a;
  answerList[1].textContent = "2. " + quizItem.b;
  answerList[2].textContent = "3. " + quizItem.c;
  answerList[3].textContent = "4. " + quizItem.d;

}

for (var i = 0; i < questionList.length; i++) {
  refreshQuizItem(i);
}

var h4 = document.querySelector("h4");

function setTime(secondsLeft) {
  h4.textContent = secondsLeft;
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    h4.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      h4.textContent = "EXPIRED";
    }
  }, 1000);
}

setTime(10);