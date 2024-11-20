document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user input from form
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Retrieve stored registrations from localStorage
        const storedData = JSON.parse(localStorage.getItem('registrations')) || [];

        // Find the user by email
        const user = storedData.find(user => user.email === email);

        if (!user) {
            // If no user with the entered email is found
            errorMessage.textContent = 'There are no registered profiles with this email.';
            errorMessage.style.color = 'red';
        } else if (user.name !== name) {
            // If the name does not match the email
            errorMessage.textContent = 'The name does not match the email.';
            errorMessage.style.color = 'red';
        } else {
            // If the user exists and name matches, log in to the correct profile
            localStorage.setItem('isLoggedIn', 'true'); // Mark as logged in

            // Update the `isLoggedIn` flag for this user in the stored data
            storedData.forEach(profile => {
                profile.isLoggedIn = profile.email === email; // Set true for the logged-in user, false for others
            });

            // Save the updated user data back to localStorage
            localStorage.setItem('registrations', JSON.stringify(storedData));

            // Redirect to the profile page
            window.location.href = "profile.html";
        }
    });
});


