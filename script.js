// ...existing code...
(function () {
    "use strict";

    /* ---------- Hero slider ---------- */
    const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
    const dotsContainer = document.querySelector('.slider-dots');

    if (slides.length) {
        // normalize active slide (if multiple in HTML)
        let current = slides.findIndex(s => s.classList.contains('active'));
        if (current === -1) current = 0;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));

        // regenerate dots to match slides count
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === current ? ' active' : '');
                dot.dataset.slide = i;
                dot.title = `Go to slide ${i + 1}`;
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }

        const showSlide = (index) => {
            slides.forEach((s, i) => {
                const content = s.querySelector('.slide-content');
                s.classList.toggle('active', i === index);
                if (content) {
                    // add a small reflow trick so fade-in retriggers reliably
                    content.classList.remove('fade-in');
                    if (i === index) {
                        void content.offsetWidth;
                        content.classList.add('fade-in');
                    }
                }
            });
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
            }
            current = index;
        };

        let interval = null;
        const next = () => showSlide((current + 1) % slides.length);
        const prev = () => showSlide((current - 1 + slides.length) % slides.length);

        const start = (ms = 5000) => {
            stop();
            interval = setInterval(next, ms);
        };
        const stop = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
        const goTo = (i) => {
            showSlide(i);
            start();
        };

        // start slider
        start();

        // pause on hover / resume on leave
        const sliderEl = document.querySelector('.hero-slider');
        if (sliderEl) {
            sliderEl.addEventListener('mouseover', stop);
            sliderEl.addEventListener('mouseleave', start);
        }

        // keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
            if (e.key === 'ArrowRight') { stop(); next(); start(); }
            if (e.key === 'ArrowLeft') { stop(); prev(); start(); }
        });
    }

    /* ---------- Hamburger / mobile nav toggle ---------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('nav-open');
        });

        // close when clicking outside
        document.addEventListener('click', (evt) => {
            if (!navMenu.contains(evt.target) && !hamburger.contains(evt.target)) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
                document.body.classList.remove('nav-open');
            }
        });
    }

    /* ---------- Fade-in sections (reveal on scroll) ---------- */
    const faders = document.querySelectorAll('.fade-in-section');
    if (faders.length) {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        entry.target.classList.remove('hidden');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            faders.forEach(f => {
                if (!f.classList.contains('visible')) f.classList.add('hidden');
                io.observe(f);
            });
        } else {
            // fallback: reveal all immediately
            faders.forEach(f => f.classList.add('visible'));
        }
    }

    /* ---------- Smooth scroll for internal anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* ---------- Product "learn more" -> WhatsApp handler ---------- */
    const productButtons = document.querySelectorAll(".btn-secondary");
    if (productButtons.length) {
        productButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const card = e.currentTarget.closest(".product-card");
                if (!card) return;
                const titleEl = card.querySelector("h3");
                const productName = titleEl ? titleEl.innerText.trim() : "your product";
                const message = `Hello, I’d like to learn more about ${productName}.`;
                const whatsappURL = `https://wa.me/260961111468?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, "_blank");
            });
        });
    }

    /* ---------- Defensive: avoid errors if script loaded before DOM fully parsed ---------- */
    // Script is included at end of body; if you move it to head wrap in DOMContentLoaded.
})();
// ...existing code...
