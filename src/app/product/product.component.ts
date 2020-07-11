import { ProductsData } from "./../Model/app.constants";
import { Component, OnInit } from "@angular/core";
import { Product } from "../Model/app.product.model";
import { SearchService } from "../Services/search.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productName: string;
  products = ProductsData;
  private filterProducts: Array<Product>;
  constructor(private searchService: SearchService) {
    this.productName = "";
  }

  ngOnInit() {
    this.searchService.search.subscribe((data: string) => {
      console.log("receieved: " + data);
      this.productName = data;
    });
  }

  get FilterProducts(): Array<Product> {
    if (this.productName.length !== 0) {
      this.filterProducts = this.products.filter(
        (p) => p.ProductName.toLowerCase() === this.productName.toLowerCase()
      );
    } else {
      this.filterProducts = this.products;
    }
    return this.filterProducts;
  }
}
