function saveSelectedSize(size) {
    localStorage.setItem("selectedSize", size);
    console.log("Saved selected size:", size); // Debug message
    showSaveIndicator(); // Show save confirmation
}

// Function to show the "Size Saved!" indicator
function showSaveIndicator() {
    const indicator = document.getElementById("save-indicator");
    indicator.style.display = "block";  // Show the indicator
    // Hide the indicator after 2 seconds
    setTimeout(() => {
        indicator.style.display = "none";
    }, 2000);
}

// Function to load the saved size from localStorage on page load
function loadSelectedSize() {
    const savedSize = localStorage.getItem("selectedSize");
    console.log("Loaded saved size:", savedSize); // Debug message

    if (savedSize) {
        const button = document.querySelector(`.size-buttons[data-size="${savedSize}"]`);
        if (button) {
            button.classList.add("active"); // Highlight the saved size button
        }
    }
}

// Set up click event listeners for each size button
document.querySelectorAll(".size-buttons").forEach(button => {
    button.addEventListener("click", function() {
        // Remove active class from all buttons
        document.querySelectorAll(".size-buttons").forEach(btn => btn.classList.remove("active"));
        // Add active class to the clicked button
        this.classList.add("active");
        // Save selected size
        saveSelectedSize(this.dataset.size);
    });
});

// Load the saved size when the page loads
window.addEventListener("load", loadSelectedSize);