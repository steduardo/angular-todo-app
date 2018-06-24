import { Observable } from 'rxjs';
import { Todo } from './todo';

export interface ApiService {

  getAllTodos(): Observable<Todo[]>;

  createTodo(todo: Todo): Observable<Todo>;

  getTodoById(todoId: number): Observable<Todo>;

  updateTodo(todo: Todo): Observable<Todo>;

  deleteTodoById(todoId: number): Observable<null>;
}
