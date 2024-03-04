function toggleAnswer(id) {
    var answer = document.getElementById('faq-answer-' + id);
    var toggleIcon = document.querySelector('.faq-question[data-id="' + id + '"] .faq-toggle');
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggleIcon.textContent = '+';
    } else {
        answer.style.display = 'block';
        toggleIcon.textContent = '-';
    }
}
