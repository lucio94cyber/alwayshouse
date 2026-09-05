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
});
