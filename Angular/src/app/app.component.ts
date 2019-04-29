import {Component} from '@angular/core';
import Bluebird from 'bluebird';
// import {Observable, Subscribable} from 'rxjs';
// import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';

  constructor() {


    const p1 = new Promise((resolve, reject, onCancel) => {
      resolve();
    });
    const p2 = new Promise((resolve, reject, onCancel) => {
      resolve();
      // reject(new Error('p2'));
    });
    Promise.all([p1, p2]).then(value => {
      console.log('all ok', 'Zone', Zone.current.name);
    }).catch(reason => {
      console.log('catch ok', 'Zone', Zone.current.name);
    }).finally(() => {
      console.log('finally ok', 'Zone', Zone.current.name);
    });
    Bluebird.resolve(1).then(value => {
      console.log('bb');
      console.log('result ', value, 'Zone', Zone.current.name);
    });
    Zone.current.fork({
      name: 'bluebird'
    }).run(() => {
      Bluebird.resolve(2).then(r => {
        console.log('result ', r, 'Zone', Zone.current.name);
      });
    });


    Promise.resolve()
      .then(() => {
        console.log('never called (Promise)');
      });

    Bluebird.resolve()
      .then(() => {
        console.log('never called (Bluebird)');
      });

    Promise.resolve('a string')
      .then(value => {
        return {value};
      }).then(result => {
      console.log(result.value); // <-- will crash with "TypeError: cannot property 'value' of undefined"
    });


    // const constructorZone = Zone.current.fork({name: 'constructorZone'});
    // const subscriptionZone = Zone.current.fork({name: 'subscriptionZone'});
    // const operatorZone = Zone.current.fork({name: 'operatorZone'});
    //
    // let observable: Observable<{}>;
    // let subscriber;
    // console.log('Zone', constructorZone, subscriptionZone, operatorZone);
    // constructorZone.run(() => {
    //   console.log('constructorZone');
    //   // tslint:disable-next-line:variable-name
    //   observable = new Observable((_subscriber) => {
    //     subscriber = _subscriber;
    //     console.log('current zone when construct observable:', Zone.current.name); // will output constructor.
    //     return () => {
    //       console.log('current zone when unsubscribe observable:', Zone.current.name); // will output constructor.
    //     };
    //   });
    // });
    //
    // subscriptionZone.run(() => {
    //   console.log('subscriptionZone', observable);
    //   observable.subscribe(() => {
    //     console.log('current zone when subscription next', Zone.current.name); // will output subscription.
    //   }, () => {
    //     console.log('current zone when subscription error', Zone.current.name); // will output subscription.
    //   }, () => {
    //     console.log('current zone when subscription complete', Zone.current.name); // will output subscription.
    //   });
    // });
    //
    // operatorZone.run(() => {
    //   console.log('operatorZone', observable);
    //   observable.pipe(map(() => {
    //     console.log('current zone when map operator', Zone.current.name); // will output operator.
    //   }));
    // });


  }
}
