// Form validation system

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const patterns = {
    phone: /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    zip: /^\d{5}(-\d{4})?$/
};

function initValidation(selector) {
    const form = document.querySelector(selector);
    if (!form) return;

    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => input.value && validateField(input.id));
        input.addEventListener('input', () => {
            if (input.classList.contains('was-validated')) {
                input.classList.remove('was-validated');
                input.setCustomValidity('');
                const error = input.parentElement.querySelector('.errorMsg');
                if (error) error.style.display = 'none';
            }
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateForm(selector) ? handleSuccess(form) : markInvalid(form);
    });
}

function validateForm(selector) {
    const fields = ['firstName','lastName','address','city','state','zip','phone','email','foundUs'];
    return fields.every(id => validateField(id));
}

function validateField(id) {
    const field = document.getElementById(id);
    if (!field) return true;

    let valid = true;
    let msg = '';

    switch(id) {
        case 'firstName':
        case 'lastName':
        case 'address':
        case 'city':
            valid = checkRequired(id);
            msg = `${id.charAt(0).toUpperCase() + id.slice(1).replace('Name', ' Name')} is required`;
            break;
        case 'state':
            valid = checkState(id);
            msg = 'Valid state required';
            break;
        case 'zip':
            valid = checkRequired(id) && checkFormat(id, patterns.zip);
            msg = valid ? 'Zip required' : 'Invalid zip format';
            break;
        case 'phone':
            valid = checkRequired(id) && checkFormat(id, patterns.phone);
            msg = valid ? 'Phone required' : 'Invalid phone format';
            break;
        case 'email':
            valid = checkRequired(id) && checkFormat(id, patterns.email);
            msg = valid ? 'Email required' : 'Invalid email format';
            break;
        case 'foundUs':
            valid = checkRequired(id);
            msg = 'Select at least one option';
            break;
    }

    setValidity(id, valid, valid ? '' : msg);
    return valid;
}

function checkRequired(id) {
    const field = document.getElementById(id);
    if (field.type === 'checkbox' || id === 'foundUs') {
        return document.querySelectorAll(`input[name="${id}"]:checked`).length > 0;
    }
    return field.value.trim() !== '';
}

function checkFormat(id, regex) {
    const field = document.getElementById(id);
    return !field || !field.value || regex.test(field.value);
}

function checkState(id) {
    const field = document.getElementById(id);
    if (!field || !field.value) return false;
    return states.includes(field.value.trim().toUpperCase());
}

function setValidity(id, valid, msg) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add('was-validated');
    el.setCustomValidity(valid ? '' : msg);

    const error = el.parentElement.querySelector('.errorMsg');
    if (error) {
        error.textContent = msg;
        error.style.display = valid ? 'none' : 'block';
    }
}

function handleSuccess(form) {
    form.style.display = 'none';
    const msg = document.getElementById('successMessage');
    if (msg) msg.classList.add('show');
}

function markInvalid(form) {
    form.querySelectorAll('input, textarea, select').forEach(input => {
        if (input.id) validateField(input.id);
    });
}

document.addEventListener('DOMContentLoaded', () => initValidation('#visitorForm'));
