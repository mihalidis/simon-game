// Arrays
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keydown(function(event){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


// FUNCTIONS <3

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over at Level "+level+", Press Any Key to Start");
    $("body").keydown(function(e){
      startOver();
    });
  }
}

function nextSequence(){

  level++;
  userClickedPattern = [];
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(1).fadeIn(300);
    playSound(randomChosenColor);

}

function playSound(name){
  var colorSound = new Audio("sounds/"+name+".mp3");
  colorSound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
