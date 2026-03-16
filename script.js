const totalQuestions = 40;

let questions = [];
let currentQuestion = 0;
let userAnswers = new Array(totalQuestions).fill(null);

function createChart(id, correct, wrong) {
  new Chart(document.getElementById(id), {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [correct, wrong],
          backgroundColor: ["#2a6bff", "#e5e5e5"],
        },
      ],
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
      },
    },
  });
}

let mathCorrectAnswers = [
  2, 3, 1, 2, 1, 3, 1, 2, 3, 0, 1, 3, 2, 1, 2, 3, 0, 2, 3, 0, 2, 1, 2, 3, 1,
];

let mathQuestions = [];

for (let i = 1; i <= 25; i++) {
  mathQuestions.push({
    type: "img",
    img: `images/Screenshot_${i}.png`,
    answer: mathCorrectAnswers[i - 1],
  });
}

mathQuestions = mathQuestions.sort(() => Math.random() - 0.5);
const englishQuestions = [
  {
    type: "text",
    question: "Which instrument is played by pressing keys on a keyboard?",
    answers: "A) drum   B) cymbals   C) keyboard   D) flute",
    answer: 2,
  },
  {
    type: "text",
    question: "Which of these is used to find information about many topics?",
    answers: "A) letter   B) dictionary   C) encyclopedia   D) email",
    answer: 2,
  },
  {
    type: "text",
    question: "Which of these is a renewable energy source?",
    answers: "A) wind power   B) gas   C) coal   D) oil",
    answer: 0,
  },
  {
    type: "text",
    question: "She sings very ___, so everyone likes her voice.",
    answers: "A) beautiful   B) beauty   C) beautifully   D) beautify",
    answer: 2,
  },
  {
    type: "text",
    question: "John plays the guitar ___ than his sister.",
    answers: "A) good   B) well   C) better   D) the best",
    answer: 2,
  },
  {
    type: "text",
    question: "When I was little, I ___ run very fast.",
    answers: "A) can   B) could   C) may   D) might",
    answer: 1,
  },
  {
    type: "text",
    question: "He ___ finish his homework yesterday because he was tired.",
    answers: "A) couldn’t   B) could   C) can’t   D) can",
    answer: 0,
  },
  {
    type: "text",
    question: "___ he ride a bicycle when he was five?",
    answers: "A) Was   B) Can   C) Does   D) Could",
    answer: 3,
  },
  {
    type: "text",
    question: "___ we close the windows to keep the room warm?",
    answers: "A) Should   B) Can   C) Are   D) Did",
    answer: 0,
  },
  {
    type: "text",
    question: "We should use ___ water when watering the plants.",
    answers: "A) little   B) few   C) less   D) a few",
    answer: 2,
  },
  {
    type: "text",
    question: "The city needs ___ water for the fields than before.",
    answers: "A) most   B) more   C) much   D) many",
    answer: 1,
  },
  {
    type: "text",
    question:
      "To save nature, you should use _ water but _ sunlight to help the plants grow.",
    answers: "A) less, more   B) more, less   C) many, few   D) little, many",
    answer: 0,
  },
  {
    type: "text",
    question: "Solar panels make electricity ___ sunlight.",
    answers: "A) from snow   B) at night   C) from sunlight   D) from water",
    answer: 2,
  },
  {
    type: "text",
    question:
      "Sara likes reading books. She used to borrow books from the library every week. Now she usually reads e-books on her tablet because it is faster and easier. She still likes real books, but reading e-books is more convenient for her. Why does Sara usually read e-books now?",
    answers:
      "A) They are slower than real books   B) They are heavy to carry   C) They are faster and easier   D) They are less interesting",
    answer: 2,
  },
  {
    type: "text",
    question:
      "Many people ride bicycles every day. Bicycles are faster than walking, they do not make air dirty, and they help people stay healthy. Why do people ride bicycles?",
    answers:
      "A) To travel faster and stay healthy   B) To make noise   C) To spend more money   D) To make the road bigger",
    answer: 0,
  },
];
questions = [...mathQuestions, ...englishQuestions];

// questions = questions.sort(() => Math.random() - 0.5);

const questionImage = document.getElementById("questionImage");
const options = document.querySelectorAll("input[name='answer']");
const grid = document.getElementById("questionGrid");
let text = document.getElementById("questionText");
let englishAnswers = document.getElementById("englishAnswers");

function loadQuestion() {
  // questionImage.src = questions[currentQuestion].img;
  let q = questions[currentQuestion];

  if (q.type === "img") {
    questionImage.style.display = "block";
    text.style.display = "none";
    englishAnswers.style.display = "none";

    questionImage.src = q.img;
    options.forEach((o) => (o.checked = false));

    if (userAnswers[currentQuestion] != null) {
      options[userAnswers[currentQuestion]].checked = true;
    }
  } else {
    questionImage.style.display = "none";
    text.style.display = "block";
    englishAnswers.style.display = "block";

    text.innerText = q.question;
    englishAnswers.innerText = q.answers;

    options.forEach((o) => (o.checked = false));

    if (userAnswers[currentQuestion] != null) {
      options[userAnswers[currentQuestion]].checked = true;
    }
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
  let mathCorrect = 0;
  let engCorrect = 0;

  for (let i = 0; i < 25; i++) {
    if (userAnswers[i] == questions[i].answer) {
      mathCorrect++;
    }
  }

  for (let i = 25; i < 40; i++) {
    if (userAnswers[i] == questions[i].answer) {
      engCorrect++;
    }
  }

  let mathPercent = Math.round((mathCorrect / 25) * 100);
  let engPercent = Math.round((engCorrect / 25) * 100);

  document.getElementById(
    "mathResult"
  ).innerText = `Matematika: ${mathCorrect}/25 (${mathPercent}%)`;

  document.getElementById(
    "engResult"
  ).innerText = `English: ${engCorrect}/25 (${engPercent}%)`;

  createChart("mathChart", mathCorrect, 25 - mathCorrect);
  createChart("engChart", engCorrect, 25 - engCorrect);

  document.getElementById("resultModal").style.display = "flex";
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

function restartTest() {
  location.reload();
}

function exitTest() {
  window.location.href = "index.html";
}
