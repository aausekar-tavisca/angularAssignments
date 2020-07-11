import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SearchService {
  search: EventEmitter<string>;
  constructor() {
    this.search = new EventEmitter<string>();
  }
  public invokeSearch(name: string) {
    this.search.emit(name);
  }
}
