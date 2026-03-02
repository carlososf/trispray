/* ═══════════════════════════════════════
   TRISPRAY — MAIN JAVASCRIPT
═══════════════════════════════════════ */

// ─── Header Scroll ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header && header.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Mobile Menu ───
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        hamburger.classList.toggle('open');
    });
}

// ─── Reveal on Scroll ───
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ─── Count-up Animation ───
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}
const countEls = document.querySelectorAll('.hero__stat-num[data-count]');
const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCount(e.target);
            countObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
countEls.forEach(el => countObs.observe(el));

// ─── Products Filter (produtos.html) ───
const filterBtns = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.produto-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            productItems.forEach(item => {
                const show = cat === 'all' || item.dataset.category === cat;
                item.style.display = show ? '' : 'none';
                if (show) {
                    item.style.animation = 'fadeInUp .4s ease forwards';
                }
            });
        });
    });
}

// ─── Search Products ───
const searchInput = document.getElementById('productSearch');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        productItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(q) ? '' : 'none';
        });
    });
}

// ─── Contact Form ───
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit .btn');
        const orig = btn.textContent;
        btn.textContent = '✓ Enviado! Entraremos em contato.';
        btn.style.background = '#22C55E';
        btn.style.borderColor = '#22C55E';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
            contactForm.reset();
        }, 4000);
    });
}

// ─── Active nav link ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ─── Smooth hash scroll ───
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href').split('#')[1];
        const target = document.getElementById(hash);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── Inject fadeInUp keyframe ───
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}`;
document.head.appendChild(style);
