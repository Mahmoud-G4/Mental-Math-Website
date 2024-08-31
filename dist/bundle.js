(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DirectTest = /*#__PURE__*/function () {
  function DirectTest(testLevel) {
    var numQuestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    _classCallCheck(this, DirectTest);
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
  return _createClass(DirectTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate four numbers based on the test level
  }, {
    key: "generateNumbers",
    value: function generateNumbers() {
      var num1, num2, num3, num4;
      switch (this.testLevel) {
        case 1:
          // Level 1: Single-digit numbers (1-9)
          num1 = this.getRandomNumber(1, 9);
          num2 = this.getRandomNumber(1, 9);
          num3 = this.getRandomNumber(1, 9);
          num4 = this.getRandomNumber(1, 9);
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
  }, {
    key: "startTest",
    value: function startTest() {
      var _this = this;
      this.testStartTime = new Date();
      this.timer = setTimeout(function () {
        _this.endTest();
      }, this.timeLimit * 1000);
      this.nextQuestion();
    }

    // Proceed to the next question or end the test if all questions are answered
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      if (this.currentQuestion < this.numQuestions) {
        this.currentQuestion++;
        var _this$generateNumbers = this.generateNumbers(),
          _this$generateNumbers2 = _slicedToArray(_this$generateNumbers, 4),
          num1 = _this$generateNumbers2[0],
          num2 = _this$generateNumbers2[1],
          num3 = _this$generateNumbers2[2],
          num4 = _this$generateNumbers2[3];
        this.displayNumbers(num1, num2, num3, num4);
      } else {
        this.endTest();
      }
    }

    // Display the numbers in the test interface
  }, {
    key: "displayNumbers",
    value: function displayNumbers(num1, num2, num3, num4) {
      document.getElementById('num1').value = num1;
      document.getElementById('num2').value = num2;
      document.getElementById('num3').value = num3;
      document.getElementById('num4').value = num4;
      document.getElementById('operation').innerText = '+'; // Display addition sign
    }

    // Handle the submission of an answer
  }, {
    key: "submitAnswer",
    value: function submitAnswer(userAnswer) {
      var num1 = parseInt(document.getElementById('num1').value);
      var num2 = parseInt(document.getElementById('num2').value);
      var num3 = parseInt(document.getElementById('num3').value);
      var num4 = parseInt(document.getElementById('num4').value);
      var correctAnswer = num1 + num2 + num3 + num4;
      if (userAnswer === correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers.push({
          num1: num1,
          num2: num2,
          num3: num3,
          num4: num4,
          correctAnswer: correctAnswer,
          userAnswer: userAnswer
        });
      }
      this.nextQuestion();
    }

    // End the test by clearing the timer and displaying results
  }, {
    key: "endTest",
    value: function endTest() {
      clearTimeout(this.timer);
      this.showResults();
    }

    // Display the test results to the user
  }, {
    key: "showResults",
    value: function showResults() {
      // Hide the test form
      document.getElementById('test-form-container').style.display = 'none';

      // Show the results
      var resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = "\n      <h3>Your Score: ".concat(this.correctAnswers, " out of ").concat(this.numQuestions, "</h3>\n      <div id=\"detailed-results\">\n        ").concat(this.incorrectAnswers.map(function (answer) {
        return "\n          <p>".concat(answer.num1, " + ").concat(answer.num2, " + ").concat(answer.num3, " + ").concat(answer.num4, " = ").concat(answer.correctAnswer, " \n          (Your Answer: ").concat(answer.userAnswer, ")</p>\n        ");
      }).join(''), "\n      </div>\n      <button id=\"retryBtn\">Retry</button>\n    ");
      resultContainer.style.display = 'block';

      // Add event listener to the retry button
      document.getElementById('retryBtn').addEventListener('click', function () {
        location.reload();
      });
    }
  }]);
}();
module.exports = DirectTest;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MultiplicationTest = /*#__PURE__*/function () {
  function MultiplicationTest(testLevel) {
    var numQuestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    _classCallCheck(this, MultiplicationTest);
    this.testLevel = testLevel;
    this.numQuestions = numQuestions;
    this.timeLimit = timeLimit;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = [];
    this.timer = null;
    this.testStartTime = null;
  }
  return _createClass(MultiplicationTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateMultiplicationPair",
    value: function generateMultiplicationPair() {
      var num1, num2;
      switch (this.testLevel) {
        case 1:
          num1 = this.getRandomNumber(1, 9);
          num2 = this.getRandomNumber(1, 9);
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
  }, {
    key: "startTest",
    value: function startTest() {
      var _this = this;
      this.testStartTime = new Date();
      this.timer = setTimeout(function () {
        _this.endTest();
      }, this.timeLimit * 1000);
      this.nextQuestion();
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      if (this.currentQuestion < this.numQuestions) {
        this.currentQuestion++;
        // Generate multiplication pair and populate the form
        var _this$generateMultipl = this.generateMultiplicationPair(),
          _this$generateMultipl2 = _slicedToArray(_this$generateMultipl, 2),
          num1 = _this$generateMultipl2[0],
          num2 = _this$generateMultipl2[1];
        this.displayNumbers(num1, num2);
      } else {
        this.endTest();
      }
    }
  }, {
    key: "displayNumbers",
    value: function displayNumbers(num1, num2) {
      document.getElementById('num1').value = num1;
      document.getElementById('num2').value = num2;
      document.getElementById('operation').innerText = '×'; // Display multiplication sign
    }
  }, {
    key: "submitAnswer",
    value: function submitAnswer(userAnswer) {
      var num1 = parseInt(document.getElementById('num1').value);
      var num2 = parseInt(document.getElementById('num2').value);
      var correctAnswer = num1 * num2;
      if (userAnswer == correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers.push({
          num1: num1,
          num2: num2,
          correctAnswer: correctAnswer,
          userAnswer: userAnswer
        });
      }
      this.nextQuestion();
    }
  }, {
    key: "endTest",
    value: function endTest() {
      clearTimeout(this.timer);
      this.showResults();
    }
  }, {
    key: "showResults",
    value: function showResults() {
      document.getElementById('test-form-container').style.display = 'none';
      var resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = "\n      <h3>Your Score: ".concat(this.correctAnswers, " out of ").concat(this.numQuestions, "</h3>\n      <div id=\"detailed-results\">\n        ").concat(this.incorrectAnswers.map(function (answer) {
        return "\n          <p>".concat(answer.num1, " \xD7 ").concat(answer.num2, " = ").concat(answer.correctAnswer, " (Your Answer: ").concat(answer.userAnswer, ")</p>\n        ");
      }).join(''), "\n      </div>\n      <button id=\"retryBtn\">Retry</button>\n    ");
      resultContainer.style.display = 'block';
      document.getElementById('retryBtn').addEventListener('click', function () {
        location.reload();
      });
    }
  }]);
}();
module.exports = MultiplicationTest;

},{}],3:[function(require,module,exports){
"use strict";

// Importing Related Classes:
var DirectTest = require('./Direct_test');
var SmallFriendsTest = require('./smallFriends_test');
var BigFriendsTest = require('./bigFriends_test');
var MultiplicationTest = require('./Multiplication_test');

// Variables to store testType and testLVL
var testLVL;
var testType;
var testInstance; // Ensure it's accessible globally

// Setting Listeners when a button is clicked for Test Level, Test Type, Number of Questions, and Time Limit:
document.addEventListener('DOMContentLoaded', function () {
  var lvl1Btn = document.getElementById('LVL1-TestBtn');
  var lvl2Btn = document.getElementById('LVL2-TestBtn');
  var lvl3Btn = document.getElementById('LVL3-TestBtn');
  var directBtn = document.getElementById('Direct-TestBtn');
  var smallFriendsBtn = document.getElementById('SmallFriends-TestBtn');
  var bigFriendsBtn = document.getElementById('BigFriends-TestBtn');
  var multiplicationBtn = document.getElementById('Multiplication-TestBtn');
  if (lvl1Btn) lvl1Btn.addEventListener('click', function () {
    testLVL = setTestLVL('LVL 1');
    updateForm();
  });
  if (lvl2Btn) lvl2Btn.addEventListener('click', function () {
    testLVL = setTestLVL('LVL 2');
    updateForm();
  });
  if (lvl3Btn) lvl3Btn.addEventListener('click', function () {
    testLVL = setTestLVL('LVL 3');
    updateForm();
  });
  if (directBtn) directBtn.addEventListener('click', function () {
    testType = 'Direct';
    testInstance = setTestType(testType);
    updateForm();
  });
  if (smallFriendsBtn) smallFriendsBtn.addEventListener('click', function () {
    testType = 'SmallFriends';
    testInstance = setTestType(testType);
    updateForm();
  });
  if (bigFriendsBtn) bigFriendsBtn.addEventListener('click', function () {
    testType = 'BigFriends';
    testInstance = setTestType(testType);
    updateForm();
  });
  if (multiplicationBtn) multiplicationBtn.addEventListener('click', function () {
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
    var formContainer = document.getElementById('test-form-container');

    // Directly inserting HTML
    formContainer.innerHTML = "\n    <div id=\"test-form-container\">\n    <form id=\"testForm\" class=\"test-form\">\n      <label id=\"timeRemaining\">0:00</label>\n      <label id=\"questionCounter\">1/100</label>\n      <div class=\"number-display\">\n        <input type=\"text\" id=\"num1\" name=\"num1\" readonly>  \n        \n        <input type=\"text\" id=\"num2\" name=\"num2\" readonly>\n\n        <input type=\"text\" id=\"num3\" name=\"num3\" readonly>\n  \n        <input type=\"text\" id=\"num4\" name=\"num4\" readonly>\n  \n        <input type=\"number\" id=\"result\" name=\"result\" required>\n      </div>\n      <button type=\"submit\" class=\"Next-button\">Next</button>\n    </form>\n  </div>\n  \n  <!-- A div that will contain the results -->\n  <div id=\"result-container\" style=\"display: none;\"></div>\n  ";

    // Start the test
    if (testInstance) {
      testInstance.startTest(); // This starts the test, initializes the timer, and handles questions
    }
  }
}

// Export the Test Object:
module.exports = testInstance;

},{"./Direct_test":1,"./Multiplication_test":2,"./bigFriends_test":4,"./smallFriends_test":6}],4:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BigFriendsTest = /*#__PURE__*/function () {
  function BigFriendsTest(testLevel) {
    var numQuestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    _classCallCheck(this, BigFriendsTest);
    this.testLevel = testLevel; // Adding test level
    this.numQuestions = numQuestions;
    this.timeLimit = timeLimit;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = [];
    this.timer = null;
    this.testStartTime = null;
  }
  return _createClass(BigFriendsTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateBigFriendPair",
    value: function generateBigFriendPair() {
      var num1 = this.getRandomNumber(6, 9);
      var num2 = 10 - num1;
      if (this.testLevel === 2) {
        // Slightly increase range for Level 2
        num1 = this.getRandomNumber(5, 9);
        num2 = 10 - num1;
      } else if (this.testLevel === 3) {
        // Increase range even more for Level 3
        num1 = this.getRandomNumber(4, 9);
        num2 = 10 - num1;
      }
      return [num1, num2];
    }
  }, {
    key: "startTest",
    value: function startTest() {
      var _this = this;
      this.testStartTime = new Date();
      this.timer = setTimeout(function () {
        _this.endTest();
      }, this.timeLimit * 1000);
      this.nextQuestion();
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      if (this.currentQuestion < this.numQuestions) {
        this.currentQuestion++;
        // Generate four numbers and populate the form
        var _this$generateBigFrie = this.generateBigFriendPair(),
          _this$generateBigFrie2 = _slicedToArray(_this$generateBigFrie, 2),
          num1 = _this$generateBigFrie2[0],
          num2 = _this$generateBigFrie2[1];
        var _this$generateBigFrie3 = this.generateBigFriendPair(),
          _this$generateBigFrie4 = _slicedToArray(_this$generateBigFrie3, 2),
          num3 = _this$generateBigFrie4[0],
          num4 = _this$generateBigFrie4[1];
        this.displayNumbers(num1, num2, num3, num4);
      } else {
        this.endTest();
      }
    }
  }, {
    key: "displayNumbers",
    value: function displayNumbers(num1, num2, num3, num4) {
      document.getElementById('num1').value = num1;
      document.getElementById('num2').value = num2;
      document.getElementById('num3').value = num3;
      document.getElementById('num4').value = num4;
    }
  }, {
    key: "submitAnswer",
    value: function submitAnswer(userAnswer) {
      var num1 = parseInt(document.getElementById('num1').value);
      var num2 = parseInt(document.getElementById('num2').value);
      var num3 = parseInt(document.getElementById('num3').value);
      var num4 = parseInt(document.getElementById('num4').value);
      var correctAnswer = num1 + num2 + num3 + num4;
      if (userAnswer == correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers.push({
          num1: num1,
          num2: num2,
          num3: num3,
          num4: num4,
          correctAnswer: correctAnswer,
          userAnswer: userAnswer
        });
      }
      this.nextQuestion();
    }
  }, {
    key: "endTest",
    value: function endTest() {
      clearTimeout(this.timer);
      this.showResults();
    }
  }, {
    key: "showResults",
    value: function showResults() {
      document.getElementById('test-form-container').style.display = 'none';
      var resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = "\n      <h3>Your Score: ".concat(this.correctAnswers, " out of ").concat(this.numQuestions, "</h3>\n      <div id=\"detailed-results\">\n        ").concat(this.incorrectAnswers.map(function (answer) {
        return "\n          <p>".concat(answer.num1, " + ").concat(answer.num2, " + ").concat(answer.num3, " + ").concat(answer.num4, " = ").concat(answer.correctAnswer, " (Your Answer: ").concat(answer.userAnswer, ")</p>\n        ");
      }).join(''), "\n      </div>\n      <button id=\"retryBtn\">Retry</button>\n    ");
      resultContainer.style.display = 'block';
      document.getElementById('retryBtn').addEventListener('click', function () {
        location.reload();
      });
    }
  }]);
}();
module.exports = BigFriendsTest;

},{}],5:[function(require,module,exports){
"use strict";

require("./Test-Type-Validaiton");
require("./bigFriends_test");
require("./Direct_test");
require("./Multiplication_test");
require("./smallFriends_test");

},{"./Direct_test":1,"./Multiplication_test":2,"./Test-Type-Validaiton":3,"./bigFriends_test":4,"./smallFriends_test":6}],6:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SmallFriendsTest = /*#__PURE__*/function () {
  function SmallFriendsTest(testLevel) {
    var numQuestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    _classCallCheck(this, SmallFriendsTest);
    this.testLevel = testLevel; // Adding test level
    this.numQuestions = numQuestions;
    this.timeLimit = timeLimit;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = [];
    this.timer = null;
    this.testStartTime = null;
  }
  return _createClass(SmallFriendsTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateSmallFriendPair",
    value: function generateSmallFriendPair() {
      var num1 = this.getRandomNumber(1, 4);
      var num2 = 5 - num1;
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
  }, {
    key: "startTest",
    value: function startTest() {
      var _this = this;
      this.testStartTime = new Date();
      this.timer = setTimeout(function () {
        _this.endTest();
      }, this.timeLimit * 1000);
      this.nextQuestion();
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      if (this.currentQuestion < this.numQuestions) {
        this.currentQuestion++;
        // Generate four numbers and populate the form
        var _this$generateSmallFr = this.generateSmallFriendPair(),
          _this$generateSmallFr2 = _slicedToArray(_this$generateSmallFr, 2),
          num1 = _this$generateSmallFr2[0],
          num2 = _this$generateSmallFr2[1];
        var _this$generateSmallFr3 = this.generateSmallFriendPair(),
          _this$generateSmallFr4 = _slicedToArray(_this$generateSmallFr3, 2),
          num3 = _this$generateSmallFr4[0],
          num4 = _this$generateSmallFr4[1];
        this.displayNumbers(num1, num2, num3, num4);
      } else {
        this.endTest();
      }
    }
  }, {
    key: "displayNumbers",
    value: function displayNumbers(num1, num2, num3, num4) {
      document.getElementById('num1').value = num1;
      document.getElementById('num2').value = num2;
      document.getElementById('num3').value = num3;
      document.getElementById('num4').value = num4;
    }
  }, {
    key: "submitAnswer",
    value: function submitAnswer(userAnswer) {
      var num1 = parseInt(document.getElementById('num1').value);
      var num2 = parseInt(document.getElementById('num2').value);
      var num3 = parseInt(document.getElementById('num3').value);
      var num4 = parseInt(document.getElementById('num4').value);
      var correctAnswer = num1 + num2 + num3 + num4;
      if (userAnswer == correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers.push({
          num1: num1,
          num2: num2,
          num3: num3,
          num4: num4,
          correctAnswer: correctAnswer,
          userAnswer: userAnswer
        });
      }
      this.nextQuestion();
    }
  }, {
    key: "endTest",
    value: function endTest() {
      clearTimeout(this.timer);
      this.showResults();
    }
  }, {
    key: "showResults",
    value: function showResults() {
      document.getElementById('test-form-container').style.display = 'none';
      var resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = "\n      <h3>Your Score: ".concat(this.correctAnswers, " out of ").concat(this.numQuestions, "</h3>\n      <div id=\"detailed-results\">\n        ").concat(this.incorrectAnswers.map(function (answer) {
        return "\n          <p>".concat(answer.num1, " + ").concat(answer.num2, " + ").concat(answer.num3, " + ").concat(answer.num4, " = ").concat(answer.correctAnswer, " (Your Answer: ").concat(answer.userAnswer, ")</p>\n        ");
      }).join(''), "\n      </div>\n      <button id=\"retryBtn\">Retry</button>\n    ");
      resultContainer.style.display = 'block';
      document.getElementById('retryBtn').addEventListener('click', function () {
        location.reload();
      });
    }
  }]);
}();
module.exports = SmallFriendsTest;

},{}]},{},[5]);
