// Importing Related Classes:
const DirectTest = require('./Direct_test');
const SmallFriendsTest = require('./smallFriends_test');
const BigFriendsTest = require('./bigFriends_test');
const MultiplicationTest = require('./Multiplication_test');

// Variables to store testType and testLVL
let testLVL;
let testType;
let testInstance;  
let testGenre;
const FirstChoice = document.getElementById('First-Choice');
const SecondChoice = document.getElementById('Second-Choice');
// Setting Listeners when a button is clicked for Test Level, Test Type, and Test Genre:
document.addEventListener('DOMContentLoaded', function() {

  const preMadeBtn = document.getElementById('Pre-Made-btn');
  const generatedBtn = document.getElementById('Generated_btn');
  const lvl1Btn = document.getElementById('LVL1-TestBtn');
  const lvl2Btn = document.getElementById('LVL2-TestBtn');
  const lvl3Btn = document.getElementById('LVL3-TestBtn');
  const directBtn = document.getElementById('Direct-TestBtn');
  const smallFriendsBtn = document.getElementById('SmallFriends-TestBtn');
  const bigFriendsBtn = document.getElementById('BigFriends-TestBtn');
  const multiplicationBtn = document.getElementById('Multiplication-TestBtn');
  const startTestBtn = document.getElementById('startTestBtn');
  
  // Event Listener for Test Genre
  if (generatedBtn) generatedBtn.addEventListener('click', function() {
    testGenre = setTestGenre('Generated');
    localStorage.setItem('testGenre', testGenre);
    console.log('Test Genre has been set to:', testGenre);
    checkSelections();
  });

  if (preMadeBtn) preMadeBtn.addEventListener('click', function() {
    testGenre = setTestGenre('Pre-Made');
    localStorage.setItem('testGenre', testGenre);
    console.log('Test Genre has been set to:', testGenre);
    checkSelections();
  });
  
  
  
  // Event Listeners for the Test Level
  if (lvl1Btn) lvl1Btn.addEventListener('click', function() {
    testLVL = setTestLVL('LVL 1');
    localStorage.setItem('testLVL', testLVL);
    console.log('Test Level has been set to:', testLVL);
    changeView();
    checkSelections();
  });
  
  if (lvl2Btn) lvl2Btn.addEventListener('click', function() {
    testLVL = setTestLVL('LVL 2');
    localStorage.setItem('testLVL', testLVL);
    console.log('Test Level has been set to:', testLVL);
    changeView();
    checkSelections();
  });
  
  if (lvl3Btn) lvl3Btn.addEventListener('click', function() {
    testLVL = setTestLVL('LVL 3');
    localStorage.setItem('testLVL', testLVL);
    console.log('Test Level has been set to:', testLVL);
    changeView();
    checkSelections();
  });
  
  // Event listeners for Test Type
  if (directBtn) directBtn.addEventListener('click', function() {
    testType = 'Direct';
    testInstance = setTestType(testType);
    localStorage.setItem('testType', testType);
    console.log('Test Type has been set to:', testType);
    checkSelections();
  });
  
  if (smallFriendsBtn) smallFriendsBtn.addEventListener('click', function() {
    testType = 'SmallFriends';
    testInstance = setTestType(testType);
    localStorage.setItem('testType', testType);
    console.log('Test Type has been set to:', testType);
    checkSelections();
  });
  
  if (bigFriendsBtn) bigFriendsBtn.addEventListener('click', function() {
    testType = 'BigFriends';
    testInstance = setTestType(testType);
    localStorage.setItem('testType', testType);
    console.log('Test Type has been set to:', testType);
    checkSelections();
  });
  
  if (multiplicationBtn) multiplicationBtn.addEventListener('click', function() {
    testType = 'Multiplication';
    testInstance = setTestType(testType);
    localStorage.setItem('testType', testType);
    console.log('Test Type has been set to:', testType);
    checkSelections();
  });
  
  // Retrieve test genre, level, and type from localStorage
  testGenre = localStorage.getItem('testGenre');
  testLVL = localStorage.getItem('testLVL');
  testType = localStorage.getItem('testType');
  
  if (testGenre && testLVL && testType) {
    console.log('Retrieved test genre:', testGenre);
    console.log('Retrieved test level:', testLVL);
    console.log('Retrieved test type:', testType);
    checkSelections();
  } else {
    console.error('Please select a test genre, level, and type.');
  }
  
  // Add event listener to the "Start Test" button
  if (startTestBtn) {
    startTestBtn.addEventListener('click', Redirection);
  }
});

 // Function to switch between views
 function changeView() {
  // Hide the First-Choice div
  
  FirstChoice.classList.remove('visible'); // Optionally hide it
  SecondChoice.classList.add('visible');
  SecondChoice.style.display = 'block'; // Ensure it's displayed before fading in

  // Use setTimeout to wait for the display to be set before changing the opacity
  setTimeout(() => {
      SecondChoice.classList.add('visible'); // Add class to trigger fade-in
  }, 50); 
  FirstChoice.style.display ='none'
}

// Function for setting the test genre and resetting values
function setTestGenre(selectedGenre) {
  // Reset test variables when switching genres
  testLVL = null;
  testType = null;
  testInstance = null;
  
  switch (selectedGenre) {
    case 'Pre-Made':
      return 'Pre-Made';
    case 'Generated':
      return 'Generated';
    default:
      console.error('Invalid test genre');
      return null;
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
      console.error('Invalid test level');
      return null;
  }
}

function setTestType(testTypeChoice) {
  switch (testTypeChoice) {
    case 'Direct':
      return 'Direct';
    case 'SmallFriends':
      return 'SmallFriends';
    case 'BigFriends':
      return 'BigFriends';
    case 'Multiplication':
      return 'Multiplication';
    default:
      console.error('Invalid test type');
      return null;
  }
}

// Redirection function to ensure the test only starts after all selections
function Redirection() {
  if (testType && testLVL && testGenre) {
    // Redirect to the appropriate test page based on the selections
    window.location.replace('/Test-Page') ;
  } else {
    console.error('Please select a test genre, level, and type.');
  }
}

// Show "Start Test" button if all selections are made
function checkSelections() {
  const startTestBtn = document.getElementById('startTestBtn');
  
  if (testLVL && testType && testGenre) {
    startTestBtn.style.display = 'block';  // Show the "Start Test" button
  } else {
    startTestBtn.style.display = 'none';   // Hide it if not all selections are made
  }
}
