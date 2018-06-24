import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Todo } from './todo';
import { ApiService } from './api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiLocalService implements ApiService {

  private _todos: Todo[];
  private nextID: number;

  constructor(
  ) {
    this._todos = [];
    this.nextID = 0;
  }

  public getAllTodos(): Observable<Todo[]> {
    return of(this._todos);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    todo.id = this.nextID++;
    this._todos.push(todo);
    return of(
      todo
    );
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return of(
      this._todos.find((todo) => todo.id === todoId)
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    const item = this._todos.find((i) => i.id === todo.id);
    item.title = todo.title;
    item.complete = todo.complete;
    return of(
      todo
    );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    const toRemove = this._todos.find((i) => i.id === todoId);
    const index = this._todos.indexOf(toRemove);
    this._todos.splice(index, 1);
    return of(
      null
    );
  }
}

