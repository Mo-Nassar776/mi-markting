document.addEventListener('DOMContentLoaded', () => {

    // 1. Language Toggle Logic
    const langBtn = document.getElementById('lang-toggle');
    const html = document.documentElement;
    let currentLang = 'ar'; // Default

    const switchLanguage = (lang) => {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        currentLang = lang;
        langBtn.innerText = lang === 'ar' ? 'EN' : 'AR';

        // Update all elements with data attributes
        document.querySelectorAll('[data-ar]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });

        // Update form placeholders
        if (lang === 'en') {
            document.getElementById('name').placeholder = 'Full Name';
            document.getElementById('email').placeholder = 'Email Address';
            document.getElementById('message').placeholder = 'Your Message';
        } else {
            document.getElementById('name').placeholder = 'الاسم بالكامل';
            document.getElementById('email').placeholder = 'البريد الإلكتروني';
            document.getElementById('message').placeholder = 'رسالتك';
        }

        // Refresh AOS/GSAP if needed
        ScrollTrigger.refresh();
    };

    langBtn.addEventListener('click', () => {
        switchLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });

    // 2. Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => loader.style.display = 'none'
        });
    });

    // 3. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animations
    gsap.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
    });

    // Section Headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Service Cards
    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: i % 3 * 0.1, // Stagger effect per row
            ease: 'power2.out'
        });
    });

    // Refresh everything after a short delay to ensure layout is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    });

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
            btn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                alert(currentLang === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Your message has been received!');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }

    // 6. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.height = '75px';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.height = '90px';
        }
    });

});
