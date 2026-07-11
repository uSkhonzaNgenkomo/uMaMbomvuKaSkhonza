let score = 0;

function enterSite() {
document.getElementById("landing").style.display = "none";
document.getElementById("main").style.display = "block";

document.getElementById("bgMusic").play();
}

function showTab(tabId) {
document.querySelectorAll(".tab").forEach(tab => {
tab.style.display = "none";
});

document.getElementById(tabId).style.display = "block";
}

function answer(correct) {
if (correct) score++;
}

function showScore() {
alert("Your score: " + score + " ❤️");
}

function checkPassword() {
const password = document.getElementById("password").value;

if (password === "20230722") {
document.getElementById("privateContent").style.display = "block";
} else {
alert("Wrong password ❤️");
}
}
