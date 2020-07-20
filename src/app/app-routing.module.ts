import { ProductUpateComponent } from "./RoutingExample/product-update.component/product-update.component";
import { ProductHomeComponent } from "./RoutingExample/product-home.component/product-home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductAddComponent } from "./RoutingExample/product-add.component/product-add.component";
import { ProductDeleteComponent } from "./RoutingExample/product-delete.component/product-delete.component";

const routes: Routes = [
  { path: "", component: ProductHomeComponent },
  { path: "addProduct", component: ProductAddComponent },
  {
    path:
      "updateProduct/:rowId/:pId/:name/:categoryName/:manufacturer/:description/:basePrice",
    component: ProductUpateComponent,
  },
  { path: "deleteProduct/:id", component: ProductDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
