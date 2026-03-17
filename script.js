// ===== script.js - Smart Tech Solutions =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Get the contact form if it exists on the page
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation on submit
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Get error message elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('formSuccess');
            
            // Reset previous error messages and styling
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            successMessage.textContent = '';
            
            nameInput.style.borderColor = '#cbd5e1';
            emailInput.style.borderColor = '#cbd5e1';
            messageInput.style.borderColor = '#cbd5e1';
            
            // Validation flags
            let isValid = true;
            
            // Validate Name
            const nameValue = nameInput.value.trim();
            if (nameValue === '') {
                nameError.textContent = 'Name is required';
                nameInput.style.borderColor = '#dc2626';
                isValid = false;
            } else if (nameValue.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.style.borderColor = '#dc2626';
                isValid = false;
            } else if (nameValue.length > 50) {
                nameError.textContent = 'Name must be less than 50 characters';
                nameInput.style.borderColor = '#dc2626';
                isValid = false;
            }
            
            // Validate Email
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === '') {
                emailError.textContent = 'Email is required';
                emailInput.style.borderColor = '#dc2626';
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.style.borderColor = '#dc2626';
                isValid = false;
            }
            
            // Validate Message
            const messageValue = messageInput.value.trim();
            if (messageValue === '') {
                messageError.textContent = 'Message is required';
                messageInput.style.borderColor = '#dc2626';
                isValid = false;
            } else if (messageValue.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.style.borderColor = '#dc2626';
                isValid = false;
            } else if (messageValue.length > 500) {
                messageError.textContent = 'Message must be less than 500 characters';
                messageInput.style.borderColor = '#dc2626';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                successMessage.textContent = '✓ Thank you for your message! We will contact you soon.';
                successMessage.style.color = '#10b981';
                
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just log it to console
                console.log('Form submitted successfully:', {
                    name: nameValue,
                    email: emailValue,
                    message: messageValue
                });
                
                // Clear form fields
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                
                // Optional: Send to email service (commented out)
                /*
                // Example using Formspree (uncomment and add your endpoint)
                fetch('https://formspree.io/f/your-form-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: emailValue,
                        message: messageValue
                    })
                })
                .then(response => {
                    if (response.ok) {
                        successMessage.textContent = '✓ Message sent successfully!';
                    } else {
                        successMessage.textContent = '❌ Error sending message. Please try again.';
                        successMessage.style.color = '#dc2626';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    successMessage.textContent = '❌ Error sending message. Please try again.';
                    successMessage.style.color = '#dc2626';
                });
                */
            }
        });
        
        // Real-time validation for better user experience
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Name field real-time validation
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                const nameError = document.getElementById('nameError');
                if (this.value.trim().length >= 2) {
                    this.style.borderColor = '#10b981';
                    nameError.textContent = '✓ Looks good';
                    nameError.style.color = '#10b981';
                } else {
                    this.style.borderColor = '#cbd5e1';
                    nameError.textContent = '';
                }
            });
        }
        
        // Email field real-time validation
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailError = document.getElementById('emailError');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(this.value.trim())) {
                    this.style.borderColor = '#10b981';
                    emailError.textContent = '✓ Valid email';
                    emailError.style.color = '#10b981';
                } else {
                    this.style.borderColor = '#cbd5e1';
                    emailError.textContent = '';
                }
            });
        }
        
        // Message field real-time validation
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                const messageError = document.getElementById('messageError');
                const messageLength = this.value.trim().length;
                
                if (messageLength >= 10 && messageLength <= 500) {
                    this.style.borderColor = '#10b981';
                    messageError.textContent = '✓ Good length';
                    messageError.style.color = '#10b981';
                } else {
                    this.style.borderColor = '#cbd5e1';
                    messageError.textContent = '';
                }
            });
        }
    }
    
    // Smooth scrolling for anchor links (if any)
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
    
    // Add active class to current page in navigation (handled by HTML, but this ensures consistency)
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.endsWith(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    console.log('Smart Tech Solutions website loaded successfully!');
});