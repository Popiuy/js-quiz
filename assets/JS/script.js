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

var quizQuestions = [
  { qtext: "What is Jermome's favorite cat name?", answers: ["Farley", "Taco", "Fish", "Pancake"], correctA: "Farley" },
  { qtext: "How do they get the fortune in the fortune cookie?", answers: ["Stuff it", "Inject it", "Fold it", "Magic?"], correctA: "Fold it" }
];

var currentQuestionIndex = 0;
var currentQuestion = quizQuestions[currentQuestionIndex];
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
    scores[currentQuestionIndex] = 1; // Update the score at the current question index
  } else {
    feedbackContainer.textContent = "Incorrect answer!";
    scores[currentQuestionIndex] = 0; // Update the score at the current question index
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    currentQuestion = quizQuestions[currentQuestionIndex];
    showQuestion();
  } else {
    var totalScore = scores.reduce((acc, cur) => acc + cur, 0);
    feedbackContainer.textContent = "Quiz finished! Your total score: " + totalScore + "/2";
    updateScore(totalScore);
    clearInterval(timer); // Stop the timer
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  localStorage.setItem("feedbackContent", feedbackContainer.textContent);
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
  var totalScore = scores.reduce((acc, cur) => acc + cur, 0);
  feedbackContainer.textContent = "Quiz finished! Your total score: " + totalScore + "/2";
  updateScore(totalScore);
  clearInterval(timer);
  localStorage.setItem("scores", JSON.stringify(scores));
  localStorage.setItem("feedbackContent", feedbackContainer.textContent);
}

function resetQuiz() {
  clearInterval(timer);
  currentQuestionIndex = 0;
  currentQuestion = quizQuestions[currentQuestionIndex];
  scores = [];
  timerCount = 30;

  shownQuestion.textContent = "";
  button1.textContent = "";
  button2.textContent = "";
  button3.textContent = "";
  button4.textContent = "";
  feedbackContainer.textContent = "";
  timerCountElement.textContent = timerCount;

  var storedScores = localStorage.getItem("scores");
  if (storedScores) {
    scores = JSON.parse(storedScores);
  }

  var totalScore = scores.reduce((acc, cur) => acc + cur, 0);
  scoreContainer.textContent = "Total Score: " + totalScore + "/2";

  localStorage.removeItem("feedbackContent");

  startTimer(); // Start the timer again
}

var storedFeedbackContent = localStorage.getItem("feedbackContent");
if (storedFeedbackContent) {
  feedbackContainer.textContent = storedFeedbackContent;
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
});

// Update the score container when the page loads
var storedScores = localStorage.getItem("scores");
if (storedScores) {
  scores = JSON.parse(storedScores);
}
var totalScore = scores.reduce((acc, cur) => acc + cur, 0);
updateScore(totalScore);

function updateScore(totalScore) {
  var maxScore = 2; // Set the maximum score
  var percentage = (totalScore / maxScore) * 100; // Calculate the percentage

  // Display the score and percentage
  scoreContainer.textContent = "Total Score: " + totalScore + "/" + maxScore + " (" + percentage + "%)";
}
