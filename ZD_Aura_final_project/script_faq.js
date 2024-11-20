function hideAndShowAnswer(index) {
    const answer = document.getElementById('answer' + index);
    const displayStatus = answer.style.display;

    answer.style.display = displayStatus === 'block' ? 'none' : 'block';
}