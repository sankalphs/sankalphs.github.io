// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
    
    // Function to calculate offset based on header height
    function getHeaderOffset() {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
        return headerHeight + 20; // Add some extra space
    }
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Use scrollIntoView with options for smoother scrolling
                window.scrollTo({
                    top: targetElement.offsetTop - getHeaderOffset(),
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // Scroll icon click handler
    const scrollIcon = document.querySelector('.scroll-icon-container');
    if (scrollIcon) {
        scrollIcon.addEventListener('click', () => {
            // Scroll to the about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - getHeaderOffset(),
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section, main.hero-section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function highlightNavLink() {
        let currentSection = '';
        const headerOffset = getHeaderOffset();
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Navbar background change on scroll
    const header = document.querySelector('.header');
    
    function toggleHeaderBackground() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', toggleHeaderBackground);
    
    // Parallax effect for mouse movement
    const heroSection = document.querySelector('.hero-section');
    const heroText = document.querySelector('.hero-text');
    
    if (heroSection && heroText) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle movement effect
            heroText.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
        });
    }
    
    // Reset transform when mouse leaves
    if (heroSection) {
        heroSection.addEventListener('mouseleave', () => {
            if (heroText) {
                heroText.style.transform = 'translate(0, 0)';
            }
        });
    }
    
    // Add click event listeners to project buttons
    document.querySelectorAll('.view-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder for future project detail functionality
            alert('Project details coming soon!');
        });
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });

    // --- Windows 95 Start menu + Clock ---
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    const clockEl = document.getElementById('taskbar-clock');

    if (startBtn && startMenu) {
        startBtn.addEventListener('click', () => {
            const isOpen = startMenu.classList.toggle('open');
            startBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            startMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
                startMenu.classList.remove('open');
                startBtn.setAttribute('aria-expanded', 'false');
                startMenu.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function pad(n){ return n.toString().padStart(2, '0'); }
    function updateClock(){
        if (!clockEl) return;
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        clockEl.textContent = `${pad(h)}:${pad(m)}`;
    }
    updateClock();
    setInterval(updateClock, 15000);
});
