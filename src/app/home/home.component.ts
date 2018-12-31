import { Component, OnInit } from '@angular/core';
import { Todo } from 'app/todo';
import { Subscription } from 'rxjs';
import { TodoDataService } from 'app/todo-data.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: Todo[] = [];
  subscription: Subscription;
  public loggedIn: boolean;

  constructor(
    private todoDataService: TodoDataService,
    public auth: AuthService
  ) {
  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
    this.subscription = this.auth.isAuthenticated()
      .subscribe(result => {
        this.loggedIn = result;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickLogout() {
    this.auth.signOut();
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodo(todo.id, todo.title)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }
}

