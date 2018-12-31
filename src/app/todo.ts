export class Todo {
  id: string;
  UserId?: string;
  title = '';
  complete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
