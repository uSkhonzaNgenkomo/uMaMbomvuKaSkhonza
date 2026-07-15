/* =========================
   ENTER SITE (LANDING)
========================= */
function enterSite() {
  document.getElementById("landing").style.display = "none";
  const main = document.getElementById("main");
  main.style.display = "block";

  setTimeout(() => {
    main.classList.add("active");
  }, 50);

  const music = document.getElementById("bgMusic");
  music.play().catch(() => {});
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".card, .photo-card").forEach(el => {
  observer.observe(el);
});

/* =========================
   TAB NAVIGATION (FIXED)
========================= */
function showTab(tabId, btn) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
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

  let resultText = `You got ${score}/${totalQuestions} ❤️`;

  resultDiv.innerHTML = `
    <h2>${resultText}</h2>
    <p>${getMessage(score)}</p>
    <p>🔓 Private section unlocked!!❤️</p>
  `;

  unlockPrivateTab();

  // scroll to result 🔥
  resultDiv.scrollIntoView({ behavior: "smooth" });
}

/* MANUAL BUTTON SUPPORT */
function showScore() {
  if (totalQuestions === 0) {
    totalQuestions = document.querySelectorAll(".question").length;
  }

  // ensure result is visible
  document.getElementById("result").style.display = "block";

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
function checkAccess(el) {
  if (!isUnlocked) {
    alert("Finish the game first ❤️");
    return;
  }

  showTab("private", el);
}

/* =========================
   PASSWORD SYSTEM (PRIVATE TAB)
========================= */
function checkPassword() {
  let input = document.getElementById("password").value;

  if (input === "20230722") { // 🔁 CHANGE THIS
    document.getElementById("privateContent").style.display = "block";
  } else {
    alert("Wrong date ❤️");
  }
}