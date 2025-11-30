document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count");

  function animateCounter(counter) {
    const target = Number(counter.getAttribute("data-target")) || 0;
    const duration = 2500; 
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); 
      const value = Math.floor(start + (target - start) * progress);
      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target; 
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.dataset.animated) {
            counter.dataset.animated = "true"; 
            animateCounter(counter);
          }
          obs.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  counters.forEach((c) => {
    c.textContent = "0";
    counterObserver.observe(c);
  });

  const revealEls = document.querySelectorAll(".reveal-on-scroll");

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
});
