var startButton = document.querySelector(".start-button");
var infoContainer = document.querySelector(".quiz-game");
var quizContainer = document.querySelector(".quiz-container");
var shownQuestion = document.querySelector(".questions");
var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");
var button3 = document.querySelector("#button3");
var button4 = document.querySelector("#button4");
var feedbackContainer = document.querySelector(".feedback-container");
var scoreContainer = document.querySelector(".score-container");
var timerCountElement = document.querySelector(".timer-count");
var scoreList = document.querySelector(".score-list");

var quizQuestions = [
  { qtext: "What is Jerome's favorite cat name?", answers: ["Farley", "Taco", "Fish", "Pancake"], correctA: "Farley" },
  { qtext: "How do they get the fortune in the fortune cookie?", answers: ["Stuff it", "Inject it", "Fold it", "Magic?"], correctA: "Fold it" }
];

var currentQuestionIndex = 0;
var currentQuestion = quizQuestions[currentQuestionIndex];
var currentScore = 0;
var scores = [];

var timer;
var timerCount = 30;

function gameStart() {
  startButton.classList.add("hide");
  infoContainer.classList.add("hide");
  quizContainer.classList.remove("hide");

  showQuestion();
  startTimer();
}

function showQuestion() {
  shownQuestion.textContent = currentQuestion.qtext;

  button1.textContent = currentQuestion.answers[0];
  button2.textContent = currentQuestion.answers[1];
  button3.textContent = currentQuestion.answers[2];
  button4.textContent = currentQuestion.answers[3];
}

function checkAnswer(selectedAnswer) {
  var userAnswer = currentQuestion.answers[selectedAnswer];

  if (userAnswer === currentQuestion.correctA) {
    feedbackContainer.textContent = "Correct answer!";
    currentScore += 1;
  } else {
    feedbackContainer.textContent = "Incorrect answer!";
    timerCount -= 5;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    currentQuestion = quizQuestions[currentQuestionIndex];
    showQuestion();
  } else {
    clearInterval(timer);
    handleEndOfGame();
  }
}

function startTimer() {
  timerCountElement.textContent = timerCount;

  timer = setInterval(function () {
    timerCount--;
    timerCountElement.textContent = timerCount;

    if (timerCount <= 0) {
      clearInterval(timer);
      handleEndOfGame();
    }
  }, 1000);
}

function handleEndOfGame() {
  var totalScore = Math.min(currentScore, 2);

  var initials = prompt("Enter your initials for the score:");
  if (initials) {
    var scoreText = initials + " - " + totalScore + "/2";
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = scoreText;
    scoreList.appendChild(scoreEntry);
    var scoresData = localStorage.getItem("scoresData");
    var scoresArray = scoresData ? JSON.parse(scoresData) : [];
    scoresArray.push({ initials: initials, score: totalScore });
    localStorage.setItem("scoresData", JSON.stringify(scoresArray));
  }

  feedbackContainer.textContent = initials + " Quiz finished! Your total score: " + totalScore + "/2";
}

function loadScoresFromStorage() {
  var scoresData = localStorage.getItem("scoresData");
  var scoresArray = scoresData ? JSON.parse(scoresData) : [];

  scoresArray.forEach(function (scoreData) {
    var scoreText = scoreData.initials + " - " + scoreData.score + "/2";
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = scoreText;
    scoreList.appendChild(scoreEntry);
  });
}

function resetQuiz() {
  clearInterval(timer);
  currentQuestionIndex = 0;
  currentQuestion = quizQuestions[currentQuestionIndex];
  timerCount = 30;
  currentScore = 0;

  shownQuestion.textContent = "";
  button1.textContent = "";
  button2.textContent = "";
  button3.textContent = "";
  button4.textContent = "";
  feedbackContainer.textContent = "";
  timerCountElement.textContent = timerCount;
}

button1.addEventListener("click", function () {
  checkAnswer(0);
});

button2.addEventListener("click", function () {
  checkAnswer(1);
});

button3.addEventListener("click", function () {
  checkAnswer(2);
});

button4.addEventListener("click", function () {
  checkAnswer(3);
});

startButton.addEventListener("click", gameStart);

var resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetQuiz);
resetButton.addEventListener("click", function () {
  currentQuestion = quizQuestions[0];
  showQuestion();
  startTimer();
});

loadScoresFromStorage();

var resetScoresButton = document.querySelector(".reset-scores-button");
resetScoresButton.addEventListener("click", resetScores);

function resetScores() {
  localStorage.removeItem("scoresData");
  scoreList.innerHTML = "";
}
