// Quiz questions
const questions = [
  {
    question: "Which cloud service model lets developers deploy code without managing servers or the operating system?",
    options: ["IaaS", "PaaS", "SaaS", "On-premise"],
    answer: 1,
    explanation: "PaaS gives you a ready platform. You only manage your code and app settings."
  },
  {
    question: "In IaaS, who is responsible for managing the operating system?",
    options: ["The cloud provider", "The internet provider", "The customer", "No one"],
    answer: 2,
    explanation: "With IaaS, the provider gives you virtual machines, but you manage the OS and what runs on it."
  },
  {
    question: "Gmail is a common example of which service model?",
    options: ["IaaS", "PaaS", "SaaS", "DaaS"],
    answer: 2,
    explanation: "SaaS gives you a finished app through the browser. You just use it."
  },
  {
    question: "Which of these is an example of a PaaS platform?",
    options: ["Netlify", "Amazon EC2", "Microsoft Word", "Google Drive"],
    answer: 0,
    explanation: "Netlify builds, hosts, and serves your app for you. Amazon EC2 is IaaS, and the others are SaaS."
  },
  {
    question: "What does 'pay-as-you-go' mean in cloud computing?",
    options: [
      "You pay once and use it forever",
      "You pay only for the resources you use",
      "You pay before you can sign up",
      "You pay the same amount every month no matter what"
    ],
    answer: 1,
    explanation: "Cloud providers charge based on usage, so you do not pay for resources you do not need."
  }
];

// Page elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

let currentIndex = 0;
let score = 0;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(function (s) {
    s.classList.add("hidden");
  });
  screen.classList.remove("hidden");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];
  progressEl.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  optionsEl.innerHTML = "";

  q.options.forEach(function (text, i) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", function () {
      selectAnswer(i);
    });
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(chosen) {
  const q = questions[currentIndex];
  const buttons = optionsEl.querySelectorAll(".option");

  buttons.forEach(function (btn, i) {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === chosen && chosen !== q.answer) btn.classList.add("wrong");
  });

  if (chosen === q.answer) {
    score++;
    feedbackEl.textContent = "Correct! " + q.explanation;
  } else {
    feedbackEl.textContent = "Not quite. " + q.explanation;
  }

  nextBtn.textContent = currentIndex === questions.length - 1 ? "See Result" : "Next";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  scoreEl.textContent = score + " / " + questions.length;

  if (score === questions.length) {
    messageEl.textContent = "Perfect score! You really know your cloud models.";
  } else if (score >= 3) {
    messageEl.textContent = "Good job! Review the ones you missed and try again.";
  } else {
    messageEl.textContent = "Keep learning. Read about IaaS, PaaS, and SaaS and try again.";
  }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
