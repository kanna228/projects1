const playMusicButton = document.getElementById('playMusic');
const music = document.getElementById('background-music');

function setMusicSource() {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
        music.src = 'day-song.mp3'; 
    } else {
        music.src = 'night-song.mp3'; 
    }
    music.load();
}

setMusicSource();


// Обработчик события на кнопку
playMusicButton.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        localStorage.setItem('musicPlaying', 'true'); 
    } else {
        music.pause();
        localStorage.setItem('musicPlaying', 'false'); 
    }
});
