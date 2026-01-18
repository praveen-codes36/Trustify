function analyzeText() {
  const text = document.getElementById("inputText").value.trim();

  if (text.length < 20) {
    alert("Please enter meaningful information.");
    return;
  }

  document.getElementById("loading").style.display = "block";
  document.getElementById("result").style.display = "none";

  setTimeout(() => {
    const score = calculateScore(text);
    displayResult(score);
  }, 1200);
}

function calculateScore(text) {
  let score = 100;

  const lower = text.toLowerCase();

  if (lower.includes("breaking")) score -= 15;
  if (lower.includes("share")) score -= 20;
  if (lower.includes("not a joke")) score -= 15;
  if (lower.includes("forward")) score -= 30;
  if (lower.includes("secret")) score -= 15;

  return Math.max(score, 10);
}

function displayResult(score) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("result").style.display = "flex";

  const circle = document.getElementById("scoreCircle");
  const level = document.getElementById("level");
  const explanation = document.getElementById("explanationText");

  circle.className = "score-circle";
  animateScore(circle, score);

  if (score >= 80) {
    circle.classList.add("green");
    level.innerText = "High credibility";
    explanation.innerText =
      "This content uses neutral language and avoids manipulation tactics.";
  } else if (score >= 50) {
    circle.classList.add("yellow");
    level.innerText = "Medium credibility";
    explanation.innerText =
      "This content contains emotional or persuasive language. Verify before trusting.";
  } else {
    circle.classList.add("red");
    level.innerText = "Low credibility";
    explanation.innerText =
      "This content uses fear, urgency, or manipulation commonly seen in misinformation.";
  }
}
function animateScore(element, target) {
  let current = 0;
  const speed = 15;

  const interval = setInterval(() => {
    current++;
    element.innerText = current;

    if (current >= target) {
      clearInterval(interval);
      element.innerText = target;
    }
  }, speed);
}

