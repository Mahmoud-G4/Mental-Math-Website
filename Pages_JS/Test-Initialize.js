// Importing Related Classes:
const DirectTest = require('./Direct_test');
const SmallFriendsTest = require('./smallFriends_test');
const BigFriendsTest = require('./bigFriends_test');
const MultiplicationTest = require('./Multiplication_test');

// Setting Listeners when a button is clicked for Test Level, Test Type, and Test Genre:
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve values from localStorage
    const testType = localStorage.getItem('testType');
    const testLVL = localStorage.getItem('testLVL');
    const testGenre = localStorage.getItem('testGenre');
  
    if (testType && testLVL && testGenre) {
      let testInstance;
      switch (testType) {
        case 'Direct':
          testInstance = new DirectTest(testLVL);
          clearPara();
          break;
        case 'SmallFriends':
          testInstance = new SmallFriendsTest(testLVL);
          clearPara();
          break;
        case 'BigFriends':
          testInstance = new BigFriendsTest(testLVL);
          clearPara();
          break;
        case 'Multiplication':
          testInstance = new MultiplicationTest(testLVL);
          clearPara();
          break;
        default:
          console.error('Invalid test type');
          clearPara();
          return;
      }
      testInstance.startTest(); // Start the test based on the retrieved parameters
  
      // Handling button clicks
      const quitBtn = document.getElementById('Quit-Button');
      if (quitBtn) {
        quitBtn.addEventListener('click', function() {
          // Implement functionality for Quit button
          window.location.replace('/Test-Choice-Page'); 
        });
      }
  
      const nextBtn = document.getElementById('Next-Button');
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          // Implement functionality for Next button
          testInstance.nextQuestion(); // Assuming nextQuestion() is a method in your test classes
        });
      }
    } else {
      console.error('Missing test parameters.');
    }
});

function clearPara(){
        // Clear stored values
  localStorage.removeItem('testType');
  localStorage.removeItem('testLVL');
  localStorage.removeItem('testGenre');
};