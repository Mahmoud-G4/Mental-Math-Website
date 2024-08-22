function setTestType(testType) {
    let testInstance;
  
    switch (testType) {
      case 'Direct':
        testInstance = new DirectTest();
        break;
      case 'SmallFriends':
        testInstance = new SmallFriendsTest();
        break;
      case 'BigFriends':
        testInstance = new BigFriendsTest();
        break;
      case 'Multiplication':
        testInstance = new MultiplicationTest();
        break;
      default:
        console.error('Invalid test type');
        return;
    }
  
    // Once the test type is set, populate the form
    testInstance.sendNumbersToForm();
  }
  
  // Setting Listeners when a button is clicked
  document.getElementById('Direct-TestBtn').addEventListener('click', function() {setTestType('Direct');});
  document.getElementById('SmallFreinds-TestBtn').addEventListener('click', function() {setTestType('SmallFreinds');});
  document.getElementById('BigFriends-TestBtn').addEventListener('click', function() {setTestType('BigFriends');});
  document.getElementById('Multiplication-TestBtn').addEventListener('click', function() {setTestType('Multiplication');});
  