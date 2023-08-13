import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NavService {
  navchange: EventEmitter<number> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(number: any) {
    this.navchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
