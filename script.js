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

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicControl");

  if (music.paused) {
    music.play();
    btn.innerText = "🔊 Pause Music";
  } else {
    music.pause();
    btn.innerText = "🔇 Play Music";
  }
}

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
let answered = 0;
let total = document.querySelectorAll(".question").length;

function checkAnswer(button, isCorrect) {
  let question = button.parentElement;

  if (question.classList.contains("answered")) return;

  question.classList.add("answered");
  answered++;

  let buttons = question.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.getAttribute("onclick").includes("true")) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (isCorrect) score++;

  updateUI();

  if (answered === total) {
    showFinalResult();
  }
}

function updateUI() {
  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;

  let progress = (answered / total) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function showFinalResult() {
  document.getElementById("result").innerHTML = `
    <h2>You scored ${score}/${total} ❤️</h2>
    <p>${getMessage(score)}</p>
    <p>🔓 Private unlocked ❤️</p>
  `;

  unlockPrivateTab();
}

function getMessage(score) {
  if (score === total) return "Perfect 😭❤️";
  if (score > total / 2) return "You love me fr ❤️";
  return "We need more memories 😏";
}

/* MANUAL BUTTON SUPPORT */
function showScore() {
  showFinalResult();
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

const message = `You changed my life in ways I never imagined.
You are my peace, my happiness, and my forever.
No matter what happens, I will always choose you ❤️`;

let index = 0;

function typeMessage() {
  const element = document.getElementById("loveMessage");

  if (!element) return;

  if (index < message.length) {
    element.innerHTML += message.charAt(index);
    index++;
    setTimeout(typeMessage, 40); // typing speed
  }
}

/* =========================
   PASSWORD SYSTEM (PRIVATE TAB)
========================= */
function checkPassword() {
  let input = document.getElementById("password").value;

  if (input === "22072023") {
    document.getElementById("privateContent").style.display = "block";
    typeMessage(); // 🔥 START TYPING
  } else {
    alert("Wrong date ❤️");
  }
}