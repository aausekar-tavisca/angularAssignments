import { Product } from "./../Model/app.product.model";
import { AbstractControl } from "@angular/forms";
import { ProductFormComponent } from "./product-form.component";
import { HttpServiceFormComponent } from "../http-service-form/http-service-form.component";

export class CustomValidator {
  static CheckEven(ctrl: AbstractControl): any {
    const value: number = parseInt(ctrl.value);
    if (value % 2 === 0) {
      return null; // valid
    } else {
      return { odd: true }; // invalid
    }
  }

  static CheckProductIdIsUnique(control: AbstractControl): any {
    if (
      (<ProductFormComponent>(<unknown>this)).products.findIndex(
        (p) => p.ProductId === control.value
      ) === -1
    ) {
      return null;
    }
    return { notUnique: true, errorMessage: "Product Id already exist" };
  }

  static CheckProductIdIsDifferent(control: AbstractControl): any {
    if (
      (<HttpServiceFormComponent>(<unknown>this)).products.findIndex(
        (p) => p.ProductId === control.value
      ) === -1
    ) {
      return null;
    }
    return { notUnique: true, errorMessage: "Product Id already exist" };
  }

  static CheckPrice(control: AbstractControl): any {
    let price = parseFloat(control.value);
    if (!isNaN(price)) {
      if (price > 0) {
        return null;
      } else {
        return {
          valid: false,
          errorMessage: "Base price must be greater than zero",
        };
      }
    } else {
      return { valid: false, errorMessage: "Invalid Base Price" };
    }
  }
}
