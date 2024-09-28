class DirectTest {
  constructor(testLevel, numQuestions = 100, timeLimit = 300) {
    this.testLevel = testLevel; // Test level indicating difficulty
    this.numQuestions = numQuestions;
    this.timeLimit = timeLimit; // Time limit in seconds
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = [];
    this.timer = null;
    this.testStartTime = null;
  }

  // Utility method to generate a random number between min and max (inclusive)
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate four numbers based on the test level
  generateNumbers() {
    let num1, num2, num3, num4;

    switch (this.testLevel) {
      case 1:
        // Level 1: Single-digit numbers (1-9)
        num1 = this.getRandomNumber(1, 5);
        num2 = this.getRandomNumber(1, 4);
        num3 = this.getRandomNumber(1, 2);
        num4 = this.getRandomNumber(1, 3);
        break;

      case 2:
        // Level 2: Two-digit numbers (10-99)
        num1 = this.getRandomNumber(10, 99);
        num2 = this.getRandomNumber(10, 99);
        num3 = this.getRandomNumber(10, 99);
        num4 = this.getRandomNumber(10, 99);
        break;

      case 3:
        // Level 3: Three-digit numbers (100-999)
        num1 = this.getRandomNumber(100, 999);
        num2 = this.getRandomNumber(100, 999);
        num3 = this.getRandomNumber(100, 999);
        num4 = this.getRandomNumber(100, 999);
        break;

      default:
        console.error('Invalid test level. Defaulting to Level 1.');
        num1 = this.getRandomNumber(1, 9);
        num2 = this.getRandomNumber(1, 9);
        num3 = this.getRandomNumber(1, 9);
        num4 = this.getRandomNumber(1, 9);
    }

    return [num1, num2, num3, num4];
  }

  // Start the test by initializing the timer and displaying the first question
  startTest() {
    this.testStartTime = new Date();
    this.timer = setTimeout(() => {
      this.endTest();
    }, this.timeLimit * 1000);
    this.nextQuestion();
  }

  // Proceed to the next question or end the test if all questions are answered
  nextQuestion() {
    if (this.currentQuestion < this.numQuestions) {
      this.currentQuestion++;
      const [num1, num2, num3, num4] = this.generateNumbers();
      this.displayNumbers(num1, num2, num3, num4);
    } else {
      this.endTest();
    }
  }

  // Display the numbers in the test interface
  displayNumbers(num1, num2, num3, num4) {
    document.getElementById('num1').value = num1;
    document.getElementById('num2').value = num2;
    document.getElementById('num3').value = num3;
    document.getElementById('num4').value = num4;
    document.getElementById('questionCounter').value =this.currentQuestion +"/"+this.numQuestions;
    document.getElementById('timeRemaining').value=this.timer;
  }

  // Handle the submission of an answer
  submitAnswer(userAnswer) {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const num3 = parseInt(document.getElementById('num3').value);
    const num4 = parseInt(document.getElementById('num4').value);
    const correctAnswer = num1 + num2 + num3 + num4;

    if (userAnswer === correctAnswer) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers.push({
        num1,
        num2,
        num3,
        num4,
        correctAnswer,
        userAnswer
      });
    }

    this.nextQuestion();
  }

  // End the test by clearing the timer and displaying results
  endTest() {
    clearTimeout(this.timer);
    this.showResults();
  }

  // Display the test results to the user
  showResults() {
    // Hide the test form
    document.getElementById('test-form-container').style.display = 'none';

    // Show the results
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
      <h3>Your Score: ${this.correctAnswers} out of ${this.numQuestions}</h3>
      <div id="detailed-results">
        ${this.incorrectAnswers.map(answer => `
          <p>${answer.num1} + ${answer.num2} + ${answer.num3} + ${answer.num4} = ${answer.correctAnswer} 
          (Your Answer: ${answer.userAnswer})</p>
        `).join('')}
      </div>
      <button id="retryBtn">Retry</button>
    `;
    resultContainer.style.display = 'block';

    // Add event listener to the retry button
    document.getElementById('retryBtn').addEventListener('click', () => {
      location.reload();
    });
  }
}

module.exports = DirectTest;
