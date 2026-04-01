/* ========================================
   PULSE MARKETING 2.0 - INTERAÇÕES PREMIUM
   Performance 60fps + Micro-interações + Conversão Máxima
=========================================== */

class PulseMarketing {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.preloader();
            this.navbarScroll();
            this.scrollAnimations();
            this.counterAnimation();
            this.formHandler();
            this.mobileMenu();
            this.heroParallax();
            this.cardHoverEffects();
        });
    }

    // 1. Preloader Ultra Suave
    preloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            });
        }
    }

    // 2. Navbar Inteligente
    navbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                navbar.style.height = '70px';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
                navbar.style.height = '80px';
            }

            // Hide/Show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // 3. Scroll Reveal Animations (GSAP-like)
    scrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe todos os elementos animáveis
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // 4. Contadores Animados
    counterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseFloat(counter.dataset.target);
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = current < 10 ? current.toFixed(0) : current.toFixed(1);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = counter.dataset.target;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 5. Form WhatsApp Ultra Conversor
    formHandler() {
        const form = document.getElementById('pulseForm');
        if (!form) return;

        // Máscara de telefone
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value.substring(0, 15);
            });
        }

        // Submit Handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendWhatsApp(form);
        });
    }

    sendWhatsApp(form) {
        const businessName = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const budget = form.querySelector('select:nth-of-type(1)').value;
        const challenge = form.querySelector('select:nth-of-type(2)').value;

        // Validação
        if (!businessName || !phone || !budget) {
            this.showNotification('Preencha todos os campos obrigatórios! 🚀', 'error');
            return;
        }

        const submitBtn = form.querySelector('.btn-cta');
        const originalText = submitBtn.innerHTML;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Mensagem otimizada
        const message = `🚀 *NOVO LEAD - PULSE MARKETING* %0A%0A` +
                       `*🏢 Empresa:* ${businessName}%0A` +
                       `*📱 WhatsApp:* ${phone}%0A` +
                       `*💰 Investimento:* R$ ${budget}%0A` +
                       `*🎯 Desafio:* ${challenge}%0A%0A` +
                       `Status: *Lead Quente do Site* 🔥`;

        const whatsappUrl = `https://wa.me/5541987613156?text=${encodeURIComponent(message)}`;

        // Delay realista + feedback
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            // Success feedback
            this.showNotification('✅ Diagnóstico enviado! Em breve te respondo no Whats!', 'success');
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    // 6. Notificações Toast
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `toast toast-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animação
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // 7. Mobile Menu
    mobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (!mobileMenu || !navMenu) return;

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 8. Hero Parallax
    heroParallax() {
        const heroCards = document.querySelectorAll('.floating-card');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroCards.forEach((card, index) => {
                const speed = (index + 1) * 0.02;
                const xMove = (x - 0.5) * speed * 20;
                const yMove = (y - 0.5) * speed * 20;
                
                card.style.transform = `translate(${xMove}px, ${yMove}px) rotateY(${x * 10}deg)`;
            });
        });
    }

    // 9. Card Hover Effects Avançados
    cardHoverEffects() {
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Inicialização Global
new PulseMarketing();

// 10. Smooth Scroll para Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 11. CSS Toast Styles (injetado dinamicamente)
const toastStyles = `
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-lg);
}
.toast-success { background: linear-gradient(135deg, #10b981, #059669); }
.toast-error { background: linear-gradient(135deg, #ef4444, #dc2626); }
.toast.show { transform: translateX(0); opacity: 1; }
`;

const style = document.createElement('style');
style.textContent = toastStyles;
document.head.appendChild(style);