class DirectTest {
    constructor(testlvl) {
      this.testlvl=testlvl;
      this.num1 = 0;
      this.num2 = 0;
      this.num3 = 0;
      this.num4 = 0;
      this.result = 0;
    }

    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateNumbers() {
      if (this.testlvl==1)
      {
        this.num1 = this.getRandomNumber(-9,9);
        this.num2 = this.getRandomNumber(-9,9);
        this.num3 = this.getRandomNumber(-9,9);
        this.num4 = this.getRandomNumber(-9,9);
      }
      else if (this.testlvl==2)
      {
        this.num1 = this.getRandomNumber(-9,9);
        this.num2 = this.getRandomNumber(-9,9);
        this.num3 = this.getRandomNumber(-9,9);
        this.num4 = this.getRandomNumber(-9,9);
      }
      else if (this.testlvl==3)
      {
        this.num1 = this.getRandomNumber(-9,9);
        this.num2 = this.getRandomNumber(-9,9);
        this.num3 = this.getRandomNumber(-9,9);
        this.num4 = this.getRandomNumber(-9,9);
      }
      else
      {
        console.log("error determining the Test level")
      }
    }
  
    calculateResult() {
      this.result = this.num1 + this.num2 + this.num3 + this.num4;
    }
  
    checkAnswer(userAnswer) {
      return this.result === parseInt(userAnswer, 10);
    }

    sendNumbersToForm() {
      document.getElementById('num1').value = this.num1;
      document.getElementById('num2').value = this.num2;
      document.getElementById('num3').value = this.num3;
      document.getElementById('num4').value = this.num4;
    }
  }
  
  module.exports= DirectTest;

  