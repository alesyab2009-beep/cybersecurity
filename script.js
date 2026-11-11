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
