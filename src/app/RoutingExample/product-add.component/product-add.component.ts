import { OnInit, Component } from "@angular/core";
import { Product } from "src/app/Model/app.product.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductHttpService } from "src/app/Services/product-http-service";
import { Categories, Manufacturers } from "src/app/Model/app.constants";
import { CustomValidator } from "src/app/product-form/app.custom.validators";
import { Router } from "@angular/router";

@Component({
  selector: "product-add-component",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"],
})
export class ProductAddComponent implements OnInit {
  product: Product;
  status: string;
  categories: Array<string>;
  manufacturers: Array<string>;
  formGroup: FormGroup;
  constructor(
    private productSerice: ProductHttpService,
    private router: Router
  ) {
    this.product = new Product(0, "", "", "", "", "", 0);
    this.categories = Categories;
    this.manufacturers = Manufacturers;

    this.formGroup = new FormGroup({
      ProductRowId: new FormControl(
        this.product.ProductRowId,
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ),
      ProductId: new FormControl(
        this.product.ProductId,
        Validators.compose([Validators.required])
      ),
      ProductName: new FormControl(
        this.product.ProductName,
        Validators.compose([Validators.required])
      ),
      CategoryName: new FormControl(
        this.product.CategoryName,
        Validators.compose([Validators.required])
      ),
      Manufacturer: new FormControl(
        this.product.Manufacturer,
        Validators.compose([Validators.required])
      ),
      Description: new FormControl(
        this.product.Description,
        Validators.compose([Validators.required])
      ),
      BasePrice: new FormControl(
        this.product.BasePrice,
        Validators.compose([Validators.required, CustomValidator.CheckPrice])
      ),
    });
  }
  ngOnInit() {}

  save() {
    this.product = this.formGroup.value;
    console.log("adding product");
    console.log(this.product);
    this.productSerice.postProduct(this.product).subscribe(
      (response) => {
        this.product = response;
        this.status = "Record Saved received Succesfully";
        this.router.navigate([""]);
      },
      (error) => {
        this.status = `Error Occured ${error}`;
      }
    );
  }

  clear() {
    console.log("clear form");
    this.product = new Product(0, "", "", "", "", "", 0);
    this.formGroup.setValue(this.product);
  }
}
