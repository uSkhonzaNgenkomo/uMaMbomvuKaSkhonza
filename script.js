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

  tabs.forEach(tab => {
    tab.style.display = "none"; // hide all tabs
  });

  let activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = "block"; // show selected tab
  }
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

  // Prevent double answering
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

  // Auto show result when done
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
    <p>🔓 Private section unlocked ❤️</p>
  `;

  unlockPrivateTab();
}

/* MANUAL BUTTON SUPPORT */
function showScore() {
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