// Importing Related Classes:
const DirectTest = require('./Direct_test');
const SmallFriendsTest = require('./smallFriends_test');
const BigFriendsTest = require('./bigFriends_test');
const MultiplicationTest = require('./Multiplication_test');

// Variables to store testType and testLVL
let testLVL;
let testType;
let testInstance;  // Move this out of functions to ensure it's accessible globally

// Setting Listeners when a button is clicked for Test Level and Test Type:
document.addEventListener('DOMContentLoaded', function() {
  const lvl1Btn = document.getElementById('LVL1-TestBtn');
  const lvl2Btn = document.getElementById('LVL2-TestBtn');
  const lvl3Btn = document.getElementById('LVL3-TestBtn');
  const directBtn = document.getElementById('Direct-TestBtn');
  const smallFriendsBtn = document.getElementById('SmallFriends-TestBtn');
  const bigFriendsBtn = document.getElementById('BigFriends-TestBtn');
  const multiplicationBtn = document.getElementById('Multiplication-TestBtn');

  if (lvl1Btn) lvl1Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 1');
      updateForm();
  });
  if (lvl2Btn) lvl2Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 2');
      updateForm();
  });
  if (lvl3Btn) lvl3Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 3');
      updateForm();
  });

  if (directBtn) directBtn.addEventListener('click', function() {
      testType = 'Direct';
      testInstance = setTestType(testType);
      updateForm();
  });
  if (smallFriendsBtn) smallFriendsBtn.addEventListener('click', function() {
      testType = 'SmallFriends';
      testInstance = setTestType(testType);
      updateForm();
  });
  if (bigFriendsBtn) bigFriendsBtn.addEventListener('click', function() {
      testType = 'BigFriends';
      testInstance = setTestType(testType);
      updateForm();
  });
  if (multiplicationBtn) multiplicationBtn.addEventListener('click', function() {
      testType = 'Multiplication';
      testInstance = setTestType(testType);
      updateForm();
  });
});


function setTestLVL(testLVLchoice) {
  switch (testLVLchoice) {
    case 'LVL 1':
      return 1;
    case 'LVL 2':
      return 2;
    case 'LVL 3':
      return 3;
    default:
      console.error('Invalid test Level');
      return;
  }
}

function setTestType(testTypeChoice) {
  switch (testTypeChoice) {
    case 'Direct':
      return new DirectTest(testLVL);
    case 'SmallFriends':
      return new SmallFriendsTest(testLVL);
    case 'BigFriends':
      return new BigFriendsTest(testLVL);
    case 'Multiplication':
      return new MultiplicationTest(testLVL);
    default:
      console.error('Invalid test type');
      return null;
  }
}

function updateForm() {
  if (testInstance && testLVL) {
    const formContainer = document.getElementById('test-form-container');

    // Directly inserting HTML
    formContainer.innerHTML = `
      <div class="test-form-container">
        <form id="testForm" class="test-form">
          <div class="number-display">
            <label for="num1">Number 1:</label>
            <input type="text" id="num1" name="num1" readonly>

            <label for="num2">Number 2:</label>
            <input type="text" id="num2" name="num2" readonly>

            <label for="num3">Number 3:</label>
            <input type="text" id="num3" name="num3" readonly>

            <label for="num4">Number 4:</label>
            <input type="text" id="num4" name="num4" readonly>

            <label for="result">=</label>
            <input type="number" id="result" name="result" required>
          </div>
          <button type="submit" class="Next-button">Next</button>
        </form>
        <div id="feedback" class="feedback"></div>
      </div>
    `;

    // Populate form with numbers
    if (testInstance) {
      testInstance.generateNumbers();  // Make sure this method populates numbers
      testInstance.sendNumbersToForm();  // Ensure this method sets the form inputs
    }
  }
}

// Export the Test Object:
module.exports = testInstance;
