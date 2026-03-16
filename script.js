const totalQuestions = 50;

let questions = [];
let currentQuestion = 0;
let userAnswers = new Array(totalQuestions).fill(null);

let correctAnswers = [
  1, 0, 2, 0, 3, 1, 0, 3, 2, 0, 1, 3, 0, 0, 0, 2, 1, 3, 2, 1, 0, 3, 1, 2, 1, 1,
  1, 0, 1, 0, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 0, 1, 0, 0, 2, 1, 1,
];

for (let i = 1; i <= totalQuestions; i++) {
  questions.push({
    img: `images/q${i}.png`,
  });
}

// questions = questions.sort(() => Math.random() - 0.5);

const questionImage = document.getElementById("questionImage");
const options = document.querySelectorAll("input[name='answer']");
const grid = document.getElementById("questionGrid");

function loadQuestion() {
  questionImage.src = questions[currentQuestion].img;

  options.forEach((o) => (o.checked = false));

  if (userAnswers[currentQuestion] != null) {
    options[userAnswers[currentQuestion]].checked = true;
  }
}

options.forEach((option) => {
  option.addEventListener("change", function () {
    userAnswers[currentQuestion] = parseInt(this.value);

    updateGrid();
  });
});

function createGrid() {
  for (let i = 0; i < totalQuestions; i++) {
    let btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.classList.add("qbtn");

    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion();
    };

    grid.appendChild(btn);
  }
}

function updateGrid() {
  let buttons = document.querySelectorAll(".qbtn");

  buttons.forEach((btn, i) => {
    if (userAnswers[i] != null) {
      btn.classList.add("answered");
    }
  });
}

function finishTest() {
  let score = 0;

  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] == correctAnswers[i]) {
      score++;
    }
  }

  alert("Natija: " + score + " / " + totalQuestions);
}

createGrid();
loadQuestion();

startTimer();

function startTimer() {
  let time = 3600;

  let timer = document.getElementById("timer");

  setInterval(() => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;

    timer.innerText = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;

    time--;

    if (time < 0) {
      finishTest();
    }
  }, 1000);
}
