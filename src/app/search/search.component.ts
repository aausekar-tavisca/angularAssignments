import { Component, OnInit } from "@angular/core";
import { SearchService } from "../Services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  searchName: string;
  constructor(private searchService: SearchService) {
    this.searchName = "";
  }

  search(): void {
    console.log(`searching for ${this.searchName}`);
    this.searchService.invokeSearch(this.searchName);
  }
  ngOnInit() {}
}
