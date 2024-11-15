const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Проверка сохраненной темы в localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');

        // Сохранение текущей темы в localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });