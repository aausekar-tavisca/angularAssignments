import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"],
})
export class CalculatorComponent implements OnInit {
  expression: string;
  finalResult: number;
  private executeExpression: boolean;
  calNumbers: Array<Array<string>>;
  private expressionStack: Array<string>;
  private tempValue: string;
  constructor() {
    this.calNumbers = new Array<Array<string>>();
    this.calNumbers.push(["7", "8", "9"]);
    this.calNumbers.push(["4", "5", "6"]);
    this.calNumbers.push(["1", "2", "3"]);
    this.calNumbers.push(["", "0", "C"]);
    this.expression = "0";
    this.finalResult = 0;
    this.executeExpression = false;
    this.expressionStack = new Array<string>();
    this.tempValue = "0";
  }

  click(value: string) {
    console.log(`Number pressed: ${value}`);
    if (value.toLowerCase() === "c") {
      this.clear();
    } else {
      if (this.isOperand(value)) {
        if (this.tempValue == "0" && this.expressionStack.length == 2) {
          console.log("---Not all elements---");
          console.log(this.expressionStack);
          return;
        }
        if (value == "=" && this.expressionStack.length == 2) {
          this.expressionStack.push(this.tempValue);
          console.log("---Stack before execution---");
          console.log(this.expressionStack);
          this.finalResult = this.evaluate();
          console.log("final result " + this.finalResult);
          this.expression = this.finalResult.toString();
          this.expressionStack = new Array<string>();
          this.tempValue = this.finalResult.toString();
          console.log("---Stack after execution---");
          console.log(this.expressionStack);
          this.executeExpression = false;
        } else {
          if (this.executeExpression) {
            this.expressionStack.push(this.tempValue);
            console.log("---Stack before execution---");
            console.log(this.expressionStack);
            this.finalResult = this.evaluate();
            console.log("final result " + this.finalResult);
            this.expression += value;
            this.expressionStack = new Array<string>();
            this.expressionStack.push(this.finalResult.toString());
            this.expressionStack.push(value);
            this.tempValue = "0";
            console.log("---Stack after execution---");
            console.log(this.expressionStack);
          } else {
            this.expressionStack.push(this.tempValue);
            this.expressionStack.push(value);
            this.executeExpression = true;
            this.expression += value;
            this.tempValue = "0";
          }
        }
      } else {
        if (this.expression.length == 1 && this.expression === "0") {
          this.expression = value;
          this.tempValue = value;
        } else {
          this.expression += value;
          if (this.tempValue.length == 1 && this.tempValue === "0") {
            this.tempValue = value;
          } else {
            this.tempValue += value;
          }
        }
        console.log("temp value " + this.tempValue);
      }
    }

    console.log("-----in the end---");
    console.log(this.expressionStack);
  }

  clear() {
    this.expression = "0";
    this.finalResult = 0;
    this.expressionStack = new Array<string>();
    this.executeExpression = false;
    this.tempValue = "0";
  }

  private isOperand(c: string): boolean {
    let num = parseInt(c);
    if (isNaN(num)) {
      return true;
    }
    return false;
  }

  private value(c: string): number {
    return parseInt(c);
  }

  evaluate(): number {
    let res: number = 0;
    let num1 = parseInt(this.expressionStack[0]);
    let num2 = parseInt(this.expressionStack[2]);
    switch (this.expressionStack[1]) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "X":
        res = num1 * num2;
        break;
      case "/":
        res = num1 / num2;
        break;
    }
    return res;
  }
  ngOnInit(): void {}
}
