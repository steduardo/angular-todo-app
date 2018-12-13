
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Todo } from './todo';


@Injectable()
export class ApiMockService {

  constructor(
  ) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return observableOf([
      new Todo({id: '1', title: 'Read article', complete: false})
    ]);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return observableOf(
      new Todo({id: '1', title: 'Read article', complete: false})
    );
  }

  public getTodoById(todoId: string): Observable<Todo> {
    return observableOf(
      new Todo({id: '1', title: 'Read article', complete: false})
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return observableOf(
      new Todo({id: '1', title: 'Read article', complete: false})
    );
  }

  public deleteTodoById(todoId: string): Observable<null> {
    return null;
  }
}
