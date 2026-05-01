document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    });
  }

});

// page refresh animation

document.addEventListener("DOMContentLoaded", () => {

  const page = document.querySelector(".page");

  if (page) {
    requestAnimationFrame(() => {
      page.classList.add("loaded");
    });
  }

});

//reveal cards animation

document.addEventListener("DOMContentLoaded", () => {

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const index = [...reveals].indexOf(entry.target);

        // 🔥 STAGGER DELAY (core effect)
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 80); // 80ms gap between each

      }

    });

  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  });

  reveals.forEach(el => observer.observe(el));

});

//animation fix for homepage (sometimes cards don't animate on page load)

document.addEventListener("DOMContentLoaded", () => {

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  reveals.forEach(el => observer.observe(el));

  // 🔥 IMPORTANT FIX FOR HOMEPAGE
  setTimeout(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight) {
        el.classList.add("active");
      }
    });
  }, 100);

});


//animations for hero section animation of words 


document.addEventListener("DOMContentLoaded", () => {


const textElement = document.querySelector(".typing-text");

if (textElement) {

  const words = [
    "Designer",
    "Storyteller",
    "Presentation Expert",
    "Visual Communicator"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1200;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

});

//cursor glow effect

document.addEventListener("DOMContentLoaded", () => {

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

});

//page transition effect when clicking links

document.addEventListener("DOMContentLoaded", () => {

const transition = document.querySelector(".page-transition");

// PAGE LOAD (fade in effect)
window.addEventListener("load", () => {
  if (transition) {
    transition.classList.remove("active");
  }
});

// PAGE LEAVE (smooth fade out)
document.querySelectorAll("a[href]").forEach(link => {
  const href = link.getAttribute("href");

  // ignore external links + anchors
  if (!href || href.startsWith("#") || href.startsWith("http")) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();

    if (transition) {
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    } else {
      window.location.href = href;
    }
  });
});

});


//magnetic hover effect for buttons

document.addEventListener("DOMContentLoaded", () => {

const magneticItems = document.querySelectorAll(".hero-cta, .view-btn, .nav-btn");

magneticItems.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0,0) scale(1)";
  });
});

});

//message send success popup


document.addEventListener("DOMContentLoaded", () => {

  emailjs.init("9pnj6YnBWT84XZSZ2");

  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_cddrpse",
      "template_v8854lg",
      this
    ).then(() => {

      const popup = document.getElementById("successPopup");
      if (popup) popup.classList.add("active");

      form.reset();

      setTimeout(() => {
        if (popup) popup.classList.remove("active");
      }, 3000);

    }).catch((err) => {
      console.log("FAILED...", err);
    });
  });

});

