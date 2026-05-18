const totalQuestions = 40;

const studentName = localStorage.getItem("studentName");
const studentClass = localStorage.getItem("studentClass");
const studentId = localStorage.getItem("studentId");

if (!studentName || !studentClass || !studentId) {
  window.location.href = "login.html";
}

// Mana shu qatorni innerText o'rniga innerHTML qildik:
document.getElementById("studentInfo").innerHTML = `
  <span>👤  <b>O'quvchi:</b> &nbsp;${studentName}</span>
  <span>🏫  <b>Sinf:</b> &nbsp;${studentClass}</span>
  <span>🆔  <b>ID:</b> &nbsp;${studentId}</span>
`;

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
  2,
  1,
  3,
  0,
  0,
  1,
  2,
  2,
  3,
  2,
  1,
  2,
  3, // 1-13
  2,
  0,
  2,
  0,
  3,
  1,
  0,
  2,
  1,
  3,
  1,
  0, // 14-25
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
    question: "Which astronaut was the first person to walk on the Moon?",
    answers:
      "A) Yuri Gagarin\nB) Neil Armstrong\nC) Thomas Edison\nD) Albert Einstein",
    answer: 1,
  },
  {
    type: "text",
    question:
      "During the carnival, people wore colorful costumes and danced in a huge ________.",
    answers: "A) parade\nB) classroom\nC) laboratory\nD) competition",
    answer: 0,
  },
  {
    type: "text",
    question:
      "Fireworks become different colors because of special ________ inside them.",
    answers: "A) gases\nB) metals\nC) metal salts\nD) liquids",
    answer: 2,
  },
  {
    type: "text",
    question: "My brother ________ going to build a model rocket this weekend.",
    answers: "A) are\nB) is\nC) am\nD) be",
    answer: 1,
  },
  {
    type: "text",
    question:
      "We ________ going to visit the science museum tomorrow because it is closed.",
    answers: "A) are not\nB) don’t\nC) not are\nD) isn’t",
    answer: 0,
  },
  {
    type: "text",
    question: "________ they going to watch the fireworks tonight?",
    answers: "A) Is\nB) Am\nC) Are\nD) Do",
    answer: 2,
  },
  {
    type: "text",
    question:
      "– Where are you going to spend your summer holiday?\n– We ________ going to visit Samarkand.",
    answers: "A) is\nB) are\nC) am\nD) be",
    answer: 1,
  },
  {
    type: "text",
    question: "Choose the INCORRECT sentence.",
    answers:
      "A) She is going to buy a new backpack.\nB) They are going to travel by train.\nC) We going to play basketball later.\nD) I am not going to stay at home.",
    answer: 2,
  },
  {
    type: "text",
    question: "The girl ________ won the art competition is my cousin.",
    answers: "A) which\nB) where\nC) who\nD) when",
    answer: 2,
  },
  {
    type: "text",
    question: "This is the library ________ we usually study after school.",
    answers: "A) who\nB) where\nC) which\nD) what",
    answer: 1,
  },
  {
    type: "text",
    question: "Match the sentence halves.\nThe movie was exciting, ...",
    answers:
      "A) but it was too long.\nB) who helped me yesterday.\nC) where we bought snacks.\nD) which is my teacher.",
    answer: 0,
  },
  {
    type: "text",
    question: "I wanted to go swimming, ________ the water was too cold.",
    answers: "A) so\nB) because\nC) but\nD) and",
    answer: 2,
  },
  {
    type: "text",
    question: "Choose the sentence where “and” is used correctly.",
    answers:
      "A) She opened the book and started reading.\nB) She was hungry and she ate because.\nC) He ran fast, and but he lost.\nD) They played football and tired.",
    answer: 0,
  },
  {
    type: "text",
    question:
      "Why did Ben enjoy the science fair?\n\nHello Tom,\nYesterday our school had a science fair. Students made robots, volcanoes, and space models. My favorite project was a small robot that could carry books. I also liked the planet models because they looked very realistic. At the end of the fair, our class won first prize, and everyone cheered loudly. I was very proud and excited.\n\nSee you soon,\nBen",
    answers:
      "A) Because he stayed home all day.\nB) Because he saw interesting projects and his class won.\nC) Because he didn’t like the robots.\nD) Because the fair was boring.",
    answer: 1,
  },
  {
    type: "text",
    question:
      "Why is Mars colder than Earth?\n\nMars and Earth are planets in our solar system. Earth is closer to the Sun than Mars. Because Mars is farther away, it receives less heat and light from the Sun. Scientists study Mars carefully because they want to learn if people can live there in the future.",
    answers:
      "A) Because Mars is bigger than Earth.\nB) Because Mars has more oceans.\nC) Because Mars is farther from the Sun.\nD) Because Mars is closer to the Moon.",
    answer: 2,
  },
];

