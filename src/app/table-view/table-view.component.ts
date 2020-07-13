import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../Model/app.product.model";

@Component({
  selector: "app-table-view",
  templateUrl: "./table-view.component.html",
  styleUrls: ["./table-view.component.css"],
})
export class TableViewComponent implements OnInit {
  headers: Array<string>;
  private dataSource: Array<Product>;
  updateIsClicked: boolean;
  color: string;
  @Output()
  update: EventEmitter<Product>;

  @Output()
  delete: EventEmitter<string>;
  constructor() {
    this.dataSource = new Array<Product>();
    this.headers = new Array<string>();
    this.updateIsClicked = false;
    this.update = new EventEmitter<Product>();
    this.delete = new EventEmitter<string>();
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

  updateRecord(prd: Product) {
    this.updateIsClicked = false;
    this.enable_disable_cells(prd.ProductId, false);
    this.update.emit(prd);
  }

  deleteProduct(productRowId: string) {
    this.delete.emit(productRowId);
  }
}
