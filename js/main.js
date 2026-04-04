// ========================================
// MD's Removal Service - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll animations ----------
  const animateElements = document.querySelectorAll(
    '.service-card, .process-step, .area-card, .testimonial-card, .about-content, .about-image, .contact-info, .contact-form-wrapper'
  );

  animateElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Contact form handling ----------
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const from = formData.get('from');
    const to = formData.get('to');
    const date = formData.get('date');
    const items = formData.get('items');
    const fragile = formData.get('fragile');
    const accessPickup = formData.get('access_pickup');
    const accessDropoff = formData.get('access_dropoff');
    const parking = formData.get('parking');
    const services = formData.getAll('services');
    const message = formData.get('message');

    // Build email body
    const subject = encodeURIComponent(`Moving Quote Request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n\n` +
      `LOCATIONS\n` +
      `Pickup: ${from}\n` +
      `Drop-off: ${to}\n` +
      `Preferred Date: ${date || 'Not specified'}\n\n` +
      `ITEMS\n` +
      `Large Items: ${items || 'Not specified'}\n` +
      `Fragile Items: ${fragile || 'Not specified'}\n\n` +
      `ACCESS & PARKING\n` +
      `Pickup Access: ${accessPickup || 'Not specified'}\n` +
      `Drop-off Access: ${accessDropoff || 'Not specified'}\n` +
      `Parking: ${parking || 'Not specified'}\n\n` +
      `ADDITIONAL SERVICES\n` +
      `${services.length > 0 ? services.join(', ') : 'None selected'}\n\n` +
      `OTHER NOTES\n${message || 'None'}`
    );

    // Open mail client with pre-filled info
    window.location.href = `mailto:removalanddeliveryja@gmail.com?subject=${subject}&body=${body}`;

    // Show success feedback
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Opening Email Client...';
    btn.style.background = 'var(--accent)';
    btn.style.borderColor = 'var(--accent)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3000);
  });

  // ---------- Active nav link highlighting ----------
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.style.color = '';
          link.classList.add('nav-active');
        } else {
          link.classList.remove('nav-active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
});
