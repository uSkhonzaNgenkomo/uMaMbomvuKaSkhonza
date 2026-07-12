/* =========================
   ENTER SITE (LANDING)
========================= */
function enterSite() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("main").style.display = "block";

  // Show first tab
  showTab("timeline");
}

/* =========================
   TAB NAVIGATION (FIXED)
========================= */
function showTab(tabId) {
  let tabs = document.querySelectorAll(".tab");
  let buttons = document.querySelectorAll("nav button");

  tabs.forEach(tab => tab.style.display = "none");
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).style.display = "block";

  // highlight active button
  event.target.classList.add("active");
}

/* =========================
   QUIZ SYSTEM
========================= */
let score = 0;
let answeredQuestions = 0;
let totalQuestions = 0;

document.addEventListener("DOMContentLoaded", () => {
  totalQuestions = document.querySelectorAll(".question").length;

  // Lock private tab initially
  document.getElementById("privateTab").classList.add("locked");
});

/* CHECK ANSWER */
function checkAnswer(button, isCorrect) {
  let questionBox = button.parentElement;

  if (questionBox.classList.contains("answered")) return;

  questionBox.classList.add("answered");
  answeredQuestions++;

  let buttons = questionBox.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;

    // safer way to check correctness
    let correct = btn.getAttribute("onclick").includes("true");

    if (correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (isCorrect) score++;

  // Auto show result
  if (answeredQuestions === totalQuestions) {
    showResult();
  }
}

/* SHOW RESULT */
function showResult() {
  let resultDiv = document.getElementById("result");

  if (!resultDiv) {
    console.error("Result div not found!");
    return;
  }

  let resultText = `You got ${score}/${totalQuestions} ❤️`;

  resultDiv.innerHTML = `
    <h2>${resultText}</h2>
    <p>${getMessage(score)}</p>
    <p>🔓 Private section unlocked!!❤️</p>
  `;

  unlockPrivateTab();
}

/* MANUAL BUTTON SUPPORT */
function showScore() {
  if (totalQuestions === 0) {
    totalQuestions = document.querySelectorAll(".question").length;
  }

  showResult();
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

/* =========================
   PASSWORD SYSTEM (PRIVATE TAB)
========================= */
function checkPassword() {
  let input = document.getElementById("password").value;

  if (input === "12032023") { // 🔁 CHANGE THIS
    document.getElementById("privateContent").style.display = "block";
  } else {
    alert("Wrong date ❤️");
  }
}