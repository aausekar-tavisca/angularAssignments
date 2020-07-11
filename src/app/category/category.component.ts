import { Component, OnInit } from "@angular/core";
import { Category } from "../Model/app.category.model";
import { CategoriesData } from "../Model/app.constants";
import { SearchService } from "../Services/search.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categories = CategoriesData;
  cat: Category;
  name: string;
  private filteredCategories: Array<Category>;
  constructor(private searchService: SearchService) {
    this.cat = new Category(0, "");
    this.name = "";
  }

  ngOnInit() {
    this.searchService.search.subscribe((name: string) => {
      this.name = name;
    });
  }

  get FilteredCategories(): Array<Category> {
    if (this.name.length !== 0) {
      this.filteredCategories = this.categories.filter(
        (c) => c.CategoryName.toLowerCase() === this.name.toLowerCase()
      );
    } else {
      this.filteredCategories = this.categories;
    }
    return this.filteredCategories;
  }
}
