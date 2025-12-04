
/****************************
  LOADING SCREEN
*****************************/
function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}
showLoader();
setTimeout(hideLoader, 2000);


/* ------------------------------------------
   QUESTIONS
------------------------------------------- */
// // Quiz Question
// // Array of question objects
const questions = [
  { 
    question: "What color do you get when you mix red and yellow?", 
    options: ["Blue", "Green", "Orange", "Pink"], 
    answer: "Orange"
  },
  { 
    question: "How many legs does a spider have?", 
    options: ["6", "8", "10", "4"], 
    answer: "8"
  },
  {
    question: "Which animal is known as the “King of the Jungle”?",
    options: ["Elephant","Lion","Tiger","Monkey"],
    answer: "Lion"
  },
  {
    question:"What is the name of our planet?",
    options:["Mars","Moon","Earth","Sun"],
    answer:"Earth"
  },
  {
    question:"Which shape has three sides",
    options:["Circle","Triangle","Square","Rectangle"],
    answer:"Triangle"
  },
  {
    question:"What do bees make?",
    options:["Milk","Honey","Bread","Cheese"],
    answer:"Honey"
  },
  {
    question:"Which fruit is yellow and long?",
    options:["Apple","Banana","Grape","Orange"],
    answer:"Banana"
  },
];

/* ------------------------------------------
   RESTORE FROM MAZE
------------------------------------------- */
let currentQuestion = parseInt(localStorage.getItem("returnQuestion")) || 0;
let keys = 0;
let attempts = 0;

// Clear the saved question so it runs only once
localStorage.removeItem("returnQuestion");

/* ------------------------------------------
   SHOW QUESTION
------------------------------------------- */
function showQuestion(index) {
  if (index >= questions.length) {
    document.getElementById("quiz-container").innerHTML = "<h2>Quiz Finished!</h2>";
    return;
  }

  attempts = 0;
  const q = questions[index];

  document.getElementById("levelCounter").textContent = "Level " + (index + 1);
  document.getElementById("questionText").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("keyCounter").textContent = "Keys: " + keys;
}

/* ------------------------------------------
   CHECK ANSWER
------------------------------------------- */
function checkAnswer(option) {
  attempts++;

  const correct = (option === questions[currentQuestion].answer);
  showResultModal(correct);

  if (correct && attempts === 1) {
    keys++;
    document.getElementById("keyCounter").textContent = "Keys: " + keys;
  }
}

/* ------------------------------------------
   MODAL RESULT POPUP
------------------------------------------- */
function showResultModal(success) {
  const modal = document.getElementById("resultModal");
  const resultGif = document.getElementById("resultGif");
  const message = document.getElementById("resultMessage");

  modal.style.display = "flex";

  if (success) {
    message.textContent = "Correct!";
    resultGif.src = "https://mcvuk.com/wp-content/uploads/social_dino_with_hat.gif";

    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("retryBtn").style.display = "none";
  } else {
    message.textContent = "Wrong answer!";
    resultGif.src = "https://www.icegif.com/wp-content/uploads/2025/05/dinosaur-game-icegif.gif";

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("retryBtn").style.display = "inline-block";
  }
}

/* ------------------------------------------
   NEXT BUTTON
------------------------------------------- */
document.getElementById("nextBtn").onclick = () => {
  document.getElementById("resultModal").style.display = "none";

  currentQuestion++;

  // If 3 keys → Go to maze
  if (keys >= 3) {
    localStorage.setItem("returnQuestion", currentQuestion);
    window.location.href = "maze.html";
    return;
  }

  showQuestion(currentQuestion);
};

/* ------------------------------------------
   RETRY BUTTON
------------------------------------------- */
document.getElementById("retryBtn").onclick = () => {
  document.getElementById("resultModal").style.display = "none";
  showQuestion(currentQuestion);
};

/* ------------------------------------------
   START QUIZ
------------------------------------------- */
showQuestion(currentQuestion);
