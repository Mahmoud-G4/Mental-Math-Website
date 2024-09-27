class MultiplicationTest {
  constructor(testLevel, numQuestions = 100, timeLimit = 300) {
    this.testLevel = testLevel;
    this.numQuestions = numQuestions;
    this.timeLimit = timeLimit;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = [];
    this.timer = null;
    this.testStartTime = null;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateMultiplicationPair() {
    let num1, num2;

    switch (this.testLevel) {
      case 1:
        num1 = this.getRandomNumber(1, 12);
        num2 = this.getRandomNumber(1, 12);
        break;
      case 2:
        num1 = this.getRandomNumber(1, 12);
        num2 = this.getRandomNumber(1, 12);
        break;
      case 3:
        num1 = this.getRandomNumber(10, 20); // Adjust range for more difficulty
        num2 = this.getRandomNumber(10, 20);
        break;
      default:
        num1 = this.getRandomNumber(1, 9);
        num2 = this.getRandomNumber(1, 9);
    }

    return [num1, num2];
  }

  startTest() {
    this.testStartTime = new Date();
    this.timer = setTimeout(() => {
      this.endTest();
    }, this.timeLimit * 1000);
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestion < this.numQuestions) {
      this.currentQuestion++;
      // Generate multiplication pair and populate the form
      const [num1, num2] = this.generateMultiplicationPair();
      this.displayNumbers(num1, num2);
    } else {
      this.endTest();
    }
  }

  displayNumbers(num1, num2) {
    document.getElementById('num1').value = num1;
    document.getElementById('num3').value = num2;
    document.getElementById('num2').innerText = '×'; // Display multiplication sign
  }

  submitAnswer(userAnswer) {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const correctAnswer = num1 * num2;

    if (userAnswer == correctAnswer) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers.push({ num1, num2, correctAnswer, userAnswer });
    }

    this.nextQuestion();
  }

  endTest() {
    clearTimeout(this.timer);
    this.showResults();
  }

  showResults() {
    document.getElementById('test-form-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
      <h3>Your Score: ${this.correctAnswers} out of ${this.numQuestions}</h3>
      <div id="detailed-results">
        ${this.incorrectAnswers.map(answer => `
          <p>${answer.num1} × ${answer.num2} = ${answer.correctAnswer} (Your Answer: ${answer.userAnswer})</p>
        `).join('')}
      </div>
      <button id="retryBtn">Retry</button>
    `;
    resultContainer.style.display = 'block';

    document.getElementById('retryBtn').addEventListener('click', () => {
      location.reload();
    });
  }
}

module.exports = MultiplicationTest;