import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../Model/app.product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProductHttpService {
  private baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = "https://apiapptrainingnewapp.azurewebsites.net";
  }

  getProducts(): Observable<Product[]> {
    let resp: Observable<Product[]>;
    resp = this.http.get<Product[]>(`${this.baseURL}/api/Products`);
    return resp;
  }

  postProduct(prd: Product): Observable<Product> {
    let resp: Observable<Product>;
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    resp = this.http.post<Product>(
      `${this.baseURL}/api/Products`,
      prd,
      options
    );
    return resp;
  }

  putProduct(id: number, prd: Product): Observable<Product> {
    let resp: Observable<Product>;
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    resp = this.http.put<Product>(
      `${this.baseURL}/api/Products/${id}`,
      prd,
      options
    );
    return resp;
  }

  deleteProduct(id: number): Observable<boolean> {
    let resp: Observable<boolean>;
    resp = this.http.delete<boolean>(`${this.baseURL}/api/Products/${id}`);
    return resp;
  }
}
