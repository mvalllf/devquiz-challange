// language: JavaScript, file: script.js
const questions = [
  {
    question: "Apa fungsi utama dari tag HTML <a>?",
    options: ["Membuat teks tebal", "Membuat tautan/link antar halaman", "Menampilkan gambar", "Membuat garis horizontal"],
    answer: 1
  },
  {
    question: "Properti CSS apa yang digunakan untuk mengubah warna teks?",
    options: ["font-color", "text-style", "color", "background-color"],
    answer: 2
  },
  {
    question: "Manakah yang merupakan tipe data teks (string) dalam JavaScript?",
    options: ["let nilai = 100;", "let nama = \"Budi\";", "let status = true;", "let data = [];"],
    answer: 1
  },
  {
    question: "Metode apa yang digunakan untuk menyimpan data secara permanen di browser?",
    options: ["localStorage", "sessionMemory", "webCache", "cookieStorage"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;
let highScore = localStorage.getItem('devquiz_highscore') || 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const highScoreDisplay = document.getElementById('high-score-display');
const finalScoreText = document.getElementById('final-score-text');

highScoreDisplay.textContent = `Skor Tertinggi: ${highScore}`;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQ = questions[currentQuestionIndex];
  questionNumber.textContent = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
  questionText.textContent = currentQ.question;

  currentQ.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectOption(index, currentQ.answer, button));
    optionsContainer.appendChild(button);
  });
}

function resetState() {
  optionsContainer.innerHTML = '';
}

function selectOption(selectedIndex, correctIndex, button) {
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  
  // Nonaktifkan semua tombol setelah dipilih
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    button.classList.add('correct');
    score += 25; // Setiap jawaban benar dapat 25 poin
  } else {
    button.classList.add('wrong');
    buttons[correctIndex].classList.add('correct');
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  finalScoreText.textContent = `Skor kamu: ${score} dari 100`;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('devquiz_highscore', highScore);
    highScoreDisplay.textContent = `Skor Tertinggi: ${highScore}`;
    finalScoreText.textContent += " (🏆 Rekor Baru!)";
  }
}
