import { Product } from "./app.product.model";

export class ProductManager {
  private products: Array<Product>;

  constructor() {
    this.products = new Array<Product>();
  }

  getProducts(): Array<Product> {
    this.products.push(
      new Product(1, "Prd001", "Laptop", "Electronics", "HP", "Gaming", 120000)
    );
    this.products.push(
      new Product(
        2,
        "Prd002",
        "Iron",
        "Electrical",
        "Bajaj",
        "Cotton Friendly",
        3000
      )
    );
    this.products.push(
      new Product(3, "Prd003", "Biscuts", "Food", "Parle", "Glucose", 10)
    );
    return this.products;
  }

  addProduct(prd: Product): Array<Product> {
    this.products.push(prd);
    return this.products;
  }

  updateProduct(updatedProduct: Product): Array<Product> {
    console.log(`Updating prodcut ${updatedProduct.ProductId}`);
    let product = this.products.find(
      (p) => p.ProductId === updatedProduct.ProductId
    );
    if (typeof product !== "undefined") {
      product.ProductName = updatedProduct.ProductName;
      product.BasePrice = updatedProduct.BasePrice;
      product.Manufacturer = updatedProduct.Manufacturer;
      product.Description = updatedProduct.Description;
      product.CategoryName = updatedProduct.CategoryName;
      product.ProductRowId = updatedProduct.ProductRowId;
    }
    return this.products;
  }

  deleteProduct(prd: Product): Array<Product> {
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
    return this.products;
  }
}
