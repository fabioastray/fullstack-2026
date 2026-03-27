import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo } from '../dto/todo.dto'
import { UpsertTodo } from '../dto/upsert-todo.dto'

@Injectable()
export class TodosService {
  private todos: Todo[] = []

  findAll(): Todo[] {
    return this.todos
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id)

    if (!todo) throw new NotFoundException(`Todo ${id} not found`)

    return todo
  }

  nextId(): string {
    const nextId =
      this.todos.length === 0
        ? 1
        : Math.max(...this.todos.map((todo) => parseInt(todo.id))) + 1

    return nextId.toString()
  }

  create(createTodo: UpsertTodo): Todo {
    const todo: Todo = {
      id: this.nextId(),
      text: createTodo.text,
      complete: createTodo.complete ?? false
    }

    this.todos.push(todo)

    return todo
  }

  update(id: string, update: Partial<UpsertTodo>): Todo {
    const todo = this.findOne(id)

    Object.assign(todo, update)

    return todo
  }

  remove(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id)

    if (index === -1) throw new NotFoundException()

    this.todos.splice(index, 1)
  }
}
