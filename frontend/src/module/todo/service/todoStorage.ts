import type { Todo } from '../model/todo.ts'

const STORAGE_KEY = 'todos'
const DELAY = 200

export const loadTodos = (): Promise<Todo[]> => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return Promise.resolve([])

  return new Promise((resolve) =>
    setTimeout(() => {
      try {
        resolve(JSON.parse(saved) as Todo[])
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error parsing todos', error.message)
        }
        return resolve([])
      }
    }, DELAY)
  )
}

export const storeTodos = (todos: Todo[]): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    resolve()
  })
}
