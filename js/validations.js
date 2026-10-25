const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB_RE = /^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

const validators = {
  email(value) {
    if (!value.trim()) return 'Please enter you email address.';
    if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
    return '';
  },
  github(value) {
    if (!value.trim) return 'Please enter you GitHub address';
    if (!GITHUB_RE.test(value.trim()))
      return 'Username must start with @ and contain only letters, numbers, or hyphens.';
    return '';
  },
};

function setFiledError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (!errorEl) return;
  if (message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    input.setAttribute('aria-invalid', true);
  } else {
    errorEl.textContent = '';
    errorEl.hidden = true;
    input.removeAttribute('aria-invalid');
  }
}

export function validateField(input) {
  const validator = validators[input.name];
  if (!validator) return true;
  const message = validator(input.value);
  setFiledError(input, message);
  return !message;
}

export function validateForm(form) {
  const fields = form.querySelectorAll('input[name]');
  let firstInvalid = null;
  fields.forEach((input) => {
    if (!validateField(input) && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

export function initValidation(form) {
  form.querySelectorAll('input[name]').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    });
  });
}
