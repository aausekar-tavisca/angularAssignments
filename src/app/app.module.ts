import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalculatorComponent } from "./calculator/calculator.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { SearchComponent } from "./search/search.component";
import { HttpServiceFormComponent } from "./http-service-form/http-service-form.component";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ProductFormComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent,
    HttpServiceFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
