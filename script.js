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


// Little robot eyes follow the cursor
const robot = document.getElementById("robot-svg");
const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");

if (robot && leftEye && rightEye) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function moveRobotEyes() {
    const robotRect = robot.getBoundingClientRect();

    const robotX = robotRect.left + robotRect.width / 2;
    const robotY = robotRect.top + robotRect.height / 2;

    const angle = Math.atan2(mouseY - robotY, mouseX - robotX);

    const eyeX = Math.cos(angle) * 1.5;
    const eyeY = Math.sin(angle) * 1.5;

    leftEye.setAttribute("transform", `translate(${eyeX}, ${eyeY})`);
    rightEye.setAttribute("transform", `translate(${eyeX}, ${eyeY})`);

    requestAnimationFrame(moveRobotEyes);
  }

  moveRobotEyes();
}
