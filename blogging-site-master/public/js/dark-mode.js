const darkModeButton = document.querySelector('#dark-mode-toggle');

darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save user preference to Firebase or localStorage
});
