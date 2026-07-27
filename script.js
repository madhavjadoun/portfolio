/**
 * Personal Portfolio JavaScript
 * Developer: Madhav Pratap Singh
 * Description: Interactive functionality including navigation, modal dialogs,
 *              show/hide toggle, smooth scrolling, and form validation.
 */

// Wait until the DOM content is fully loaded before attaching handlers
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE MENU NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        // Toggle mobile navigation menu visibility
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close mobile nav when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       2. CUSTOM MODAL POPUP DIALOG SYSTEM
       ========================================================================== */
    const customModal = document.getElementById('custom-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDismissBtn = document.getElementById('modal-dismiss-btn');
    const modalActionBtn = document.getElementById('modal-action-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    /**
     * Open custom modal dialog with dynamic title, message, and action button
     */
    function showModal(title, message, actionText = 'Go to Contact Form', actionHref = '#contact') {
        if (!customModal) return;
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalMessage) modalMessage.innerHTML = message;
        
        if (modalActionBtn) {
            if (actionText && actionHref) {
                modalActionBtn.style.display = 'inline-flex';
                modalActionBtn.textContent = actionText;
                modalActionBtn.setAttribute('href', actionHref);
            } else {
                modalActionBtn.style.display = 'none';
            }
        }
        
        customModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Close modal dialog
     */
    function closeModal() {
        if (!customModal) return;
        customModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Close modal event listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
    if (modalActionBtn) modalActionBtn.addEventListener('click', closeModal);

    // Close on clicking backdrop overlay outside modal card
    if (customModal) {
        customModal.addEventListener('click', (e) => {
            if (e.target === customModal) {
                closeModal();
            }
        });
    }

    // Close on Escape keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && customModal && customModal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ==========================================================================
       3. HIRE ME BUTTON (TRIGGERS MODAL)
       ========================================================================== */
    const hireMeBtn = document.getElementById('hire-me-btn');
    
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', () => {
            showModal(
                "Work With Me",
                "Thank you for your interest! I am available for full-stack developer roles and freelance projects. Please send a message or email me directly at <strong>madhavjadaun9@gmail.com</strong>.",
                "Send Message",
                "#contact"
            );
        });
    }

    /* ==========================================================================
       4. SHOW / HIDE "MORE ABOUT ME" TOGGLE
       ========================================================================== */
    const toggleAboutBtn = document.getElementById('toggle-about-btn');
    const moreAboutContent = document.getElementById('more-about-content');

    if (toggleAboutBtn && moreAboutContent) {
        toggleAboutBtn.addEventListener('click', () => {
            const isShowing = moreAboutContent.classList.toggle('show');

            // Update button text depending on visible state
            if (isShowing) {
                toggleAboutBtn.textContent = 'Show Less About Me';
            } else {
                toggleAboutBtn.textContent = 'Show More About Me';
            }
        });
    }

    /* ==========================================================================
       5. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop - 100;
            const sectionId = currentSection.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    /* ==========================================================================
       6. SCROLL-TO-TOP BUTTON
       ========================================================================== */
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        // Show scroll-to-top button when page is scrolled down past 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       7. CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');

    /**
     * Helper function to validate email format using standard Regex
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Clear error state for an input element
     */
    function clearError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    /**
     * Display error message for an input element
     */
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Input event listeners to clear error messages while typing
    if (nameInput) {
        nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    }
    if (messageInput) {
        messageInput.addEventListener('input', () => clearError(messageInput, messageError));
    }

    // Form Submission Handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page refresh

            let isValid = true;
            formStatus.className = 'form-status-message';
            formStatus.textContent = '';

            // 1. Validate Name
            const nameValue = nameInput.value.trim();
            if (nameValue === '') {
                showError(nameInput, nameError, 'Please enter your name.');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            // 2. Validate Email
            const emailValue = emailInput.value.trim();
            if (emailValue === '') {
                showError(emailInput, emailError, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // 3. Validate Message
            const messageValue = messageInput.value.trim();
            if (messageValue === '') {
                showError(messageInput, messageError, 'Please enter your message.');
                isValid = false;
            } else if (messageValue.length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters long.');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }

            // If all fields are valid, display success feedback and reset form
            if (isValid) {
                formStatus.textContent = 'Thank you, ' + nameValue + '! Your message has been sent successfully.';
                formStatus.classList.add('success');

                // Reset form fields
                contactForm.reset();

                // Automatically hide success status message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.textContent = '';
                }, 5000);
            }
        });
    }

    /* ==========================================================================
       8. DEMO BUTTON MODAL FOR UPCOMING PROJECTS
       ========================================================================== */
    const demoBtns = document.querySelectorAll('.demo-btn');
    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(
                "Task & Workflow Manager",
                "Live demo preview for this project is currently being deployed! In the meantime, you can explore the source code on GitHub.",
                "Visit GitHub",
                "https://github.com"
            );
        });
    });

});
