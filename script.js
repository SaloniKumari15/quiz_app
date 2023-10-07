let questions = [
  {
    numb: 1,
    question: "What does CPU stand for?",
    answer: "Central Processing Unit",
    options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Central Processor Unit"],
  },
  {
    numb: 2,
    question: "Which programming language is often used for web development?",
    answer: "JavaScript",
    options: ["Python", "Java", "C++", "JavaScript"],
  },
  {
    numb: 3,
    question: "What is the primary function of an operating system?",
    answer: "Manage hardware and software resources",
    options: ["Play games", "Manage hardware and software resources", "Send emails", "Edit documents"],
  },
  {
    numb: 4,
    question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    answer: "Stack",
    options: ["Queue", "Heap", "Array", "Stack"],
  },
  {
    numb: 5,
    question: "What does URL stand for?",
    answer: "Uniform Resource Locator",
    options: ["Universal Resource Locator", "Uniform Resource Locator", "Unique Resource Locator", "Universal Reference Locator"],
  },
];

// DOM elements
const loginBox = document.querySelector(".login_box");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const loginBtn = document.querySelector("#login_btn");
const nextBtn = document.querySelector(".next_btn");
const submitButton = document.querySelector(".submit_btn");
const questionText = document.querySelector(".que_text");
const optionList = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const time_line = document.querySelector("header .time_line");
const restartButton = document.querySelector(".buttons .restart");

// Variables
let timeValue = 15;
let currentQuestionIndex = 0;
let userScore = 0;
let counter;
let counterLine;
let que_numb = 1;
let widthValue = 0;

// Event listeners
loginBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", showResult);

/**
 * Initializes the quiz by hiding the login box and displaying the quiz box.
 * Displays the first question and starts the timer.
 */
function startQuiz() {
  loginBox.style.display = "none";
  quizBox.style.display = "block";
  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
}

/**
 * Displays the question and its options based on the provided index.
 * @param {number} index - Index of the question in the questions array.
 */
function showQuestions(index) {
  let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";

  let optionTag = "";
  for (let i = 0; i < questions[index].options.length; i++) {
    optionTag += `<div class="option" onclick="optionSelected(this)"><span>${questions[index].options[i]}</span></div>`;
  }
  questionText.innerHTML = que_tag;
  optionList.innerHTML = optionTag;
}

/**
 * Starts the countdown timer for the quiz.
 * @param {number} time - Initial time for the countdown.
 */
function startTimer(time) {
  counter = setInterval(() => {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Out";
      const correctAnswer = questions[currentQuestionIndex].answer;
      const allOptions = optionList.children;
      for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].textContent === correctAnswer) {
          allOptions[i].classList.add("correct");
        }
      }
      for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add("disabled");
      }

      nextBtn.style.display = "block";
    }
  }, 1000);
}

/**
 * Starts the visual timer line for the quiz.
 * @param {number} time - Initial width for the timer line.
 */

function startTimerLine(time) {
  counterLine = setInterval(() => {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }, 29);
}
/**
 * Handles the selection of an option by the user.
 * Checks if the selected option is correct and updates the score accordingly.
 * @param {HTMLElement} answer - The selected option element.
 */
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  const selectedOption = answer.textContent;
  const correctAnswer = questions[currentQuestionIndex].answer;
  const allOptions = optionList.children;
  if (selectedOption === correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
  } else {
    answer.classList.add("incorrect");
    for (let i = 0; i < allOptions.length; i++) {
      if (allOptions[i].textContent === correctAnswer) {
        allOptions[i].classList.add("correct");
      }
    }
  }
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

/**
 * Loads the next question or ends the quiz if all questions have been answered.
 */
function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    que_numb++;
    showQuestions(currentQuestionIndex);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
  }
}

/**
 * Displays the final score and performance of the user.
 */
function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  const scoreText = document.querySelector(".score_text");
  let scoreTag = `<span>You have scored ${userScore} out of ${questions.length}</span>`;
  scoreText.innerHTML = scoreTag;
  let performance = "";
  if (userScore === questions.length) {
    performance = "Congratulations! You got a perfect score!";
  } else if (userScore >= questions.length / 2) {
    performance = "Well done! You passed the quiz!";
  } else {
    performance = "Sorry, you did not pass the quiz. Try again!";
  }

  const performanceTag = document.createElement("p");
  performanceTag.innerHTML = performance;
  scoreText.appendChild(performanceTag);
  restartButton.addEventListener("click", () => {
    restart();
  });
}

/**
 * Restarts the quiz, resetting all variables and displaying the first question.
 */
function restart() {
  quizBox.style.display = "block";
  resultBox.style.display = "none";
  timeValue = 15;
  currentQuestionIndex = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(currentQuestionIndex);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  nextBtn.style.display = "block";
  submitButton.style.display = "block";
}
