document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Сайт-резюме загружен успешно!');

    // ==========================================
    // 1. ПЛАВНАЯ ПРОКРУТКА (Smooth Scroll)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Защита от пустых ссылок
            
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

    // ==========================================
    // 2. ОТПРАВКА ФОРМЫ (Если она есть на странице)
    // ==========================================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            if (!btn) return;
            
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

    // ==========================================
    // 3. АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Опционально: перестать наблюдать после появления для экономии ресурсов
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 4. ФОН НАВИГАЦИИ ПРИ СКРОЛЛЕ
    // ==========================================
    const nav = document.querySelector('.nav');
    if (nav) {
        // { passive: true } улучшает производительность скролла
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 20px rgba(74, 74, 74, 0.1)';
                nav.style.background = 'rgba(245, 243, 240, 0.95)';
            } else {
                nav.style.boxShadow = 'none';
                nav.style.background = 'rgba(245, 243, 240, 0.9)';
            }
        }, { passive: true });
    }

       // ==========================================
    // 5. LIGHTBOX (Модальное окно для картинок)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.querySelector('.lightbox__overlay');

    if (lightbox && lightboxImage) {
        // Выбираем и картинки, и их родительские блоки-триггеры для максимальной надежности
        const lightboxTriggers = document.querySelectorAll('.collage-item img, .lightbox-img, .lightbox-trigger');

        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                // Находим саму картинку (если кликнули по div-обертке или по svg внутри нее)
                const img = this.tagName === 'IMG' ? this : this.querySelector('img');
                if (!img) return;

                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || 'Увеличенное изображение';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
            });
        });

        // Функция закрытия
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем скролл
            
            // Очищаем src после анимации закрытия
            setTimeout(() => {
                lightboxImage.src = '';
            }, 300); 
        }

        // Закрытие по кнопке (крестик)
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Закрытие по клику на затемнённый фон
        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', closeLightbox);
        }

        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }



});