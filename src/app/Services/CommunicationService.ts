import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CommunicationService {
  receiveData: EventEmitter<string>;

  constructor() {
    this.receiveData = new EventEmitter<string>();
  }

  sendData(data: string) {
    console.log(data);
    this.receiveData.emit(data);
  }
}
