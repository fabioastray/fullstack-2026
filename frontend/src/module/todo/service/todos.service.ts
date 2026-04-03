import type { Todo } from '../model/todo.ts'
import type { ResultsResponse } from '../../../common/model/results-response.dto.ts'

export abstract class TodosService {
  handleResponse<T>(response: Response, errorMessage?: string): T {
    if (!response.ok) throw new Error(errorMessage)

    return response.json() as T
  }

  handleVoidResponse(response: Response, errorMessage?: string): void {
    if (!response.ok) throw new Error(errorMessage)
  }

  abstract findAll(
    page?: number,
    pageSize?: number
  ): Promise<ResultsResponse<Todo>>
  abstract findOne(id: number): Promise<Todo>
  abstract create(todo: Partial<Todo>): Promise<Todo>
  abstract update(id: number, todo: Partial<Todo>): Promise<Todo>
  abstract remove(id: number): Promise<void>
}
