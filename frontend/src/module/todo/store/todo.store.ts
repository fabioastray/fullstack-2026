import { type Todo, type UpsertTodo } from '../model/todo.ts'
import { create } from 'zustand'
import { TodosHttpService } from '../service/todos-http.service.ts'
import { type Filter, FILTERS } from '../model/filter.ts'

export interface TodoStore {
  todos: Todo[]
  selectedTodo: Todo | undefined
  loading: boolean
  creating: boolean
  mutatingId: string | null
  error: string | null
  filters: Filter[]
  selectedFilter: Filter
  findAll: () => void
  findOne: (id: string) => void
  create: (upsertTodo: UpsertTodo) => void
  update: (id: string, upsertTodo: UpsertTodo) => void
  remove: (id: string) => void
  setFilter: (filter: Filter) => void
}

const service = new TodosHttpService()

const toError = (e: unknown, message: string): string =>
  `${message}: ${e instanceof Error ? e.message : ''}`

export const useTodoStore = create<TodoStore>()((set, get) => ({
  // State
  todos: [],
  selectedTodo: undefined,
  loading: true,
  creating: false,
  mutatingId: null,
  error: null,
  filters: FILTERS,
  selectedFilter: 'all',

  // Getters
  findAll: async () => {
    set({ loading: true, error: null })
    try {
      const todos = await service.findAll()
      set({ loading: false, todos: todos })
    } catch (e) {
      set({ loading: false, error: toError(e, 'Failed to load todos') })
    }
  },
  findOne: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const todo = await service.findOne(id)
      set({ loading: false, selectedTodo: todo })
    } catch (e) {
      set({ loading: false, error: toError(e, `Failed to load todo ${id}`) })
    }
  },

  // Setters
  create: async (upsertTodo: UpsertTodo) => {
    set({ creating: true, error: null })
    try {
      const todo = await service.create(upsertTodo)
      set({ creating: false, todos: [...get().todos, todo] })
    } catch (e) {
      set({ creating: false, error: toError(e, 'Failed to create todo') })
    }
  },
  update: async (id: string, upsertTodo: UpsertTodo) => {
    set({ mutatingId: id, error: null })
    try {
      const todo = await service.update(id, upsertTodo)
      set({
        mutatingId: null,
        todos: get().todos.map((t) => (t.id === todo.id ? todo : t))
      })
    } catch (e) {
      set({ mutatingId: null, error: toError(e, 'Failed to update todo') })
    }
  },
  remove: async (id: string) => {
    set({ mutatingId: id, error: null })
    try {
      await service.remove(id)
      set({
        mutatingId: null,
        todos: get().todos.filter((t) => t.id !== id)
      })
    } catch (e) {
      set({ mutatingId: null, error: toError(e, 'Failed to remove todo') })
    }
  },
  setFilter: (filter: Filter) =>
    set(() => ({
      selectedFilter: filter
    }))
}))
