class SmallFriendsTest {
  constructor(testLevel, numQuestions = 100, timeLimit = 300) {
    this.testLevel = testLevel; // Adding test level
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

  generateSmallFriendPair() {
    let num1 = this.getRandomNumber(1, 4);
    let num2 = 5 - num1;

    if (this.testLevel === 2) {
      // Slightly increase range for Level 2
      num1 = this.getRandomNumber(1, 5);
      num2 = 5 - num1;
    } else if (this.testLevel === 3) {
      // Increase range even more for Level 3
      num1 = this.getRandomNumber(1, 6);
      num2 = 5 - num1;
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
      // Generate four numbers and populate the form
      const [num1, num2] = this.generateSmallFriendPair();
      const [num3, num4] = this.generateSmallFriendPair();
      this.displayNumbers(num1, num2, num3, num4);
    } else {
      this.endTest();
    }
  }

  displayNumbers(num1, num2, num3, num4) {
    document.getElementById('num1').value = num1;
    document.getElementById('num2').value = num2;
    document.getElementById('num3').value = num3;
    document.getElementById('num4').value = num4;
    document.getElementById('questionCounter').value =this.currentQuestion +"/"+this.numQuestions;
    document.getElementById('timeRemaining').value=this.timer;
  }

  submitAnswer(userAnswer) {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const num3 = parseInt(document.getElementById('num3').value);
    const num4 = parseInt(document.getElementById('num4').value);
    const correctAnswer = num1 + num2 + num3 + num4;

    if (userAnswer == correctAnswer) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers.push({ num1, num2, num3, num4, correctAnswer, userAnswer });
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
          <p>${answer.num1} + ${answer.num2} + ${answer.num3} + ${answer.num4} = ${answer.correctAnswer} (Your Answer: ${answer.userAnswer})</p>
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

module.exports = SmallFriendsTest;
