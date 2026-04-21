// Phone input masking initialization
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput && window.IMask) {
        IMask(phoneInput, {
            mask: '(000) 000-0000',
            lazy: false,
            placeholderChar: '_'
        });
    }
});
