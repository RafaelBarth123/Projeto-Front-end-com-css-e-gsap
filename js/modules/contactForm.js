// ==========================================================================
// Contact form — client-side only demo submission with animated feedback.
// ==========================================================================

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Preencha os campos obrigatórios.';
      gsap.fromTo(status, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    status.textContent = 'Enviando...';
    setTimeout(() => {
      status.textContent = 'Mensagem enviada! Nossa equipe entrará em contato em breve.';
      gsap.fromTo(status, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5 });
      form.reset();
    }, 900);
  });
}
