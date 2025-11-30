
    const counters = document.querySelectorAll('.count');

    function animateCounter(counter) {
      const target = +counter.getAttribute('data-target');
      const speed = 250; // higher = slower
      const current = +counter.innerText;
      const increment = Math.max(1, Math.floor(target / speed));

      if (current < target) {
        counter.innerText = current + increment;
        requestAnimationFrame(() => animateCounter(counter));
      } else {
        counter.innerText = target;
      }
    }

    counters.forEach(counter => animateCounter(counter));