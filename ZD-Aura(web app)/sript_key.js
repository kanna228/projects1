
const navItems = document.querySelectorAll('.nav-item a');

let currentIndex = 0;

function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % navItems.length;
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
    }
    navItems[currentIndex].focus();
}
document.addEventListener('keydown', handleKeyDown);