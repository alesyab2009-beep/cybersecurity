// ===== SCROLL ANIMATION =====
// Watches every element with class="reveal". When one scrolls into view,
// it gets the class "visible", and the CSS fades it in.
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);   // only animate once
    }
  });
}, { threshold: 0.15 });                  // 0.15 = animate when 15% of it is on screen

revealItems.forEach((item) => observer.observe(item));

// ===== FOOTER YEAR =====
// Puts the current year in the footer so you never have to update it.
document.getElementById('year').textContent = new Date().getFullYear();
// ===== CURSOR FOLLOWING GLOW =====

document.addEventListener("mousemove", (event) => {
    document.documentElement.style.setProperty(
        "--mouse-x",
        event.clientX + "px"
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        event.clientY + "px"
    );
});



// PIXEL ROBOT EYE TRACKING
const robot = document.getElementById("robot-svg");
const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");

if (robot && leftEye && rightEye) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function moveRobotEyes() {
        const rect = robot.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(
            mouseY - centerY,
            mouseX - centerX
        );

        const distance = 1.5;

        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        // Smooth eye movement
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        leftEye.setAttribute(
            "transform",
            `translate(${currentX}, ${currentY})`
        );

        rightEye.setAttribute(
            "transform",
            `translate(${currentX}, ${currentY})`
        );

        requestAnimationFrame(moveRobotEyes);
    }

    moveRobotEyes();
}

