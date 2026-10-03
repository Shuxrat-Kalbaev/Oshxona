const timerData = [
  { name: "Go'sht pishirish", icon: "🥩", duration: 30 },
  { name: "Guruch pishirish", icon: "🍚", duration: 45 },
  { name: "Tuxum qaynatish", icon: "🥚", duration: 20 }
];

const timersContainer = document.querySelector("#timers");

timerData.forEach((item) => {
  const timer = document.createElement("article");
  timer.className = "timer";

  timer.innerHTML = `
    <div class="timer-head">
      <div class="food">${item.icon}</div>
      <h2>${item.name}</h2>
      <span class="badge">TAYYOR</span>
    </div>

    <div class="timer-display">
      <div class="time-wrap">
        <strong class="time">${item.duration}</strong>
        <span class="unit">soniya</span>
      </div>
    </div>

    <div class="status">Boshlanmagan</div>

    <div class="buttons">
      <button class="start">Boshlash</button>
      <button class="pause" disabled>To'xtatish</button>
      <button class="reset">Qayta boshlash</button>
    </div>
  `;

  timersContainer.appendChild(timer);
  createTimer(timer, item.duration);
});

function createTimer(timer, duration) {
  let remaining = duration;
  let interval = null;
  let running = false;

  const display = timer.querySelector(".timer-display");
  const time = timer.querySelector(".time");
  const status = timer.querySelector(".status");
  const badge = timer.querySelector(".badge");
  const start = timer.querySelector(".start");
  const pause = timer.querySelector(".pause");
  const reset = timer.querySelector(".reset");

  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);

  function startTimer() {
    if (running || remaining === 0) return;

    running = true;
    timer.classList.add("running");
    timer.classList.remove("paused", "finished");

    status.textContent = "Jarayon davom etmoqda...";
    badge.textContent = "ISHLOVDA";
    start.disabled = true;
    pause.disabled = false;

    interval = setInterval(() => {
      remaining--;
      updateDisplay();

      if (remaining === 0) {
        finishTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!running) return;

    clearInterval(interval);
    interval = null;
    running = false;

    timer.classList.remove("running");
    timer.classList.add("paused");

    status.textContent = "To'xtatilgan";
    badge.textContent = "PAUZA";
    start.disabled = false;
    pause.disabled = true;
  }

  function resetTimer() {
    clearInterval(interval);
    interval = null;
    running = false;
    remaining = duration;

    timer.classList.remove("running", "paused", "finished");
    status.textContent = "Boshlanmagan";
    badge.textContent = "TAYYOR";
    start.disabled = false;
    pause.disabled = true;

    updateDisplay();
  }

  function finishTimer() {
    clearInterval(interval);
    interval = null;
    running = false;
    remaining = 0;

    timer.classList.remove("running", "paused");
    timer.classList.add("finished");

    status.textContent = "Vaqt tugadi!";
    badge.textContent = "TUGADI";
    start.disabled = true;
    pause.disabled = true;

    updateDisplay();
  }

  function updateDisplay() {
    // Tugaganda ham aynan 0 soniya ko'rinadi.
    time.textContent = remaining;
    const progress = duration === 0 ? 0 : remaining / duration;
    const degrees = progress * 360;

    display.style.background =
      `conic-gradient(#d6a84f ${degrees}deg, #ece7df ${degrees}deg)`;

    if (remaining === 0) {
      display.style.background =
        "conic-gradient(#c83c3c 360deg, #ece7df 360deg)";
    }
  }
}
