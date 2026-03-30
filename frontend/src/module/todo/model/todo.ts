export interface Todo {
  id: number
  text: string
  complete: boolean
}

export type UpsertTodo = Omit<Todo, 'id'>
