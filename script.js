/**
 * Contact Form JavaScript
 * Handles form validation, error states, and success feedback
 */

// ===== DOM ELEMENTS =====
const form = document.getElementById('contactForm');
const successDialog = document.getElementById('successDialog');

// Form fields
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const queryTypeInputs = document.querySelectorAll('input[name="queryType"]');
const messageInput = document.getElementById('message');
const consentInput = document.getElementById('consent');

// Error message containers
const firstNameError = document.getElementById('firstName-error');
const lastNameError = document.getElementById('lastName-error');
const emailError = document.getElementById('email-error');
const queryTypeError = document.getElementById('queryType-error');
const messageError = document.getElementById('message-error');
const consentError = document.getElementById('consent-error');

// ===== VALIDATION FUNCTIONS =====

/**
 * Validates if a field is not empty
 * @param {string} value - The field value to validate
 * @returns {boolean} True if the field is not empty
 */
const isNotEmpty = (value) => {
  return value.trim().length > 0;
};

/**
 * Validates email format using regex
 * @param {string} email - The email to validate
 * @returns {boolean} True if email format is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a radio button is selected
 * @param {NodeList} radioInputs - The radio button inputs
 * @returns {boolean} True if one option is selected
 */
const isRadioSelected = (radioInputs) => {
  return Array.from(radioInputs).some(input => input.checked);
};

/**
 * Validates if checkbox is checked
 * @param {HTMLInputElement} checkbox - The checkbox input
 * @returns {boolean} True if checkbox is checked
 */
const isCheckboxChecked = (checkbox) => {
  return checkbox.checked;
};

// ===== ERROR MESSAGE CONSTANTS =====
const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  QUERY_TYPE_REQUIRED: 'Please select a query type',
  CONSENT_REQUIRED: 'To submit this form, please consent to being contacted'
};

// ===== FIELD VALIDATION FUNCTIONS =====

/**
 * Validates first name field
 * @returns {boolean} True if valid
 */
const validateFirstName = () => {
  const value = firstNameInput.value;
  const isValid = isNotEmpty(value);
  
  if (!isValid) {
    showFieldError(firstNameInput, firstNameError, ERROR_MESSAGES.REQUIRED);
  } else {
    clearFieldError(firstNameInput, firstNameError);
  }
  
  return isValid;
};

/**
 * Validates last name field
 * @returns {boolean} True if valid
 */
const validateLastName = () => {
  const value = lastNameInput.value;
  const isValid = isNotEmpty(value);
  
  if (!isValid) {
    showFieldError(lastNameInput, lastNameError, ERROR_MESSAGES.REQUIRED);
  } else {
    clearFieldError(lastNameInput, lastNameError);
  }
  
  return isValid;
};

/**
 * Validates email field
 * @returns {boolean} True if valid
 */
const validateEmail = () => {
  const value = emailInput.value;
  const isEmpty = !isNotEmpty(value);
  const isInvalidFormat = !isEmpty && !isValidEmail(value);
  
  if (isEmpty) {
    showFieldError(emailInput, emailError, ERROR_MESSAGES.REQUIRED);
    return false;
  } else if (isInvalidFormat) {
    showFieldError(emailInput, emailError, ERROR_MESSAGES.INVALID_EMAIL);
    return false;
  } else {
    clearFieldError(emailInput, emailError);
    return true;
  }
};

/**
 * Validates query type selection
 * @returns {boolean} True if valid
 */
const validateQueryType = () => {
  const isValid = isRadioSelected(queryTypeInputs);
  
  if (!isValid) {
    showFieldError(null, queryTypeError, ERROR_MESSAGES.QUERY_TYPE_REQUIRED);
  } else {
    clearFieldError(null, queryTypeError);
  }
  
  return isValid;
};

/**
 * Validates message field
 * @returns {boolean} True if valid
 */
const validateMessage = () => {
  const value = messageInput.value;
  const isValid = isNotEmpty(value);
  
  if (!isValid) {
    showFieldError(messageInput, messageError, ERROR_MESSAGES.REQUIRED);
  } else {
    clearFieldError(messageInput, messageError);
  }
  
  return isValid;
};

/**
 * Validates consent checkbox
 * @returns {boolean} True if valid
 */
const validateConsent = () => {
  const isValid = isCheckboxChecked(consentInput);
  
  if (!isValid) {
    showFieldError(consentInput, consentError, ERROR_MESSAGES.CONSENT_REQUIRED);
  } else {
    clearFieldError(consentInput, consentError);
  }
  
  return isValid;
};

// ===== ERROR HANDLING FUNCTIONS =====

