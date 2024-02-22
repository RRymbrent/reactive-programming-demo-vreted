import { Component } from '@angular/core';
import { Observable, of, map, interval, fromEvent, from, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numbers$: Observable<Number>;
  constructor() {}
}

const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
numbers$.subscribe((value) => console.log(value));

//Operations
numbers$
  .pipe(map((value) => value * 2))
  .subscribe((value) => console.log(value));

//Interval
const interval$ = interval(1000);
interval$.subscribe((val) => console.log('Stream ' + val));
const click$ = fromEvent(document, 'click');
click$.subscribe((evt) => console.log('Mouse clicked' + evt));

//Define an object called users
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Dave', age: 40 },
  { id: 5, name: 'Rym', age: 21 },
];
const users$ = from(users);
users$.subscribe((user) => console.log(user));
users$
  .pipe(filter((user) => user.age <= 30))
  .subscribe((user) => console.log(user));

//Display all users whose age is greater than 30 and convert each name to uppercase
users$
  .pipe(
    map((user) => ({
      id: user.id,
      name: user.name.toUpperCase(),
      age: user.age > 30,
    }))
  )
  .subscribe((user) => console.log(user));

//Using next, error, and complete
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occured: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
