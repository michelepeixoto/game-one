var answer = null, questionField = resultField = "", questionNum = 1, life = 100;
function start(){//initiates fields and buttons
  var delayTimer = delayResult = delayNextQ = null;//reset delay time between steps
  questionNum = 1; life = 100; updateLife(0);//reset game
  questionField = document.getElementById("question");//get question field
  resultField = document.getElementById("result");//get result field
  document.getElementById("gameover").style.display = "none";//hide game over div
  document.getElementById("start").style.display = "none";//hide start button
  document.getElementById("game").style.display = "inline";//show game div
  document.getElementById("yes").addEventListener("click", function(){answer="y";})//click yes
  document.getElementById("no").addEventListener("click", function(){answer="n";})//click no
  console.log("started");
  play();
  function play(){//runs game process
    var timerField = document.getElementById("timer");
    var time = 5;//player has 5 seconds to decide
    askQuestion();
    delayTimer = setInterval(function(){//wait 1 second before changing timer
      timerField.innerHTML = time;
      console.log("time left: "+time);
      time--;
      if (time==0||answer!=null){
        clearInterval(delayTimer);
      }
    }, 1000);
    delayResult = setTimeout(function(){//wait until timer is out
      getResult();
      answer = null;
      questionNum++;
    }, 6000);
    delayNextQ = setTimeout(function(){//give player time to read result
      if (life>0 && questionNum<=6){
        play();//keep playing
      }
      else {  document.getElementById("gameover").style.display = "inline";//end game
           }
    }, 9000);
  }
}
function updateLife(changeLife){
  life-=changeLife;
  document.getElementById("life").innerHTML=life;
  console.log("life at "+life);
}
function askQuestion(){//changes questionField based on questionNum
  resultField.innerHTML = "";//reset result before new question
  question = "";
  console.log("asking question "+questionNum);
  switch(questionNum){
    case 1:
      question = "1am: You are running by yourself. A storm appears. Keep running?"; 
      break;
    case 2:
      question = "2am: Arrived at home. You feel hungry. Will you make a cup noodle?";
      break;
    case 3:
      question = "3am: You decide to watch TV. An ad for an adult movie pops up. Watch it?"; 
      break;
    case 4:
      question = "4am: Sleep starts to hit you. Go to bed?";
      break;
    case 5:
      question = "5am: Your doorbell rings. Answer the door?";   
      break;
    case 6:
      question = "6am: You survived. Play again?";
      break;
                    }
  questionField.innerHTML = question;
}
function getResult(){//changes resultField based on questionNum
  result = "";
  console.log("getting result for question "+questionNum);
  if (answer==null){//no input reloads
    location.reload();
  }
  switch(questionNum){
    case 1:
      if (answer=="y"){
        result = "A lightning bolt strikes you.";
        updateLife(40);
      }
      else if (answer=="n"){
        result = "You chicken out and head home.";
      }
      break;
    case 2:
      if (answer=="y"){
        result = "You put the cup noodle in the microwave without any water. It causes the microwave to blow up and a piece of it lands in your arm.";
        updateLife(30);
      }
      else if (answer=="n"){
        result = "You stay hungry.";
        updateLife(10);
      }
      break;
    case 3:
      if (answer=="y"){
        result = "You watch it and a whole hour goes by.";
      }
      else if (answer=="n"){
        result = "As soon as you decline you feel a sharp pain in your head.";
        updateLife(15);
      }
      break;
    case 4:
      if (answer=="y"){
        result = "You sleep until 6am.";
        questionNum = 5;
      }
      else if (answer=="n"){
        result = "You stay awake anyway. You feel increasingly tired as the hour goes by.";
        updateLife(15);
      }
      break;
    case 5:
      if (answer=="y"){
        result = "The stranger smiles, then stabs your stomach and runs away.";
        updateLife(life);
      }
      else if (answer=="n"){
        result = "You look through the peep-hole. A stranger stands there holding a knife.";
      }        
      break;
    case 6:
      if (answer=="y"){
        location.reload();
      }
      else if (answer=="n"){
        document.getElementById("start").style.display = "inline";//show start button
        document.getElementById("game").style.display = "none";//hide game div        
        alert("Thanks for playing!");
        location.reload();
      }
      break;
  }
  resultField.innerHTML = result;
}
