
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map, flatMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Response } from '@angular/http';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

const API_URL = environment.apiGateway.invokeURL;

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  private getAuthHeaders() {
    return this.auth.getIdToken()
            .pipe(
              map((token) => {
                let headers = new HttpHeaders();
                if (token === null) {
                  return { headers };
                }
                headers = headers.append('Authorization', `Bearer ${token}`)
                                  .append('Content-Type', 'application/json');
                return { headers };
              })
            );
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.getAuthHeaders()
        .pipe(
          flatMap((headers) => {
            return this.http
              .get<Todo[]>(API_URL + '/todos', headers);
          }),
          map((todos) => {
            // return todos;
            return todos.map(t => {
              return { id: t.UserId, title: t.title, complete: t.complete };
            });
          }),
          catchError(this.handleError)
        );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    // set user id first
    return this.auth.getUserId()
        .pipe(
          flatMap((userid) => {
            todo.id = userid; // overwrite any existing id's
            return this.getAuthHeaders();
          }),
          flatMap((headers) => {
            return this.http
              .post<Todo>(API_URL + '/todos', todo, headers);
          }),
          catchError(this.handleError)
        );
  }

  public getTodoById(todoId: string): Observable<Todo> {
    return this.getAuthHeaders()
        .pipe(
          flatMap((headers) => {
            return this.http
              .get<Todo>(API_URL + '/todos/' + todoId, headers);
            }),
          catchError(this.handleError)
        );
  }

  public updateTodoById(todo: Todo): Observable<Todo> {
    return this.auth.getUserId()
        .pipe(
          flatMap((userid) => {
            todo.id = userid; // overwrite any existing id's
            return this.getAuthHeaders();
          }),
          flatMap((headers) => {
            return this.http
              .put<Todo>(API_URL + '/todos/' + todo.id, todo, headers);
            }),
          catchError(this.handleError)
        );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.auth.getUserId()
        .pipe(
          flatMap((userid) => {
            todo.id = userid; // overwrite any existing id's
            return this.getAuthHeaders();
          }),
          flatMap((headers) => {
            return this.http
              .put<Todo>(API_URL + '/todos/' + todo.id + '/' + todo.title, todo, headers);
            }),
          catchError(this.handleError)
        );
  }

  public deleteTodoById(todoId: string): Observable<null> {
    return this.getAuthHeaders()
        .pipe(
          flatMap((headers) => {
            return this.http
              .delete<null>(API_URL + '/todos/' + todoId, headers);
            }),
            catchError(this.handleError)
        );
  }

  deleteTodo(userId: string, title: string): Observable<null> {
    return this.getAuthHeaders()
        .pipe(
          flatMap((headers) => {
            return this.http
              .delete<null>(API_URL + '/todos/' + userId + '/' + title, headers);
            }),
            catchError(this.handleError)
        );
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return observableThrowError(error);
  }
}
