import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ProductHttpService } from "src/app/Services/product-http-service";
import { Product } from "src/app/Model/app.product.model";
import { Categories, Manufacturers } from "src/app/Model/app.constants";

@Component({
  selector: "product-home-component",
  templateUrl: "./product-home.component.html",
  styleUrls: ["./product-home.component.css"],
})
export class ProductHomeComponent implements OnInit {
  products: Array<Product>;
  headers: Array<string>;
  product: Product;
  status: string;
  categories: Array<string>;
  manufacturers: Array<string>;
  constructor(
    private productSerice: ProductHttpService,
    private router: Router
  ) {
    this.product = new Product(0, "", "", "", "", "", 0);
    this.products = new Array<Product>();
    this.headers = new Array<string>();
    this.categories = Categories;
    this.manufacturers = Manufacturers;
  }
  ngOnInit() {
    for (let property in this.product) {
      this.headers.push(property);
    }
    this.loadProducts();
  }

  loadProducts() {
    this.productSerice.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.status = "Products loaded succesfully";
      },
      (error) => {
        this.status = `Error: ${error}`;
      }
    );
  }
  toAddComponent() {
    console.log("go to add product");
    this.router.navigate(["addProduct"]);
  }
}
