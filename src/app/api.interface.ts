import { Observable } from 'rxjs';
import { Todo } from './todo';

export interface ApiService {

  getAllTodos(): Observable<Todo[]>;

  createTodo(todo: Todo): Observable<Todo>;

  getTodoById(todoId: string): Observable<Todo>;

  updateTodo(todo: Todo): Observable<Todo>;

  deleteTodoById(todoId: string): Observable<null>;
}
