const form = document.getElementById('contact-form');

// Inputs
const nameInput = document.querySelector('[data-testid="test-contact-name"]');
const emailInput = document.querySelector('[data-testid="test-contact-email"]');
const subjectInput = document.querySelector('[data-testid="test-contact-subject"]');
const messageInput = document.querySelector('[data-testid="test-contact-message"]');

// Error spans
const errors = {
  name: document.querySelector('[data-testid="test-contact-error-name"]'),
  email: document.querySelector('[data-testid="test-contact-error-email"]'),
  subject: document.querySelector('[data-testid="test-contact-error-subject"]'),
  message: document.querySelector('[data-testid="test-contact-error-message"]'),
};

// Success box
const successBox = document.querySelector('[data-testid="test-contact-success"]');

// Helper — email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show errors
function showError(field, message) {
  const el = errors[field];
  el.textContent = message;
  el.hidden = false;
}

//clear errors
function clearError(field) {
  const el = errors[field];
  el.textContent = '';
  el.hidden = true;
}

// Validate individual fields (used on blur or input)
function validateField(field) {
  const value = field.value.trim();
  const id = field.dataset.testid.split('-').pop(); // name, email, subject, message

  switch (id) {
    case 'name':
      if (!value) showError('name', 'Full name is required.');
      else clearError('name');
      break;

    case 'email':
      if (!value) showError('email', 'Email is required.');
      else if (!validateEmail(value))
        showError('email', 'Please enter a valid email (name@example.com).');
      else clearError('email');
      break;

    case 'subject':
      if (!value) showError('subject', 'Subject is required.');
      else clearError('subject');
      break;

    case 'message':
      if (!value) showError('message', 'Message is required.');
      else if (value.length < 10)
        showError('message', 'Message must be at least 10 characters.');
      else clearError('message');
      break;
  }
}

// Validate on typing or leaving the field
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    validateField(input);

    // Hide success if anything is empty again
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      !subjectInput.value.trim() ||
      !messageInput.value.trim()
    ) {
      successBox.hidden = true;
    }
  });

  input.addEventListener('blur', () => validateField(input));
});

// Form submission — final validation
form.addEventListener('submit', e => {
  e.preventDefault();

  validateField(nameInput);
  validateField(emailInput);
  validateField(subjectInput);
  validateField(messageInput);

  const hasError = Object.values(errors).some(el => !el.hidden);
  if (hasError) return;

  // All valid
  successBox.hidden = false;
  successBox.focus();
  form.reset();
});
