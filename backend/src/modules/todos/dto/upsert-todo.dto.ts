import { Todo } from './todo.dto'

export type UpsertTodo = Omit<Todo, 'id'>
