// Importing Related Classes:
const DirectTest = require('./Direct_test');
const SmallFriendsTest = require('./smallFriends_test');
const BigFriendsTest = require('./bigFriends_test');
const MultiplicationTest = require('./Multiplication_test');

// Variables to store testType and testLVL
let testLVL;
let testType;
let testInstance;  
let testGenere;

// Setting Listeners when a button is clicked for Test Level, Test Type, Number of Questions, and Time Limit:
document.addEventListener('DOMContentLoaded', function() {
  const PreMade_btn = document.getElementById('Generated_btn');
  const Generated_btn = document.getElementById('Pre-Made-btn');
  const lvl1Btn = document.getElementById('LVL1-TestBtn');
  const lvl2Btn = document.getElementById('LVL2-TestBtn');
  const lvl3Btn = document.getElementById('LVL3-TestBtn');
  const directBtn = document.getElementById('Direct-TestBtn');
  const smallFriendsBtn = document.getElementById('SmallFriends-TestBtn');
  const bigFriendsBtn = document.getElementById('BigFriends-TestBtn');
  const multiplicationBtn = document.getElementById('Multiplication-TestBtn');

  // Event Listener for The test Gener
  if (PreMade_btn) PreMade_btn.addEventListener('click', function() {
    testGenere = setTestGenere('Pre-Made');
    console.log('Test Genere Has been set To:',testLVL);
});

if (Generated_btn) Generated_btn.addEventListener('click', function() {
  testGenere = setTestGenere('Generated');
  console.log('Test Genere Has been set To:',testLVL);
});


// Event Listeners for the test LeveL:
  if (lvl1Btn) lvl1Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 1');
      console.log('Test LeveL Has been set To:',testLVL);
  });
  if (lvl2Btn) lvl2Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 2');
      console.log('Test LeveL Has been set To:',testLVL);
  });
  if (lvl3Btn) lvl3Btn.addEventListener('click', function() {
      testLVL = setTestLVL('LVL 3');
      console.log('Test LeveL Has been set To:',testLVL);
  });

  // Event listeners for Test Type :
  if (directBtn) directBtn.addEventListener('click', function() {
      testType = 'Direct';
      testInstance = setTestType(testType);
      console.log('Test Type Has been set To:',testType);
  });
  if (smallFriendsBtn) smallFriendsBtn.addEventListener('click', function() {
      testType = 'SmallFriends';
      testInstance = setTestType(testType);
      console.log('Test Type Has been set To:',testType);
  });
  if (bigFriendsBtn) bigFriendsBtn.addEventListener('click', function() {
      testType = 'BigFriends';
      testInstance = setTestType(testType);
      console.log('Test Type Has been set To:',testType);
  });
  if (multiplicationBtn) multiplicationBtn.addEventListener('click', function() {
      testType = 'Multiplication';
      testInstance = setTestType(testType);
      console.log('Test Type Has been set To:',testType);
  });
});

// Functions For Setting the Value od the Vairous Requirements:

function setTestGenere(testGenere){
  switch (testGenere) {
    case 'Pre-Made':
      return 'Pre-Made';
    case 'Generated':
      return 'Generated';
    default:
      console.error('Invalid test Genere');
      return 0;
  }
}
 
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

function Redirction() {
  if (testInstance && testLVL) {
    const formContainer = document.getElementById('test-form-container');
    
    // Start the test
    if (testInstance) {
      testInstance.startTest();  // This starts the test, initializes the timer, and handles questions
    }
  }
}

// Export the Test Object:
module.exports = testInstance;