questions = [...mathQuestions, ...englishQuestions];

const questionImage = document.getElementById("questionImage");
const options = document.querySelectorAll("input[name='answer']");
const grid = document.getElementById("questionGrid");
let text = document.getElementById("questionText");
let englishAnswers = document.getElementById("englishAnswers");

function loadQuestion() {
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

  // Matematika (0 dan 24 gacha - jami 25 ta)
  for (let i = 0; i < 25; i++) {
    if (userAnswers[i] == questions[i].answer) {
      mathCorrect++;
    }
  }

  // Ingliz tili (25 dan 39 gacha - jami 15 ta)
  for (let i = 25; i < 40; i++) {
    if (userAnswers[i] == questions[i].answer) {
      engCorrect++;
    }
  }

  let mathPercent = Math.round((mathCorrect / 25) * 100);
  let engPercent = Math.round((engCorrect / 15) * 100); // 15 ga bo'linadi

  // Fanlar natijasi matni
  document.getElementById(
    "mathResult"
  ).innerText = `Matematika: ${mathCorrect}/25 (${mathPercent}%)`;
  document.getElementById(
    "engResult"
  ).innerText = `English: ${engCorrect}/15 (${engPercent}%)`;

  // O'quvchi ma'lumotlarini modalga yozish
  document.getElementById("resStudentName").innerText =
    studentName || "Kiritilmagan";
  document.getElementById("resStudentClass").innerText = `${
    studentClass || "Kiritilmagan"
  } (ID: ${studentId || "-"})`;

  // Jami ball va umumiy foiz
  let totalCorrect = mathCorrect + engCorrect;
  let totalPercent = Math.round((totalCorrect / totalQuestions) * 100);
  document.getElementById(
    "totalScore"
  ).innerText = `${totalCorrect} / ${totalQuestions}`;
  document.getElementById("totalPercentage").innerText = `${totalPercent}%`;

  // Statusni belgilash (Masalan, 50% va undan yuqori - O'tdi)
  const statusBadge = document.getElementById("resStatus");
  if (totalPercent >= 50) {
    statusBadge.innerText = "O'tdi";
    statusBadge.className = "status-badge passed";
  } else {
    statusBadge.innerText = "O'tmadi";
    statusBadge.className = "status-badge failed";
  }

  // Diagrammalarni yangi qiymat bilan chizish
  createChart("mathChart", mathCorrect, 25 - mathCorrect);
  createChart("engChart", engCorrect, 15 - engCorrect); // Ingliz tili jami 15 ta

  // Modalni ochish
  document.getElementById("resultModal").style.display = "flex";
}

createGrid();
loadQuestion();
startTimer();

function startTimer() {
  let time = 3600;
  let timer = document.getElementById("timer");

  let timerInterval = setInterval(() => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;

    timer.innerText = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;

    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      finishTest();
    }
  }, 1000);
}

function restartTest() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "login.html";
}

function exitTest() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "login.html";
}
