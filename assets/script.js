// Cambiá este número por el tuyo: código de país + código de área + número, sin + ni espacios (ej. 5491112345678)
const WHATSAPP_NUMBER = '5491164227116';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const items = document.querySelectorAll('.project-card, .services-grid > div, .about > div, .contact');
  items.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--delay', `${Math.min(index * 45, 260)}ms`);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.project-card');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.toggle('active', c === chip));
    cards.forEach(card => { card.hidden = chip.dataset.filter !== 'todos' && card.dataset.cat !== chip.dataset.filter; });
  }));
});
