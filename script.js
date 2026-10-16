
const surpriseButton = document.getElementById("surpriseButton");
const birthdayMessage = document.getElementById("birthdayMessage");
const balloonContainer = document.getElementById("balloonContainer");
const confettiContainer = document.getElementById("confettiContainer");
const gift = document.getElementById("gift");

let opened = false;

const balloonEmojis = ["🎈", "🎈", "💖", "💗", "🎈", "💜"];
const confettiColors = [
    "#ff63c3", "#ffd700", "#a78bfa",
    "#67e8f9", "#86efac", "#ffffff", "#ff9b85"
];

// 🎈 Release floating balloons
function launchBalloons(amount = 35) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
        const balloon = document.createElement("div");

        balloon.className = "balloon";
        balloon.textContent =
            balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.fontSize = (28 + Math.random() * 28) + "px";
        balloon.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
        balloon.style.setProperty("--duration", (5 + Math.random() * 5) + "s");
        balloon.style.animationDelay = (Math.random() * 1.5) + "s";

        fragment.appendChild(balloon);

        balloon.addEventListener("animationend", () => {
            balloon.remove();
        }, { once: true });
    }

    balloonContainer.appendChild(fragment);
}

// 🎊 Make confetti rain
function launchConfetti(amount = 140) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");

        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            confettiColors[Math.floor(Math.random() * confettiColors.length)];

        piece.style.width = (5 + Math.random() * 8) + "px";
        piece.style.height = (9 + Math.random() * 12) + "px";

        piece.style.setProperty("--duration", (3 + Math.random() * 3) + "s");
        piece.style.animationDelay = (Math.random() * 1.2) + "s";

        if (Math.random() > 0.5) {
            piece.style.borderRadius = "50%";
        }

        fragment.appendChild(piece);

        piece.addEventListener("animationend", () => {
            piece.remove();
        }, { once: true });
    }

    confettiContainer.appendChild(fragment);
}

// 🎁 Open the birthday surprise
function openSurprise() {
    if (!opened) {
        opened = true;

        birthdayMessage.hidden = false;
        birthdayMessage.classList.remove("reveal");

        // Restart the reveal animation
        void birthdayMessage.offsetWidth;
        birthdayMessage.classList.add("reveal");

        surpriseButton.textContent = "🎉 CELEBRATE AGAIN! 🎉";
        gift.textContent = "🎉";

        // Big celebration on the first click
        launchBalloons(45);
        launchConfetti(180);

        setTimeout(() => {
            birthdayMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 300);

    } else {
        // Extra celebration on every subsequent click
        launchBalloons(25);
        launchConfetti(100);
    }
}

surpriseButton.addEventListener("click", openSurprise);

// The gift itself is also clickable
gift.addEventListener("click", openSurprise);
gift.style.cursor = "pointer";
gift.setAttribute("role", "button");
gift.setAttribute("tabindex", "0");
gift.setAttribute("aria-label", "Open birthday surprise");

gift.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSurprise();
    }
});
