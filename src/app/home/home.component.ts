import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { filter, map} from "rxjs/operators"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
   //should always store our subscription in a property so we can unsubscribe and prevent memory leaks using OnDestroy
  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    //**Observables take up to 3 parameters - next, error, and complete */
    //Note an error in an observable cancels the subscription and does not complete it
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000)
    });

    //pipe allows you to customize/transform,filter data before handling it and there is a large 'operators' library with filer, map, etc. that can be chained
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'round: ' + (data + 1);
    })).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      console.log('Completed!');

    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
