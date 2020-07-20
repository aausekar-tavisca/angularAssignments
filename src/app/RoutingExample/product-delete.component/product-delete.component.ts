import { Component, OnInit } from "@angular/core";

// ActivatedRoute, will be used for subscribing to the parameter
import { ActivatedRoute, Router } from "@angular/router";
import { ProductHttpService } from "src/app/Services/product-http-service";
import { Product } from "src/app/Model/app.product.model";

@Component({
  selector: "product-delete-component",
  template: ` <h2>Are you sure you want to delete product {{ arg[0] }}</h2>
    <br />
    <input type="button" value="Yes" (click)="delete()" />`,
})
export class ProductDeleteComponent implements OnInit {
  arg: Array<any>;
  // inject the ActivatedRoute
  constructor(
    private act: ActivatedRoute,
    private productSerice: ProductHttpService,
    private router: Router
  ) {
    this.arg = new Array<any>();
  }

  // subscribe to the Route Parameter to read the Parameter value
  // this value is always 'string'
  ngOnInit() {
    this.act.params.subscribe((p) => {
      this.arg.push(p.id);
    });

    console.log(this.arg);
  }

  delete() {
    this.productSerice.deleteProduct(this.arg[0]).subscribe(
      (response) => {
        this.router.navigate([""]);
      },
      (error) => {
        alert("not able to delete the product");
        this.router.navigate([""]);
      }
    );
  }
}
