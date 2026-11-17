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

//little robot
const robot = document.getElementById("robot-svg");
const leftPupil = document.getElementById("left-pupil");
const rightPupil = document.getElementById("right-pupil");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = 0;
let currentY = 0;

let targetX = 0;
let targetY = 0;

// Track mouse position
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Calculate where the pupils should look
function updateRobotEyes() {
  const robotPosition = robot.getBoundingClientRect();

  const robotCenterX =
    robotPosition.left + robotPosition.width / 2;

  const robotCenterY =
    robotPosition.top + robotPosition.height / 2;

  const angle = Math.atan2(
    mouseY - robotCenterY,
    mouseX - robotCenterX
  );

  const distance = 3.5;

  targetX = Math.cos(angle) * distance;
  targetY = Math.sin(angle) * distance;

  // Smooth eye movement
  currentX += (targetX - currentX) * 0.15;
  currentY += (targetY - currentY) * 0.15;

  leftPupil.setAttribute(
    "transform",
    `translate(${currentX}, ${currentY})`
  );

  rightPupil.setAttribute(
    "transform",
    `translate(${currentX}, ${currentY})`
  );

  requestAnimationFrame(updateRobotEyes);
}

updateRobotEyes();
