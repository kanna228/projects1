document.addEventListener('DOMContentLoaded', function () {
    const loginError = document.getElementById('login-error');
    const mainUsernameDisplay = document.getElementById('user-name-display');
    const mainWelcomeSection = document.getElementById('welcome-section');
    const mainLoginForm = document.getElementById('main-login-form');
    const savedUsername = localStorage.getItem('loggedInUser');

    // Check for existing logged-in user
    if (savedUsername) {
        showWelcome(savedUsername);
    }

    // Function to handle login
    window.login = function () {
        const username = document.getElementById('main-username').value;
        const password = document.getElementById('main-password').value;

        // Simple authentication check
        if (username === 'obodi' && password === '123') {
            localStorage.setItem('loggedInUser', username);
            showWelcome(username);
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    };

    // Function to handle logout
    window.logout = function () {
        localStorage.removeItem('loggedInUser');
        mainWelcomeSection.style.display = 'none';
        mainLoginForm.style.display = 'flex';
    };

    // Function to display welcome message
    function showWelcome(username) {
        mainWelcomeSection.style.display = 'block';
        mainUsernameDisplay.textContent = username;
        mainLoginForm.style.display = 'none';
    }
});