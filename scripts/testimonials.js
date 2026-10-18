const carousel = document.querySelector('.testimonial-carousel');

if (carousel) {
  const slides = [...carousel.querySelectorAll('.testimonial-card')];
  const dots = [...carousel.querySelectorAll('[data-testimonial-dot]')];
  let active = 0;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => { slide.hidden = position !== active; });
    dots.forEach((dot, position) => dot.setAttribute('aria-selected', String(position === active)));
  };
  carousel.querySelector('[data-testimonial-previous]').addEventListener('click', () => show(active - 1));
  carousel.querySelector('[data-testimonial-next]').addEventListener('click', () => show(active + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
}
