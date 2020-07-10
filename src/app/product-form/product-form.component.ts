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
  updateProduct: boolean;
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
    this.updateProduct = false;
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
          Validators.minLength(1),
          Validators.maxLength(8),
          Validators.pattern("[0-9]+"),
        ])
      ),
      ProductId: new FormControl(
        this.product.ProductId,
        Validators.compose([
          Validators.required,
          CustomValidator.CheckProductIdIsUnique.bind(this),
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
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ),
      BasePrice: new FormControl(
        this.product.BasePrice,
        Validators.compose([Validators.required, CustomValidator.CheckPrice])
      ),
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
    this.updateProduct = false;
    this.product = new Product(0, "", "", "", "", "", 0);
    this.frmProduct.setValue(this.product);
    this.frmProduct
      .get("ProductId")
      .setValidators([
        Validators.required,
        CustomValidator.CheckProductIdIsUnique.bind(this),
      ]);
  }
  save(): void {
    // read value from FormControl received from FromGroup
    this.product = this.frmProduct.value;
    if (!this.updateProduct) {
      this.products = this.logic.addProduct(this.product);
    } else {
      console.log("Updating");
      console.log(this.product);
      this.products = this.logic.updateProduct(this.product);
      this.updateProduct = false;
      this.frmProduct
        .get("ProductId")
        .setValidators([
          Validators.required,
          CustomValidator.CheckProductIdIsUnique.bind(this),
        ]);
    }
    console.log(JSON.stringify(this.products));
  }

  getSelectedRecord(prd: Product): void {
    // set the value to FormGroup
    this.frmProduct.get("ProductId").clearValidators();
    this.frmProduct.setValue(prd);
    this.updateProduct = true;
  }

  deleteProduct(prd: Product) {
    this.products = this.logic.deleteProduct(prd);
  }

  sortTable(sortBy: string) {
    console.log("sorting " + sortBy);
    let sortByParts = sortBy.split(" ");
    if (sortByParts.length == 2) {
      switch (sortByParts[0].toLowerCase()) {
        case "price":
          this.sortByPrice(sortByParts[1]);
          break;
        case "name":
          this.sortByName(sortByParts[1]);
          break;
      }
    } else {
      console.log("Invalid sorting option");
    }
  }
  private sortByName(order: string) {
    switch (order.toLowerCase()) {
      case "asc":
        this.sortByNameAscending();
        break;
      case "des":
        this.sortByNameDescending();
        break;
    }
  }

  private sortByNameAscending() {
    this.products.sort((p1, p2) => (p1.ProductName > p2.ProductName ? 1 : -1));
  }
  private sortByNameDescending() {
    this.products.sort((p1, p2) => (p1.ProductName < p2.ProductName ? 1 : -1));
  }
  private sortByPrice(order: string) {
    switch (order.toLowerCase()) {
      case "asc":
        this.sortByPriceAscending();
        break;
      case "des":
        this.sortByPriceDescending();
        break;
    }
  }
  private sortByPriceAscending() {
    this.products.sort((p1, p2) => (p1.BasePrice > p2.BasePrice ? 1 : -1));
  }

  private sortByPriceDescending() {
    this.products.sort((p1, p2) => (p1.BasePrice < p2.BasePrice ? 1 : -1));
  }
}
