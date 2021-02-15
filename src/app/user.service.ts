import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})

export class UserService {
  //older method
  // activatedEmitter = new EventEmitter<boolean>();

  //recommended method using Subject
  activatedEmitter = new Subject<boolean>();
}
