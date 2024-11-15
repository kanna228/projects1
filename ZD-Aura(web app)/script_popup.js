const openPopup = document.getElementById('openPopupBtn');
    const closePopup = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');

    openPopup.addEventListener('click', () => {
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
    });

    closePopup.addEventListener('click', () => {
        popup.style.visibility = 'hidden';
        popup.style.opacity = '0';
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
        }
    });