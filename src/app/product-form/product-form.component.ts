import { ProductManager } from "./../Model/ProductManager";
import { Component, OnInit } from "@angular/core";
import { Product } from "../Model/app.product.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Categories, Manufacturers } from "../Model/app.constants";
import { CustomValidator } from "./app.custom.validators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  product: Product;
  products: Array<Product>;
  private logic: ProductManager;
  headers: Array<string>;

  // copy the constant arrays in local public arrays of the component
  categories = Categories;
  manufacturers = Manufacturers;

  // define a FormGroup
  frmProduct: FormGroup;

  constructor() {
    this.product = new Product(0, "", "", "", "", "", 0);
    this.products = new Array<Product>();
    this.logic = new ProductManager();
    this.headers = new Array<string>();

    // map the Product Model class to FormGroup using FormControl
    // bind the fromProduct to <form> tag using its
    // [formGroup] attribute
    // bind the 'key' of FormControlName to Editable elements
    // inside formGroup using [formControlName] attribute

    this.frmProduct = new FormGroup({
      // the value of the Model property
      // to be read/write for the UI element
      // aka formState
      ProductRowId: new FormControl(
        this.product.ProductRowId,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(8),
          Validators.pattern("[0-9]+"),
        ])
      ),
      ProductId: new FormControl(this.product.ProductId),
      ProductName: new FormControl(this.product.ProductName),
      CategoryName: new FormControl(this.product.CategoryName),
      Manufacturer: new FormControl(this.product.Manufacturer),
      Description: new FormControl(this.product.Description),
      BasePrice: new FormControl(this.product.BasePrice),
    });
  }

  // this is method that will be invoked immediatly after the ctor execution
  // write the logic in this method that we cannot write in the ctor
  // e.g. External Service calls, long running iterations
  ngOnInit(): void {
    // read proeprties of Product class and add them in headers array

    for (let p in this.product) {
      this.headers.push(p);
    }
    this.products = this.logic.getProducts();
  }

  clear(): void {
    this.product = new Product(0, "", "", "", "", "", 0);
  }
  save(): void {
    // read value from FormControl received from FromGroup
    this.product = this.frmProduct.value;
    this.products = this.logic.addProduct(this.product);
    console.log(JSON.stringify(this.products));
  }

  getSelectedRecord(prd: Product): void {
    // set the value to FormGroup
    this.frmProduct.setValue(prd);
  }

  deleteProduct(prd: Product) {
    event.stopPropagation();
    console.log("Delete Product");
    console.log(prd);
    let deleteIndex: number = this.products.findIndex(
      (p) =>
        p.ProductId === prd.ProductId && p.ProductRowId === prd.ProductRowId
    );
    if (deleteIndex >= 0) {
      let newProductList = new Array<Product>();
      for (let pIndex: number = 0; pIndex < this.products.length; pIndex++) {
        if (pIndex != deleteIndex) {
          newProductList.push(this.products[pIndex]);
        }
      }
      this.products = newProductList;
    }
  }
}
