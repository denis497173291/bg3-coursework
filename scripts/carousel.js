document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    document.querySelector(".slides").style.transform = `translateX(-${i*100}%)`;
  }

  // Автослайд каждые 5 секунд
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
});
