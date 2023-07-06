var score = 0;

var playGame = function() {
 
  if (!userChoice) {
    return;
  }


  window.alert(
    "Score " + wins  
  );

  
  var playAgain = window.confirm("Play again?");

  if (playAgain) {
    playGame();
  }
};

playGame();