import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'first-app';
  show: boolean = true;
  movies = [
    { title: 'The Avengers', rating: 5 },
    { title: 'Parasite', rating: 4 },
    { title: 'The Irishman', rating: 4 },
    { title: 'Black Panther', rating: 3 },
  ];
}
