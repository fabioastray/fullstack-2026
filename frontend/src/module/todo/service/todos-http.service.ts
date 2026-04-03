import type { Todo, UpsertTodo } from '../model/todo.ts'
import { TodosService } from './todos.service.ts'
import type { ResultsResponse } from '../../../common/model/results-response.dto.ts'

export class TodosHttpService extends TodosService {
  host = import.meta.env.VITE_API_HOST
  baseUrl = '/api/'

  toURLQuery(queryParams: Record<string, string | number | boolean>): string {
    const query = Object.entries(queryParams)
      .filter(([key, value]) => !!key && !!value)
      .reduce((prev, [key, value]) => {
        prev.set(key, String(value))
        return prev
      }, new URLSearchParams())

    return query.size > 0 ? `?${query}` : ''
  }

  async findAll(
    page?: number,
    pageSize?: number
  ): Promise<ResultsResponse<Todo>> {
    const queryParams = {
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {})
    } as Record<string, number>

    const query = this.toURLQuery(queryParams)
    const endpoint = `${this.host}${this.baseUrl}v1/todos${query}`

    return fetch(endpoint).then((res) =>
      this.handleResponse<ResultsResponse<Todo>>(
        res,
        `Failed to get todos from ${endpoint}: ${res.statusText}`
      )
    )
  }

  async findOne(id: number): Promise<Todo> {
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

  async update(id: number, todo: UpsertTodo): Promise<Todo> {
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

  async remove(id: number): Promise<void> {
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
