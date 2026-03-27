import type { Todo, UpsertTodo } from '../model/todo.ts'
import { TodosService } from './todos.service.ts'

export class TodosHttpService extends TodosService {
  host = import.meta.env.VITE_API_HOST
  baseUrl = '/api/'

  async findAll(): Promise<Todo[]> {
    const endpoint = `${this.host}${this.baseUrl}v1/todos`

    return fetch(endpoint).then((res) =>
      this.handleResponse<Todo[]>(
        res,
        `Failed to get todos from ${endpoint}: ${res.statusText}`
      )
    )
  }

  async findOne(id: string): Promise<Todo> {
    const endpoint = `${this.host}${this.baseUrl}v1/todos/${id}`

    return fetch(endpoint).then((res) =>
      this.handleResponse<Todo>(
        res,
        `Failed to get todo from ${endpoint}: ${res.statusText}`
      )
    )
  }

  async create(todo: UpsertTodo): Promise<Todo> {
    const endpoint = `${this.host}${this.baseUrl}v1/todos`

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    }).then((res) =>
      this.handleResponse<Todo>(
        res,
        `Failed to create todo from ${endpoint}: ${res.statusText}`
      )
    )
  }

  async update(id: string, todo: UpsertTodo): Promise<Todo> {
    const endpoint = `${this.host}${this.baseUrl}v1/todos/${id}`

    return fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    }).then((res) =>
      this.handleResponse<Todo>(
        res,
        `Failed to update todo(${id}) from ${endpoint}: ${res.statusText}`
      )
    )
  }

  async remove(id: string): Promise<void> {
    const endpoint = `${this.host}${this.baseUrl}v1/todos/${id}`

    await fetch(endpoint, {
      method: 'DELETE'
    }).then((res) =>
      this.handleVoidResponse(
        res,
        `Failed to remove todo(${id}) from ${endpoint}: ${res.statusText}`
      )
    )
  }
}
