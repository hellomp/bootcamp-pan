import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  title: string = 'Counter';
  value: number = 0;

  increment() {
    this.value++;
  }
}
