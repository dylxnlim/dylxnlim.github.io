document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a'); // Select all nav links

    // Function to close the menu
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    // Toggle menu on hamburger click
    if (hamburger) { // Added a check to ensure hamburger exists
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    } else {
        console.warn('Hamburger element not found. Hamburger menu might not work.');
    }


    // Close menu when a navigation link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu if window is resized above mobile breakpoint (e.g., 768px)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
});
