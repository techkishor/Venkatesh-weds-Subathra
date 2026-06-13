
const envelopeScreen = document.getElementById("envelopeScreen");
const invitationScreen = document.getElementById("invitationScreen");
const envelope = document.querySelector(".envelope");
const seal = document.querySelector(".seal");

/* ================= OPEN ENVELOPE ================= */

function openInvitation() {

    envelope.classList.add("open");

    setTimeout(() => {

        envelopeScreen.style.opacity = "0";

        setTimeout(() => {
            envelopeScreen.style.display = "none";

            invitationScreen.style.opacity = "1";
            invitationScreen.style.visibility = "visible";

        }, 900);

    }, 1400);
}

envelope.addEventListener("click", openInvitation);
seal.addEventListener("click", openInvitation);



/* ================= COUNTDOWN TIMER ================= */

const targetDate = new Date("2026-06-25T00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateTimer() {

    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = mins;
    secondsEl.innerText = secs;
}

setInterval(updateTimer, 1000);
updateTimer();


const canvas = document.getElementById("scratchCanvas");

if (canvas) {

    const scratchBox = document.querySelector(".scratch-box");
    const scratchText = document.querySelector(".scratch-text");
    const hiddenDate = document.querySelector(".hidden-date");

    const ctx = canvas.getContext("2d");

    const width = scratchBox.offsetWidth;
    const height = scratchBox.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    let revealed = false;

    /* ================= GOLD LAYER ================= */

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f7e08a");
    gradient.addColorStop(0.5, "#d4af37");
    gradient.addColorStop(1, "#b8860b");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // sparkle effect
    for (let i = 0; i < 60; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalCompositeOperation = "destination-out";

    /* ================= REVEAL FUNCTION ================= */

    function reveal() {

        if (revealed) return;
        revealed = true;

        // hide scratch text instantly
        if (scratchText) {
            scratchText.style.opacity = "0";
            scratchText.style.transition = "opacity 0.3s ease";
        }

        // optional fade canvas away (clean effect)
        canvas.style.transition = "opacity 0.6s ease";
        canvas.style.opacity = "0";

        // ensure date visible
        if (hiddenDate) {
            hiddenDate.style.opacity = "1";
        }
        launchWeddingFX();
        goldenExplosion();
        activateDateGlow();
        
    }

    /* ================= DRAW (optional scratch effect still works) ================= */

    function scratch(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    /* ================= CLICK / TOUCH = REVEAL ================= */

    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        scratch(e.clientX - rect.left, e.clientY - rect.top);
        reveal();
    });

    canvas.addEventListener("touchstart", (e) => {
        const rect = canvas.getBoundingClientRect();
        const t = e.touches[0];

        scratch(t.clientX - rect.left, t.clientY - rect.top);
        reveal();
    });

}
function launchWeddingFX() {

    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#ffd700", "#ffef9f", "#fff", "#ff4d6d", "#ff85a2"];

    function createItem(type) {

        const el = document.createElement("div");

        el.style.position = "fixed";
        el.style.left = Math.random() * window.innerWidth + "px";
        el.style.top = "-30px";
        el.style.zIndex = "9999";
        el.style.pointerEvents = "none";
        el.style.transform = "translateY(0)";

        // 🎨 STYLE BASED ON TYPE
        if (type === "heart") {
            el.innerHTML = "❤️";
            el.style.fontSize = Math.random() * 10 + 14 + "px";
        }

        else if (type === "ribbon") {
            el.innerHTML = "🎀";
            el.style.fontSize = Math.random() * 10 + 16 + "px";
        }

        else {
            el.innerHTML = "✨";
            el.style.fontSize = Math.random() * 8 + 12 + "px";
        }

        document.body.appendChild(el);

        // ⚡ FASTER FALL SPEED
        let speed = Math.random() * 3 + 4; // faster than before
        let rotation = Math.random() * 360;

        const fall = setInterval(() => {

            let top = parseFloat(el.style.top);
            top += speed;

            rotation += 5;

            el.style.top = top + "px";
            el.style.transform = `rotate(${rotation}deg)`;

            // slight side movement
            el.style.left = parseFloat(el.style.left) + Math.sin(top / 20) * 1.5 + "px";

            if (top > window.innerHeight) {
                clearInterval(fall);
                el.remove();
            }

        }, 16);
    }

    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const rand = Math.random();

        if (rand < 0.45) createItem("heart");
        else if (rand < 0.8) createItem("ribbon");
        else createItem("sparkle");

    }, 80); // faster spawn rate
}

/* ================= GOLD EXPLOSION ================= */
function goldenExplosion() {

    const colors = ["#ffd700", "#ffef9f", "#fff", "#d4af37"];

    for (let i = 0; i < 35; i++) {

        const el = document.createElement("div");

        el.innerHTML = "✨";
        el.style.position = "fixed";
        el.style.left = "50%";
        el.style.top = "50%";
        el.style.zIndex = "9999";
        el.style.pointerEvents = "none";
        el.style.fontSize = Math.random() * 12 + 14 + "px";

        document.body.appendChild(el);

        let angle = Math.random() * 2 * Math.PI;
        let velocity = Math.random() * 8 + 4;

        let x = 0;
        let y = 0;

        const move = setInterval(() => {

            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity + 2;

            el.style.transform = `translate(${x}px, ${y}px)`;

            el.style.opacity -= 0.02;

            if (el.style.opacity <= 0) {
                clearInterval(move);
                el.remove();
            }

        }, 16);
    }
}


/* ================= DATE GLOW ================= */
function activateDateGlow() {

    const date = document.querySelector(".hidden-date");

    if (date) {
        date.classList.add("date-glow");
    }
}