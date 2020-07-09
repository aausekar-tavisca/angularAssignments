import { AbstractControl } from '@angular/forms';

export class CustomValidator {
   static CheckEven(ctrl: AbstractControl): any {
     // tslint:disable-next-line: radix
     const value: number = parseInt(ctrl.value);
     if (value % 2 === 0) {
        return null; // valid
     } else {
       return {odd: true}; // invalid
     }
   }
}
