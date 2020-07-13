import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
} from "@angular/core";
import { Product } from "../Model/app.product.model";

@Directive({
  selector: "[productIdCheck]",
})
export class ProductIdCheckDirective {
  @Input("productIdCheck")
  details: any;
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  @HostListener("blur")
  onBlur() {
    let id: any = this.GetIdValue(this.details.field);
    console.log(id);
    if (this.isIdPresent(this.details.field, id)) {
      this.applyBorderColor("red");
    } else {
      this.applyBorderColor(null);
    }
  }

  private applyBorderColor(color: string) {
    this.renderer.setStyle(this.element.nativeElement, "border-color", color);
  }

  private GetIdValue(field: any) {
    switch (field) {
      case "rowId":
        return parseInt(this.element.nativeElement.value);
      case "productId":
        return this.element.nativeElement.value.toString();
    }
  }

  private isIdPresent(field: string, value: any): any {
    switch (field) {
      case "rowId":
        if (isNaN(value)) {
          return false;
        }
        return (
          this.details.products.findIndex((p) => p.ProductRowId === value) != -1
        );
        break;
      case "productId":
        return (
          this.details.products.findIndex((p) => p.ProductId === value) != -1
        );
        break;
    }
  }
}
