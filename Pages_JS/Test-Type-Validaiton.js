// Importing Related Classes:
const DirectTest = require('./Direct_test');
const SmallFriendsTest = require('./smallFriends_test');
const BigFriendsTest = require('./bigFriends_test');
const MultiplicationTest = require('./Multiplication_test');

// Variables to store testType and testLVL
let testLVL;
let testType;
let testInstance;  // Ensure it's accessible globally
let numQuestions = 10; // Default number of questions
let timeLimit = 60; // Default time limit in seconds

// Setting Listeners when a button is clicked for Test Level, Test Type, Number of Questions, and Time Limit:
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
      return new DirectTest();
    case 'SmallFriends':
      return new SmallFriendsTest();
    case 'BigFriends':
      return new BigFriendsTest();
    case 'Multiplication':
      return new MultiplicationTest();
    default:
      console.error('Invalid test type');
      return null;
  }
}

function updateForm() {
  if (testInstance && testLVL) {
    const formContainer = document.getElementById('test-form-container');

    // Directly inserting HTML
    formContainer.setAttribute = ('style','display: block');

    // Start the test
    if (testInstance) {
      testInstance.startTest();  // This starts the test, initializes the timer, and handles questions
    }
  }
}

// Export the Test Object:
module.exports = testInstance;
