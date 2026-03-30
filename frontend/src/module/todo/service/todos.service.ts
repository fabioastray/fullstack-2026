import type { Todo } from '../model/todo.ts'

export abstract class TodosService {
  handleResponse<T>(response: Response, errorMessage?: string): T {
    if (!response.ok) throw new Error(errorMessage)

    return response.json() as T
  }

  handleVoidResponse(response: Response, errorMessage?: string): void {
    if (!response.ok) throw new Error(errorMessage)
  }

  abstract findAll(): Promise<Todo[]>
  abstract findOne(id: number): Promise<Todo>
  abstract create(todo: Partial<Todo>): Promise<Todo>
  abstract update(id: number, todo: Partial<Todo>): Promise<Todo>
  abstract remove(id: number): Promise<void>
}
