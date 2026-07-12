/* TAB NAVIGATION */
function showTab(tabId) {
  let tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
}

/* =========================
   QUIZ SYSTEM
========================= */

let score = 0;
let answeredQuestions = 0;

/* Wait for page to load before counting questions */
let totalQuestions = 0;

document.addEventListener("DOMContentLoaded", () => {
  totalQuestions = document.querySelectorAll(".question").length;

  // Lock private tab initially
  document.getElementById("privateTab").classList.add("locked");
});

/* CHECK ANSWER */
function checkAnswer(button, isCorrect) {
  let questionBox = button.parentElement;

  // Prevent answering twice
  if (questionBox.classList.contains("answered")) return;

  questionBox.classList.add("answered");
  answeredQuestions++;

  let buttons = questionBox.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.getAttribute("onclick").includes("true")) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (isCorrect) score++;

  if (answeredQuestions === totalQuestions) {
    showResult();
  }
}

/* SHOW RESULT */
function showResult() {
  let resultText = `You got ${score}/${totalQuestions} ❤️`;

  document.getElementById("result").innerHTML = `
    <h2>${resultText}</h2>
    <p>${getMessage(score)}</p>
    <p>🔓 Something special is now unlocked ❤️</p>
  `;

  unlockPrivateTab();
}

/* RESULT MESSAGE */
function getMessage(score) {
  if (score === totalQuestions) return "You know us perfectly 😭❤️";
  if (score > totalQuestions / 2) return "You really love me ❤️";
  return "We need more memories together 😏❤️";
}

/* =========================
   PRIVATE TAB LOCK SYSTEM
========================= */

let isUnlocked = false;

/* UNLOCK */
function unlockPrivateTab() {
  isUnlocked = true;
  document.getElementById("privateTab").classList.remove("locked");
}

/* CHECK ACCESS */
function checkAccess() {
  if (!isUnlocked) {
    alert("Finish the game first ❤️");
    return;
  }

  showTab("private");
}