// Particle System for Hero Background
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 80;
        this.init();
    }

    init() {
        // Create canvas for particles
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        
        const particleContainer = document.querySelector('.particle-container');
        if (particleContainer) {
            particleContainer.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.createParticles();
            this.animate();
        }

        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: `hsla(${270 + Math.random() * 40}, 70%, 70%, ${Math.random() * 0.5 + 0.3})`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 150)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.why-card, .feature-card, .value-item, .demo-container'
        );
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
}

// Email Validation
class EmailSignup {
    constructor() {
        this.init();
    }

    init() {
        const signupBtn = document.querySelector('.signup-btn');
        const emailInput = document.querySelector('.email-input');

        if (signupBtn && emailInput) {
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSignup(emailInput.value);
            });

            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSignup(emailInput.value);
                }
            });
        }
    }

    handleSignup(email) {
        if (this.validateEmail(email)) {
            // Simulate API call
            this.showSuccess();
        } else {
            this.showError('请输入有效的邮箱地址');
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSuccess() {
        const signupBtn = document.querySelector('.signup-btn');
        const originalText = signupBtn.innerHTML;
        
        signupBtn.innerHTML = '<i class="fas fa-check"></i> 成功加入!';
        signupBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        
        setTimeout(() => {
            signupBtn.innerHTML = originalText;
            signupBtn.style.background = 'linear-gradient(135deg, #9333ea, #c084fc)';
        }, 3000);
    }

    showError(message) {
        const emailInput = document.querySelector('.email-input');
        emailInput.style.borderColor = '#ef4444';
        emailInput.placeholder = message;
        
        setTimeout(() => {
            emailInput.style.borderColor = 'rgba(147, 51, 234, 0.3)';
            emailInput.placeholder = '输入你的邮箱';
        }, 3000);
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // Add mobile menu toggle if needed
        if (window.innerWidth <= 768) {
            this.createMobileMenu();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
                this.createMobileMenu();
            }
        });
    }

    createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!nav || !navMenu) return;

        // Create mobile toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: #9333ea;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;

        // Add toggle functionality
        toggleBtn.addEventListener('click', () => {
            this.toggle();
        });

        // Insert toggle button
        nav.appendChild(toggleBtn);
        
        // Style nav menu for mobile
        navMenu.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        `;
    }

    toggle() {
        const navMenu = document.querySelector('.nav-menu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (!navMenu || !toggleBtn) return;

        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            navMenu.style.transform = 'translateY(0)';
            navMenu.style.opacity = '1';
            navMenu.style.pointerEvents = 'auto';
            toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navMenu.style.transform = 'translateY(-100%)';
            navMenu.style.opacity = '0';
            navMenu.style.pointerEvents = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

// Typing Effect for Hero
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize smooth scrolling
    new SmoothScroll();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize email signup
    new EmailSignup();
    
    // Initialize mobile menu
    new MobileMenu();

    // Add fade-in animation styles
    const style = document.createElement('style');
    style.textContent = `
        .why-card, .feature-card, .value-item, .demo-container {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Add glowing cursor effect on feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
});