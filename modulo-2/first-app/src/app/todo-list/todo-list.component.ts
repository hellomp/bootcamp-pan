import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  tasks: TodoItem[] = [
    { description: 'Buy eggs', done: true },
    { description: 'Clean house', done: false },
  ];

  addTask(description: string) {
    this.tasks.push({
      description,
      done: false,
    });
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
}
