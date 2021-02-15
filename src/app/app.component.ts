import { UserService } from './user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;
  //should always store our subscription in a property so we can unsubscribe and prevent memory leaks using OnDestroy

  constructor(private userService: UserService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe( didActivate => {
      this.userActivated = didActivate;
    });
  }

  OnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
