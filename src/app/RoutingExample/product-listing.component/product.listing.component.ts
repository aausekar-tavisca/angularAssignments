import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/Model/app.product.model";
import { ProductHttpService } from "src/app/Services/product-http-service";
import { Categories, Manufacturers } from "src/app/Model/app.constants";
import { Router } from "@angular/router";

@Component({
  selector: "product-listing-component",
  templateUrl: "./product.listing.component.html",
})
export class ProductListingComponent implements OnInit {
  headers: Array<string>;
  private dataSource: Array<Product>;
  updateIsClicked: boolean;
  color: string;
  constructor(private router: Router) {
    this.dataSource = new Array<Product>();
    this.headers = new Array<string>();
    this.updateIsClicked = false;
    this.color = "red";
  }

  ngOnInit() {}

  @Input()
  set DataSource(products: Array<Product>) {
    if (products.length > 0) {
      this.headers = new Array<string>();
      this.dataSource = products;
      for (let p in this.dataSource[0]) {
        this.headers.push(p);
      }
    }
    this.updateIsClicked = false;
  }

  get DataSource() {
    return this.dataSource;
  }

  toUpdateComponent(prd: Product) {
    console.log("go to update product");
    this.router.navigate([
      "updateProduct",
      prd.ProductRowId,
      prd.ProductId,
      prd.ProductName,
      prd.CategoryName,
      prd.Manufacturer,
      prd.Description,
      prd.BasePrice,
    ]);
  }

  toDeleteComponent(prd: Product) {
    console.log("go to delete product");
    this.router.navigate(["deleteProduct", prd.ProductRowId]);
  }
}
