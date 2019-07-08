var simonSequence = []; //simon's sequence
var correctClicks = 0;
var level = 0;
var incorrect = new Audio('sounds/wrong.mp3');

// Selects the next colour in the sequence.
function nextSequence() {
  level += 1;
  console.log("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  switch (randomNumber) {
    case 0:
      simonSequence.push("green");
      break;
    case 1:
      simonSequence.push("red");
      break;
    case 2:
      simonSequence.push("yellow");
      break;
    case 3:
      simonSequence.push("blue");
      break;
  }
  console.log(simonSequence);
}

//plays the correct sound with effects
function playSquare(colour) {
  var sound = new Audio('sounds/' + colour + ".mp3");
  $("." + colour).fadeOut(150).fadeIn(150);
  sound.play();
}

//handles clicks, compares clicked colour, plays sound, & adds the right class.
function pressButton(selectedColor) {
  $("." + selectedColor).addClass("pressed");
  setTimeout(function() {
    $("." + selectedColor).removeClass("pressed");
  }, 100);
  if (selectedColor === simonSequence[correctClicks]) { //correct
    correctClicks += 1;
    console.log("correct answers " + correctClicks);
    var correct = new Audio('sounds/' + selectedColor + '.mp3');
    correct.play();
    if (correctClicks === level) { //user gets all answers correct
      correctClicks = 0;
      setTimeout(function() {
        playSimon();
      }, 1000);
      $("h1").html("Level " + (level + 1));
    }
  } else { //game over
    incorrect.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").html("Game Over! Press Any Key to Restart.");
    correctClicks = 0;
    level = 0;
    simonSequence = [];
  }
}

//adds a new colour and plays it.


function playSimon() {
  var sequenceCycle = 0;
  nextSequence();
  // playSquare(simonSequence[simonSequence.length - 1]);
  simonSequence.forEach(function(entry) {
    setTimeout(function() {
      playSquare(entry);


    }, ((sequenceCycle * 350) - (level * 35)));
    sequenceCycle++;
    console.log("sequence cycle " + sequenceCycle);
  });
}

//starts the game with a keypress
$(document).keypress(function() {
  console.log(event.key);
  $("h1").html("Level " + (level + 1));
  if (simonSequence.length === 0) {
    playSimon();
  }
});

//button click behavior
$(".btn").click(function() {
  var buttonPressed = $(this).attr("id");
  pressButton(buttonPressed);
  console.log(buttonPressed);
});
