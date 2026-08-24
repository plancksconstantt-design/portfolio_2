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


    // ==========================================
    // 6. SMM STORIES SLIDER
    // ==========================================
    const storiesContainer = document.querySelector('.stories-container');
    
    if (storiesContainer) {
        const slides = storiesContainer.querySelectorAll('.story-slide');
        const progressBars = storiesContainer.querySelectorAll('.progress-bar');
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 4000; // 4 секунды на сторис
        
        function showSlide(index) {
            // Убираем активный класс у всех
            slides.forEach(slide => slide.classList.remove('active'));
            progressBars.forEach(bar => {
                bar.classList.remove('active');
                bar.classList.remove('completed');
            });
            
            // Показываем текущий слайд
            slides[index].classList.add('active');
            progressBars[index].classList.add('active');
            
            // Отмечаем предыдущие как завершенные
            for (let i = 0; i < index; i++) {
                progressBars[i].classList.add('completed');
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Запускаем автоматическое переключение
        function startSlider() {
            showSlide(0);
            slideInterval = setInterval(nextSlide, slideDuration);
        }
        
        // Останавливаем при наведении
        storiesContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Возобновляем при уходе мыши
        storiesContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, slideDuration);
        });
        
        // Запускаем слайдер
        startSlider();
    }

// ===== SMM STORIES AUTO-SWITCH =====
const storySlides = document.querySelectorAll('.story-slide');
const progressBars = document.querySelectorAll('.progress-bar');
let currentStory = 0;
let storyInterval;

function showStory(index) {
    // Скрыть все сторис
    storySlides.forEach(slide => slide.classList.remove('active'));
    progressBars.forEach(bar => {
        bar.classList.remove('active', 'completed');
    });
    
    // Показать текущую
    if (storySlides[index]) {
        storySlides[index].classList.add('active');
    }
    
    // Обновить прогресс-бары
    for (let i = 0; i <= index; i++) {
        if (progressBars[i]) {
            if (i < index) {
                progressBars[i].classList.add('completed');
            } else {
                progressBars[i].classList.add('active');
            }
        }
    }
    
    currentStory = index;
}

function nextStory() {
    const next = (currentStory + 1) % storySlides.length;
    showStory(next);
}

// Запуск автопереключения
if (storySlides.length > 0) {
    showStory(0);
    storyInterval = setInterval(nextStory, 4000); // 4 секунды на сторис
    
    // Пауза при наведении
    const storiesContainer = document.querySelector('.stories-container');
    if (storiesContainer) {
        storiesContainer.addEventListener('mouseenter', () => {
            clearInterval(storyInterval);
        });
        
        storiesContainer.addEventListener('mouseleave', () => {
            storyInterval = setInterval(nextStory, 4000);
        });
    }
}




});