/**
 * Shows error state for a field
 * @param {HTMLElement} field - The input field (optional)
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
const showFieldError = (field, errorElement, message) => {
  if (field) {
    field.setCustomValidity(message);
  }
  errorElement.textContent = message;
  errorElement.style.display = 'block';
};

/**
 * Clears error state for a field
 * @param {HTMLElement} field - The input field (optional)
 * @param {HTMLElement} errorElement - The error message element
 */
const clearFieldError = (field, errorElement) => {
  if (field) {
    field.setCustomValidity('');
  }
  errorElement.textContent = '';
  errorElement.style.display = 'none';
};

/**
 * Validates all form fields
 * @returns {boolean} True if all fields are valid
 */
const validateForm = () => {
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isQueryTypeValid = validateQueryType();
  const isMessageValid = validateMessage();
  const isConsentValid = validateConsent();
  
  return isFirstNameValid && 
         isLastNameValid && 
         isEmailValid && 
         isQueryTypeValid && 
         isMessageValid && 
         isConsentValid;
};

// ===== SUCCESS HANDLING =====

/**
 * Shows the success dialog
 */
const showSuccessDialog = () => {
  successDialog.showModal();
  
  // Focus the close button for keyboard users
  const closeButton = successDialog.querySelector('.dialog-close');
  if (closeButton) {
    closeButton.focus();
  }
  
  // Auto-close dialog after 5 seconds
  setTimeout(() => {
    hideSuccessDialog();
  }, 5000);
};

/**
 * Hides the success dialog
 */
const hideSuccessDialog = () => {
  successDialog.close();
  
  // Return focus to the submit button
  const submitButton = document.querySelector('.submit-btn');
  if (submitButton) {
    submitButton.focus();
  }
};

/**
 * Handles keyboard events for the dialog
 */
const handleDialogKeyboard = (event) => {
  if (event.key === 'Escape') {
    hideSuccessDialog();
  }
};

/**
 * Handles successful form submission
 */
const handleFormSuccess = () => {
  // Reset form
  form.reset();
  
  // Clear all error states
  clearAllErrors();
  
  // Show success dialog
  showSuccessDialog();
  
  // Focus on first field for better UX
  firstNameInput.focus();
};

/**
 * Clears all error states
 */
const clearAllErrors = () => {
  const errorElements = [
    firstNameError, lastNameError, emailError, 
    queryTypeError, messageError, consentError
  ];
  
  const fields = [
    firstNameInput, lastNameInput, emailInput, 
    null, messageInput, consentInput
  ];
  
  errorElements.forEach((errorElement, index) => {
    clearFieldError(fields[index], errorElement);
  });
};

// ===== FORM SUBMISSION =====

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
const handleFormSubmit = (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      handleFormSuccess();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  }
};

// ===== REAL-TIME VALIDATION =====

/**
 * Sets up real-time validation for input fields
 */
const setupRealTimeValidation = () => {
  // Text inputs
  firstNameInput.addEventListener('blur', validateFirstName);
  lastNameInput.addEventListener('blur', validateLastName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);
  
  // Radio buttons
  queryTypeInputs.forEach(input => {
    input.addEventListener('change', validateQueryType);
  });
  
  // Checkbox
  consentInput.addEventListener('change', validateConsent);
  
  // Clear errors on input
  const textInputs = [firstNameInput, lastNameInput, emailInput, messageInput];
  textInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.validity.customError) {
        const errorElement = document.getElementById(`${input.id}-error`);
        clearFieldError(input, errorElement);
      }
    });
  });
};

// ===== ACCESSIBILITY =====

/**
 * Sets up keyboard navigation for custom form controls
 */
const setupKeyboardNavigation = () => {
  // Radio options
  const radioOptions = document.querySelectorAll('.radio-option');
  radioOptions.forEach(option => {
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const radio = option.querySelector('.radio-input');
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }
    });
  });
  
  // Checkbox
  const checkboxGroup = document.querySelector('.checkbox-group');
  checkboxGroup.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      consentInput.checked = !consentInput.checked;
      consentInput.dispatchEvent(new Event('change'));
    }
  });
};

// ===== INITIALIZATION =====

/**
 * Initializes the form functionality
 */
const initForm = () => {
  // Set up event listeners
  form.addEventListener('submit', handleFormSubmit);
  
  // Set up real-time validation
  setupRealTimeValidation();
  
  // Set up keyboard navigation
  setupKeyboardNavigation();
  
  // Set up dialog keyboard events
  successDialog.addEventListener('keydown', handleDialogKeyboard);
  
  // Set focus on first field for better UX
  firstNameInput.focus();
};

// ===== STARTUP =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initForm); 