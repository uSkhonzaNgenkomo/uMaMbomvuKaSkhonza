/* =========================
   ENTER SITE (LANDING)
========================= */
function enterSite() {
  document.getElementById("landing").style.display = "none";
  const main = document.getElementById("main");
  main.style.display = "block";

  // 👉 OPEN TIMELINE TAB AUTOMATICALLY
  showTab("timeline");

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
   QUIZ SYSTEM (FIXED)
========================= */
let score = 0;
let answered = 0;
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
  total = document.querySelectorAll(".question").length;
});

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
  document.getElementById("scoreDisplay").innerText = `Score: ${score}/${total}`;

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

/* =========================
   PRIVATE TAB LOCK SYSTEM
========================= */
let isUnlocked = false;

function unlockPrivateTab() {
  isUnlocked = true;

  const btn = document.getElementById("privateTab");
  btn.classList.remove("locked");
  btn.style.opacity = "1";
  btn.style.cursor = "pointer";
}

/* FIXED: NO PARAM NEEDED */
function checkAccess() {
  if (!isUnlocked) {
    alert("Finish the game first ❤️");
    return;
  }

  showTab("private");
}

const message = `Themba Lami🥹♥️ here I am once again feeling like I never praise you enough for the amazing girlfriend that you are🥺 thinking about what to say, but realizing 
that nothing I say will ever amount to the way I feel and think about you😪
\n\n
Uma nje ngiqala ngicabanga izinto esesidlule kuzo, the moments, the sweet conversations, laughing together, planning our future, even the most difficult of days🥺 
I just realize how natural and easy it is for me to love you since you are the most meaningful part of my life🥹♥️ It's not even about the big memories that make 
the most sense, but the small quiet moments in between🥺 the ones that aren't seen by other people yet mean the world to me...
\n\n
Into engichaza kakhulu ukuthi you're now way more than just someone I love, sekuwuwe oletha ukuthula uma ezinkingeni engibhekene nazo🥺 uwena ongiduduzayo 
mangibhekene nobunzima, futhi uwena ongigqugquzelayo uma sengiphelelwa amandla🥹 ngifundile nje lukhulu ngokuba nawe empilweni yami themba lami especially the 
importance of loving you and always striving to love you in the best possible way♥️
\n\n
I know there are days when I don't have the right words or even get things right, kodwa lokho akusho ukuthi uthando lwami ngawe nalo lunezinsuku themba lami🥺 
eyi baby you've seen me in situations and conditions that no one else has, and all I can say is thank you for always being there and making sure that I come out 
of every battle a better person🥹 to me, this really means the world baby, angazi nokuthi ngithini ngempela😪 
\n\n
We've had an eventful journey filled with ups and downs asikho perfect baby kodwa nje into engiyithandayo ukuthi our love is genuine and strong🤞🏽 I wouldn't ever 
want to trade anything for what we have😌 
\n\n
Ngyabonga uthando lwakho themba lami nendlela ongithande ngayo selokhu waqala ukungithanda baby🥺umusa wakho sthandwa sami, impatho yakho, isineke, 
konke nje mama angazi ngempela ngingambonga ngani uNkulunkulu ngawe😪 Thank you for being the best version of yourself for me🥺
\n\n
No matter what life brings, I want you to know that I choose you and I will always choose you😤♥️ so here's to more memories, more growth, more love, success, a 
happy marriage, and a happy family for us🥺
\n\n
Happy Anniversary my Love🫂♥️`;

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