import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Categories, Manufacturers } from "./../Model/app.constants";
import { ProductHttpService } from "./../Services/product-http-service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../Model/app.product.model";
import { CustomValidator } from "../product-form/app.custom.validators";

@Component({
  selector: "app-http-service-form",
  templateUrl: "./http-service-form.component.html",
  styleUrls: ["./http-service-form.component.css"],
})
export class HttpServiceFormComponent implements OnInit {
  updateIsClicked: boolean;
  products: Array<Product>;
  headers: Array<string>;
  product: Product;
  status: string;
  categories: Array<string>;
  manufacturers: Array<string>;
  formGroup: FormGroup;
  constructor(private productSerice: ProductHttpService) {
    this.updateIsClicked = false;
    this.product = new Product(0, "", "", "", "", "", 0);
    this.products = new Array<Product>();
    this.headers = new Array<string>();
    this.categories = Categories;
    this.manufacturers = Manufacturers;

    this.formGroup = new FormGroup({
      ProductRowId: new FormControl(
        this.product.ProductRowId,
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ),
      ProductId: new FormControl(
        this.product.ProductId,
        Validators.compose([
          Validators.required,
          CustomValidator.CheckProductIdIsDifferent.bind(this),
        ])
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
  ngOnInit() {
    for (let property in this.product) {
      this.headers.push(property);
    }
    this.loadProducts();
  }

  save() {
    this.product = this.formGroup.value;
    console.log("adding product");
    console.log(this.product);
    this.productSerice.postProduct(this.product).subscribe(
      (response) => {
        this.product = response;
        this.status = "Record Saved received Succesfully";
        this.products.push(this.product);
      },
      (error) => {
        this.status = `Error Occured ${error}`;
      }
    );
  }

  deleteProduct(prdId: number) {
    console.log("deleting product");
    console.log(prdId);
    this.productSerice.deleteProduct(prdId).subscribe(
      (response) => {
        this.status = "Record Saved received Succesfully";
        this.loadProducts();
      },
      (error) => {
        this.status = `Error Occured ${error}`;
      }
    );
  }

  updateRecord(prd: Product) {
    console.log("Updating product");
    console.log(prd);
    this.productSerice.putProduct(prd.ProductRowId, prd).subscribe(
      (response) => {
        this.status = "Record Updated Succesfully";
      },
      (error) => {
        this.status = `Error Occured ${error}`;
      }
    );
    this.updateIsClicked = false;
    this.enable_disable_cells(prd.ProductId, false);
  }

  makeRowEditable(productId: string) {
    this.updateIsClicked = true;
    this.enable_disable_cells(productId, true);
  }

  private enable_disable_cells(productId: string, enable: boolean) {
    let cellInputs = document.getElementsByName(productId);
    if (enable) {
      console.log("enabling " + productId);
      cellInputs.forEach((i) => i.removeAttribute("disabled"));
    } else {
      console.log("disabling" + productId);
      cellInputs.forEach((i) => i.setAttribute("disabled", "true"));
    }
  }
  clear() {
    console.log("clear form");
    this.product = new Product(0, "", "", "", "", "", 0);
    this.formGroup.setValue(this.product);
  }
  loadProducts() {
    this.updateIsClicked = false;
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
}
