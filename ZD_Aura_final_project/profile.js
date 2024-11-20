document.addEventListener('DOMContentLoaded', function() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const currentUser = registrations.find(user => user.isLoggedIn);

    if (!currentUser) {
        // Redirect to login if no user is logged in
        window.location.href = "register.html";
    } else {
        // Populate profile information
        document.getElementById('userName').textContent = currentUser.name || "User";
        document.getElementById('userEmail').textContent = currentUser.email || "N/A";
        document.getElementById('userPhone').textContent = currentUser.phone || "N/A";
        document.getElementById('userAddress').textContent = currentUser.address || "N/A";
        document.getElementById('userCity').textContent = currentUser.city || "N/A";
    }
});

function logOut() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.forEach(user => user.isLoggedIn = false);

    localStorage.setItem('registrations', JSON.stringify(registrations));
    window.location.href = "main_page.html"; // Redirect after logout
}


