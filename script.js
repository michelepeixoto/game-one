var answer = null,
  questionField = "",
  resultField = "",
  resultAnimField = "",
  questionNum = 1,
  life = 100,
  delayTimer = null,
  delayResult = null,
  delayNextQ = null;

// list of animation gifs' URLs (for cleaner code), starting at 1 to match Q#s
//list for Glitch:
var resultAnimN = [
  "",
  "https://cdn.glitch.global/87a68849-ba2b-400e-b00a-910df7e25b62/q1-n.gif?v=1661677178222",
  "https://cdn.glitch.global/87a68849-ba2b-400e-b00a-910df7e25b62/q2-n.gif?v=1661677178223",
  "",
  "",
  "https://cdn.glitch.com/87a68849-ba2b-400e-b00a-910df7e25b62%2Fq5-n.gif?v=1590647634256",
];
var resultAnimY = [
  "",
  "https://cdn.glitch.global/87a68849-ba2b-400e-b00a-910df7e25b62/q1-y.gif?v=1661677178223",
  "https://cdn.glitch.global/87a68849-ba2b-400e-b00a-910df7e25b62/q2-y.gif?v=1661677178223",
  "",
  "",
  "https://cdn.glitch.global/87a68849-ba2b-400e-b00a-910df7e25b62/q5-y.gif?v=1661669684814",
];
//list for GitHub:
//var resultAnimN = ["", "q1-n.gif", "q2-n.gif", "q3-n.gif", "q4-n.gif", "q5-n.gif"];
//var resultAnimY = ["", "q1-y.gif", "q2-y.gif", "q3-y.gif", "q4-y.gif", "q5-y.gif"];

// initiates fields and buttons
function start() {
  // reset all values
  reset();
  // get html fields
  questionField = document.getElementById("question");
  resultField = document.getElementById("result");
  resultAnimField = document.getElementById("result-anim");
  // hide unwated fields and show game
  document.getElementById("gameover").style.display = "none";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "inline";
  // add listener to buttons
  document.getElementById("yes").addEventListener("click", function () {
    answer = "y";
    document.getElementById("no").classList.remove('selected');
    this.classList.add('selected');
  });
  document.getElementById("no").addEventListener("click", function () {
    answer = "n";
    document.getElementById("yes").classList.remove('selected');
    this.classList.add('selected');
  });
  // start game
  play();
}

// reset all values
function reset() {
  (answer = null),
    (questionNum = 1),
    (delayTimer = null),
    (delayResult = null),
    (delayNextQ = null);
  updateLife(100);
}

//runs game process
function play() {
  (delayTimer = null), (delayResult = null), (delayNextQ = null);
  // player has 5 seconds to decide
  var timerField = document.getElementById("timer");
  var time = 5;
  askQuestion();
  // wait 1 second before changing timer
  delayTimer = setInterval(function () {
    timerField.innerHTML = time;
    time--;
    if (time == 0 || answer != null) {
      clearInterval(delayTimer);
    }
  }, 1000);
  // wait until timer is out
  delayResult = setTimeout(function () {
    getResult();
  }, 6000);
  // give player time to read result
  delayNextQ = setTimeout(function () {
    // if not dead and was not on last Q keep playing
    if (life > 0 && questionNum <= 6) {
      answer = null;
      questionNum++;
      play();
    }
    // otherwise end game
    else {
      document.getElementById("gameover").style.display = "inline";
    }
  }, 14000);
}

function updateLife(newLife) {
  life = newLife;
  document.getElementById("life").innerHTML = life;
}

// changes questionField based on questionNum
function askQuestion() {
  // reset result, animation and selected button before new question
  resultField.innerHTML = "";
  resultAnimField.className = "hidden";
  document.getElementById("yes").classList.remove('selected');
  document.getElementById("no").classList.remove('selected');
  var question = "";
  switch (questionNum) {
    case 1:
      question =
        "1am: You are running by yourself. A storm appears. Keep running?";
      break;
    case 2:
      question =
        "2am: Arrived at home. You feel hungry. Will you make a cup noodle?";
      break;
    case 3:
      question =
        "3am: You decide to watch TV. An ad for an adult movie pops up. Watch it?";
      break;
    case 4:
      question = "4am: Sleep starts to hit you. Go to bed?";
      break;
    case 5:
      question = "5am: Your doorbell rings. Answer the door?";
      break;
    case 6:
      question = "6am: You survived. Thanks for playing!";
      // hide the answer buttons and anim
      document.getElementById("answer-buttons").style.display = "none";
      document.getElementById("result").style.display = "none";
      break;
  }
  questionField.innerHTML = question;
}

// changes resultField and resultAnimField based on questionNum
function getResult() {
  var result = "",
    resultAnim = null;
  // if player didn't answer reload page/end game
  // Q 6 is "you won" and doesn't take answer input
  if (answer == null && questionNum != 6) {
    //hide game otherwise the anim shows
    document.getElementById("game").style.display = "none";
    location.reload();
  }
  switch (questionNum) {
    case 1:
      if (answer == "y") {
        result = "A lightning bolt strikes you.";
        resultAnim = resultAnimY[1];
        updateLife(life - 50);
      } else if (answer == "n") {
        result = "You chicken out and head home.";
        resultAnim = resultAnimN[1];
      }
      break;
    case 2:
      if (answer == "y") {
        result =
          "You put the cup noodle in the microwave without any water. It causes the microwave to blow up and a piece of it lands in your arm.";
        resultAnim = resultAnimY[2];
        updateLife(life - 40);
      } else if (answer == "n") {
        result = "You stay hungry.";
        resultAnim = resultAnimN[2];
        updateLife(life - 10);
      }
      break;
    case 3:
      if (answer == "y") {
        result = "You watch it and a whole hour goes by.";
        resultAnim = resultAnimY[3];
      } else if (answer == "n") {
        result = "As soon as you decline you feel a sharp pain in your head.";
        resultAnim = resultAnimN[3];
        updateLife(life - 15);
      }
      break;
    case 4:
      if (answer == "y") {
        result = "You sleep until 6am.";
        resultAnim = resultAnimY[4];
        questionNum = 5;
      } else if (answer == "n") {
        result =
          "You stay awake anyway. You feel increasingly tired as the hour goes by.";
        resultAnim = resultAnimN[4];
        updateLife(life - 15);
      }
      break;
    case 5:
      if (answer == "y") {
        result = "The stranger smiles, then stabs your stomach and runs away.";
        resultAnim = resultAnimY[5];
        updateLife(life - life);
      } else if (answer == "n") {
        result =
          "You look through the peep-hole. A stranger stands there holding a knife.";
        resultAnim = resultAnimN[5];
      }
      break;
    // Q 5 is the last one, Q 6 is "you won"
    case 6:
      location.reload();
      break;
  }
  // show result and its animation
  resultField.innerHTML = result;
  resultAnimField.src = resultAnim;
  resultAnimField.className = "visible";
}
