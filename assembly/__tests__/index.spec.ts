// contract/assembly/__tests__/index.spec.ts

import { create, getById, get, update, del } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {
    // call the create method
    const todo = create("Drink water");

    // lookup in the PersistentUnorderedMap for our todo
    // expect the persisted todo to equal the todo returned
    // by the create method above.
    expect(todos.getSome(todo.id)).toStrictEqual(todo);
  });
  it("gets a todo by id", () => {
    // create three todos
    const a = Todo.insert("Drink water");
    const b = Todo.insert("Get sleep");
    const c = Todo.insert("Exercise");

    // get each todo by its it
    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  });
  it('gets a list of todos', () => {
    const todos = new Array<number>(100)
      .fill(0)
      .map<Todo>((_, i) => Todo.insert('todo' + i.toString()))
    expect(get(20)).toStrictEqual(todos.slice(20, 30));
    expect(get(0, 10)).toStrictEqual(todos.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(todos.slice(10, 20));
    expect(get(50, 50)).toStrictEqual(todos.slice(50, 100));
  });
  itThrows('deletes a todo', ()  {
    const todo = Todo.insert('Drink water');

    del(todo.id)

    Todo.findById(todo.id)
  });
  it('updates a todo', ()  {
    const todo = Todo.insert('Water drink');

    update(todo.id, { task: 'Drink water', done: true });
    const todoAfterUpdate = Todo.findById(todo.id);

    expect(todoAfterUpdate.id).toStrictEqual(todo.id);
    expect(todoAfterUpdate.task).toStrictEqual('Drink water');
    expect(todoAfterUpdate.done).toStrictEqual(true);
  });
});