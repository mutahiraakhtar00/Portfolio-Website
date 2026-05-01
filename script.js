document.addEventListener("DOMContentLoaded", () => {

  console.log("JS LOADED");

  /* =========================
     HAMBURGER MENU
  ========================== */
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

  /* =========================
     MODAL SYSTEM
  ========================== */

  const cards = document.querySelectorAll(".project-card");

  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img");
  const viewLink = document.getElementById("view-link");

  const closeBtn = document.querySelector(".close");
  const leftZone = document.querySelector(".left-zone");
  const rightZone = document.querySelector(".right-zone");

  let currentIndex = 0;

  function showProject(index) {
    const card = cards[index];
    if (!card) return;

    title.textContent = card.dataset.title || "";
    desc.textContent = card.dataset.desc || "";
    modalImg.src = card.dataset.img || "";
    viewLink.href = card.dataset.link || "#";
  }

  function openModal(index) {
    currentIndex = index;
    showProject(currentIndex);
    modal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function nextProject() {
    currentIndex = (currentIndex + 1) % cards.length;
    showProject(currentIndex);
  }

  function prevProject() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showProject(currentIndex);
  }

  // OPEN CARD
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;

    openModal([...cards].indexOf(card));
  });

  // CLOSE BUTTON
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // CLICK OUTSIDE MODAL
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // NEXT / PREV BUTTONS

 const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function switchProject(index) {

  const content = document.querySelector(".modal-content");

  content.classList.add("switching");

  setTimeout(() => {

    const card = cards[index];

    title.textContent = card.dataset.title;
    desc.textContent = card.dataset.desc;
    modalImg.src = card.dataset.img;
    viewLink.href = card.dataset.link;

    currentIndex = index;

    content.classList.remove("switching");

  }, 150);
}

// NEXT
nextBtn.addEventListener("click", () => {
  switchProject((currentIndex + 1) % cards.length);
});

// PREV
prevBtn.addEventListener("click", () => {
  switchProject((currentIndex - 1 + cards.length) % cards.length);
});

  /* =========================
     SCROLL REVEAL ANIMATION
  ========================== */

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(el => observer.observe(el));

  /* =========================
     PAGE LOAD ANIMATION
  ========================== */

window.addEventListener("load", () => {
  document.querySelector(".page").classList.add("loaded");
});

});


// about page time animation

 


document.addEventListener("DOMContentLoaded", () => {

  console.log("TIMELINE SCRIPT LOADED");

  const items = document.querySelectorAll(".timeline-item");

  if (!items || items.length === 0) {
    console.log("No timeline items found");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => observer.observe(item));

});