document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form submission
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            btn.textContent = 'Отправлено! ✓';
            btn.style.background = '#4ade80';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Navigation background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(74, 74, 74, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    console.log('✨ Сайт-резюме загружен успешно!');
});
// ===== LIGHTBOX FUNCTIONALITY =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const collageItems = document.querySelectorAll('.collage-item img');

// Открытие лайтбокса при клике на картинку
collageItems.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });
});

// Закрытие лайтбокса
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
}

// Закрытие по кнопке
lightboxClose.addEventListener('click', closeLightbox);

// Закрытие по клику на затемнённый фон
lightboxOverlay.addEventListener('click', closeLightbox);

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});