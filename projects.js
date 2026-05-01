document.addEventListener("DOMContentLoaded", () => {

  console.log("PROJECTS JS RUNNING");

  /* =====================
     ELEMENT CHECK
  ====================== */

  const cards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("modal");

  console.log("Cards found:", cards.length);
  console.log("Modal found:", modal);

  if (!cards.length || !modal) {
    console.log("STOPPED: missing elements");
    return;
  }

  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img");
  const viewLink = document.getElementById("view-link");

  const closeBtn = document.querySelector(".close");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  let currentIndex = 0;

  function show(index) {
    const card = cards[index];

    if (!card) {
      console.log("Invalid index:", index);
      return;
    }

    console.log("Showing card:", index);

    title.textContent = card.dataset.title || "";
    desc.textContent = card.dataset.desc || "";
    modalImg.src = card.dataset.img || "";
    viewLink.href = card.dataset.link || "#";
  }

  function open(index) {
    currentIndex = index;
    show(currentIndex);
    modal.classList.add("show");
  }

  function close() {
    modal.classList.remove("show");
  }

  /* =====================
     CARD CLICK
  ====================== */

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");

    if (!card) return;

    console.log("Card clicked");

    open([...cards].indexOf(card));
  });

  /* =====================
     CLOSE
  ====================== */

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  } else {
    console.log("Close button missing");
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  }

  /* =====================
     NEXT / PREV
  ====================== */

  if (nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      show(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      show(currentIndex);
    });

  } else {
    console.log("Nav buttons missing");
  }

});
