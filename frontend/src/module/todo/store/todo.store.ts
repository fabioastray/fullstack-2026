import { type Filter, FILTERS, type Todo } from '../model/todo.ts'
import { create } from 'zustand'
import { persist, type PersistStorage } from 'zustand/middleware'
import { loadTodos, storeTodos } from '../service/todoStorage.ts'

const todoStorage: PersistStorage<Pick<TodoStore, 'todos'>> = {
  getItem: async () => {
    const todos = await loadTodos()
    return { state: { todos }, version: 0 }
  },
  setItem: async (__, value) => {
    await storeTodos(value.state.todos)
  },
  removeItem: () => {}
}

export interface TodoStore {
  todos: Todo[]
  loading: boolean
  error: string | null
  filters: Filter[]
  selectedFilter: Filter
  getTodoById: (id: string) => Todo | undefined
  create: (text: string) => void
  toggle: (id: string) => void
  edit: (id: string, text: string) => void
  remove: (id: string) => void
  setFilter: (filter: Filter) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      // State
      todos: [],
      loading: true,
      error: null,
      filters: FILTERS,
      selectedFilter: 'all',

      // Getters
      getTodoById: (id: string) => get().todos.find((todo) => todo.id === id),

      // Setters
      create: (text: string) =>
        set((state) => {
          const nextId =
            state.todos.length === 0
              ? 1
              : Math.max(...state.todos.map((todo) => parseInt(todo.id))) + 1
          const todo = { id: nextId.toString(), text, complete: false }
          return { todos: [...state.todos, todo] }
        }),
      toggle: (id: string) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, complete: !t.complete } : t
          )
        })),
      edit: (id: string, text: string) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, text } : t))
        })),
      remove: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id)
        })),
      setFilter: (filter: Filter) =>
        set(() => ({
          selectedFilter: filter
        }))
    }),
    {
      name: 'todo-storage',
      storage: todoStorage,
      partialize: (state) => ({ todos: state.todos }),
      onRehydrateStorage: () => (_, error) => {
        if (error) {
          useTodoStore.setState({
            error: 'Failed to load todos',
            loading: false
          })
        } else {
          useTodoStore.setState({ loading: false })
        }
      }
    }
  )
)
