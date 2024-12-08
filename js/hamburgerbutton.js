const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Add smooth entrance animation for each link
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        setTimeout(() => {
            link.style.transform = navLinks.classList.contains('active') ? 'translateY(0)' : 'translateY(20px)';
            link.style.opacity = navLinks.classList.contains('active') ? '1' : '0.9';
        }, index * 100);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
    }
});