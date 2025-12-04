
// Loading Page
function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}
showLoader();
setTimeout(function() {
  hideLoader();
}, 2000);



// Quiz Question
// Array of question objects
const questions = [
  { 
    question: " Who is widely considered the father of modern computer science?", 
    options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], 
    answer: "Alan Turing"
  },
  { 
    question: "What is the capital city of Australia?", 
    options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], 
    answer: "Canberra"
  },
  {
    question: "What does GDP stand for in economics?",
    options: ["Gross Domestic Product","General Development Plan","Global Demand Percentage"," Government Debt Payment"],
    answer: "Gross Domestic Product"
  },
  {
    question:"Which element has the chemical symbol 'K'?",
    options:["Krypton","Potassium","Kyanite","Kunzite"],
    answer:"Potassium"
  },
  {
    question:"Who wrote the novel ‘1984’?",
    options:["Aldous Huxley","George Orwell","J.K. Rowling","Ernest Hemingway"],
    answer:"George Orwell"
  },
  {
    question:"In which year did the World Health Organization declare COVID-19 a pandemic?",
    options:["2018","2019","2020","2021"],
    answer:"2020"
  },
  {
    question:"What is the largest organ of the human body?",
    options:["Liver","Skin","Brain","Heart"],
    answer:"Skin"
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
    window.location.href = "maze3.html";
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