var startButton = document.querySelector(".start-button")
var infoContainer = document.querySelector(".quiz-game")
var quizContainer = document.querySelector(".quiz-container")
var shownQuestion = document.querySelector(".questions")
var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")
var button3 = document.querySelector("#button3")
var button4 = document.querySelector("#button4")


startButton.addEventListener("click", gameStart)
startButton.addEventListener("click", gameStart)
startButton.addEventListener("click", gameStart)


var quizQuestions = [{qtext:"actual question", answers:["a", "b", "c" ,"d"], correctA:"b"}, {qtext:"actual question2", answers:["a2", "b2", "c2" ,"d2"], correctA:"b2"}]


function gameStart(){
startButton.classList.add("hide");
infoContainer.classList.add("hide");
quizContainer.classList.remove("hide");

}

var currentQuestion = quizQuestions[0];
shownQuestion.textContent = currentQuestion.qtext

button1.textContent = currentQuestion.answers[0];
button2.textContent = currentQuestion.answers[1];
button3.textContent = currentQuestion.answers[2];
button4.textContent = currentQuestion.answers[3];