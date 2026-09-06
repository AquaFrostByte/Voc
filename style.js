const themeToggleBtn = document.getElementById('themeToggle');

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.innerText = 'Dark Mode';
}

themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        this.innerText = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        this.innerText = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});