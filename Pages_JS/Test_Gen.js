document.addEventListener('DOMContentLoaded', () => {
    generateQuestions();

    document.getElementById('submit-test').addEventListener('click', checkAnswers);
    document.getElementById('retry-test').addEventListener('click', retryTest);
});

function generateQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions

    for (let i = 0; i < 100; i++) {
        const num1 = getRandomNumber(1, 50);
        const num2 = getRandomNumber(1, 50);
        const num3 = getRandomNumber(1, 50);
        const num4 = getRandomNumber(1, 50);

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        questionDiv.innerHTML = `
            <span class="numbers">${num1} + ${num2} + ${num3} + ${num4} = </span>
            <input type="number" class="result-input" data-correct="${num1 + num2 + num3 + num4}" />
        `;

        questionsContainer.appendChild(questionDiv);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswers() {
    const resultInputs = document.querySelectorAll('.result-input');
    let score = 0;

    resultInputs.forEach(input => {
        const correctAnswer = parseInt(input.getAttribute('data-correct'));
        const userAnswer = parseInt(input.value);

        if (userAnswer === correctAnswer) {
            score++;
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
        }
    });

    document.getElementById('score').innerText = score;
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('test-form').style.display = 'none';
}

function retryTest() {
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('test-form').style.display = 'block';
    generateQuestions();
}
