(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DirectTest = /*#__PURE__*/function () {
  function DirectTest(testlvl) {
    _classCallCheck(this, DirectTest);
    this.testlvl = testlvl;
    this.num1 = 0;
    this.num2 = 0;
    this.num3 = 0;
    this.num4 = 0;
    this.result = 0;
  }
  return _createClass(DirectTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateNumbers",
    value: function generateNumbers() {
      if (this.testlvl == 1) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 2) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 3) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else {
        console.log("error determining the Test level");
      }
    }
  }, {
    key: "calculateResult",
    value: function calculateResult() {
      this.result = this.num1 + this.num2 + this.num3 + this.num4;
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(userAnswer) {
      return this.result === parseInt(userAnswer, 10);
    }
  }, {
    key: "sendNumbersToForm",
    value: function sendNumbersToForm() {
      document.getElementById('num1').value = this.num1;
      document.getElementById('num2').value = this.num2;
      document.getElementById('num3').value = this.num3;
      document.getElementById('num4').value = this.num4;
    }
  }]);
}();
module.exports = DirectTest;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MultiplicationTest = /*#__PURE__*/function () {
  function MultiplicationTest(testlvl) {
    _classCallCheck(this, MultiplicationTest);
    this.testlvl = testlvl;
    this.num1 = 0;
    this.num2 = 0;
    this.result = 0;
  }
  return _createClass(MultiplicationTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateNumbers",
    value: function generateNumbers() {
      if (this.testlvl == 1) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 2) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 3) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
      } else {
        console.log("error determining the Test level");
      }
    }
  }, {
    key: "calculateResult",
    value: function calculateResult() {
      this.result = this.num1 * this.num2;
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(userAnswer) {
      return this.result === parseInt(userAnswer, 10);
    }
  }, {
    key: "sendNumbersToForm",
    value: function sendNumbersToForm() {
      document.getElementById('num1').value = this.num1;
      document.getElementById('num2').value = this.num2;
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
var testInstance; // Move this out of functions to ensure it's accessible globally

// Setting Listeners when a button is clicked for Test Level and Test Type:
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
    var formContainer = document.getElementById('test-form-container');

    // Directly inserting HTML
    formContainer.innerHTML = "\n      <div class=\"test-form-container\">\n        <form id=\"testForm\" class=\"test-form\">\n          <div class=\"number-display\">\n            <label for=\"num1\">Number 1:</label>\n            <input type=\"text\" id=\"num1\" name=\"num1\" readonly>\n\n            <label for=\"num2\">Number 2:</label>\n            <input type=\"text\" id=\"num2\" name=\"num2\" readonly>\n\n            <label for=\"num3\">Number 3:</label>\n            <input type=\"text\" id=\"num3\" name=\"num3\" readonly>\n\n            <label for=\"num4\">Number 4:</label>\n            <input type=\"text\" id=\"num4\" name=\"num4\" readonly>\n\n            <label for=\"result\">=</label>\n            <input type=\"number\" id=\"result\" name=\"result\" required>\n          </div>\n          <button type=\"submit\" class=\"Next-button\">Next</button>\n        </form>\n        <div id=\"feedback\" class=\"feedback\"></div>\n      </div>\n    ";

    // Populate form with numbers
    if (testInstance) {
      testInstance.generateNumbers(); // Make sure this method populates numbers
      testInstance.sendNumbersToForm(); // Ensure this method sets the form inputs
    }
  }
}

// Export the Test Object:
module.exports = testInstance;

},{"./Direct_test":1,"./Multiplication_test":2,"./bigFriends_test":4,"./smallFriends_test":6}],4:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BigFriendsTest = /*#__PURE__*/function () {
  function BigFriendsTest(testlvl) {
    _classCallCheck(this, BigFriendsTest);
    this.testlvl = testlvl;
    this.num1 = 0;
    this.num2 = 0;
    this.num3 = 0;
    this.num4 = 0;
    this.result = 0;
  }
  return _createClass(BigFriendsTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateNumbers",
    value: function generateNumbers() {
      if (this.testlvl == 1) {
        this.num1 = this.getRandomNumber(-99, 99);
        this.num2 = this.getRandomNumber(-99, 99);
        this.num3 = this.getRandomNumber(-99, 99);
        this.num4 = this.getRandomNumber(-99, 99);
      } else if (this.testlvl == 2) {
        this.num1 = this.getRandomNumber(-99, 99);
        this.num2 = this.getRandomNumber(-99, 99);
        this.num3 = this.getRandomNumber(-99, 99);
        this.num4 = this.getRandomNumber(-99, 99);
      } else if (this.testlvl == 3) {
        this.num1 = this.getRandomNumber(-99, 99);
        this.num2 = this.getRandomNumber(-99, 99);
        this.num3 = this.getRandomNumber(-99, 99);
        this.num4 = this.getRandomNumber(-99, 99);
      } else {
        console.log("error determining the Test level");
      }
    }
  }, {
    key: "calculateResult",
    value: function calculateResult() {
      this.result = this.num1 + this.num2;
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(userAnswer) {
      return this.result === parseInt(userAnswer, 10);
    }
  }, {
    key: "sendNumbersToForm",
    value: function sendNumbersToForm() {
      document.getElementById('num1').value = this.num1;
      document.getElementById('num2').value = this.num2;
      document.getElementById('num3').value = this.num3;
      document.getElementById('num4').value = this.num4;
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
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SmallFriendsTest = /*#__PURE__*/function () {
  function SmallFriendsTest(testlvl) {
    _classCallCheck(this, SmallFriendsTest);
    this.testlvl = testlvl;
    this.num1 = 0;
    this.num2 = 0;
    this.num3 = 0;
    this.num4 = 0;
    this.result = 0;
  }
  return _createClass(SmallFriendsTest, [{
    key: "getRandomNumber",
    value: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generateNumbers",
    value: function generateNumbers() {
      if (this.testlvl == 1) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 2) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else if (this.testlvl == 3) {
        this.num1 = this.getRandomNumber(-9, 9);
        this.num2 = this.getRandomNumber(-9, 9);
        this.num3 = this.getRandomNumber(-9, 9);
        this.num4 = this.getRandomNumber(-9, 9);
      } else {
        console.log("error determining the Test level");
      }
    }
  }, {
    key: "calculateResult",
    value: function calculateResult() {
      this.result = this.num1 + this.num2;
    }
  }, {
    key: "checkAnswer",
    value: function checkAnswer(userAnswer) {
      return this.result === parseInt(userAnswer, 10);
    }
  }, {
    key: "sendNumbersToForm",
    value: function sendNumbersToForm() {
      document.getElementById('num1').value = this.num1;
      document.getElementById('num2').value = this.num2;
      document.getElementById('num3').value = this.num3;
      document.getElementById('num4').value = this.num4;
    }
  }]);
}();
module.exports = SmallFriendsTest;

},{}]},{},[5]);
