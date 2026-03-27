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
  abstract findOne(id: string): Promise<Todo>
  abstract create(todo: Partial<Todo>): Promise<Todo>
  abstract update(id: string, todo: Partial<Todo>): Promise<Todo>
  abstract remove(id: string): Promise<void>
}
