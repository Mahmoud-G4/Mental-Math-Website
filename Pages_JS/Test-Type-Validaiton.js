function setTestLVL(testLVLchoice){
 let testLVl;
  switch (testLVLchoice) {
    case 'LVL 1':
      testLVL = 1;
      break;
    case 'LVL 2':
      testLVL = 2;
      break;
    case 'LVL 3':
      testLVL = 3;
      break;
  
    default:
      console.error('Invalid test LeveL');
      return;
  }
  return testLVl;
}
// Setting Listeners when a button is clicked for Test LeveL
document.getElementById('LVL1-TestBtn').addEventListener('click', function() {setTestLVL('LVL 1');});
document.getElementById('LVL2-TestBtn').addEventListener('click', function() {setTestLVL('LVL 2');});
document.getElementById('LvL3-TestBtn').addEventListener('click', function() {setTestLVL('LVL 3');});

function setTestType(testType) {
    let testInstance;
  
    switch (testType) {
      case 'Direct':
        testInstance = new DirectTest(setTestLVL());
        break;
      case 'SmallFriends':
        testInstance = new SmallFriendsTest(setTestLVL());
        break;
      case 'BigFriends':
        testInstance = new BigFriendsTest(setTestLVL());
        break;
      case 'Multiplication':
        testInstance = new MultiplicationTest(setTestLVL());
        break;
      default:
        console.error('Invalid test type');
        return;
    }
  
    // Once the test type is set, populate the form
    testInstance.sendNumbersToForm();
  }
  
  // Setting Listeners when a button is clicked for Test Type
  document.getElementById('Direct-TestBtn').addEventListener('click', function() {setTestType('Direct');});
  document.getElementById('SmallFreinds-TestBtn').addEventListener('click', function() {setTestType('SmallFreinds');});
  document.getElementById('BigFriends-TestBtn').addEventListener('click', function() {setTestType('BigFriends');});
  document.getElementById('Multiplication-TestBtn').addEventListener('click', function() {setTestType('Multiplication');});
  