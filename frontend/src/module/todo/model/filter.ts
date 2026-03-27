import type { Todo } from './todo.ts'

export const FILTERS = ['all', 'pending', 'completed']
export type Filter = (typeof FILTERS)[number]
export const FILTER_FN: Record<Filter, (t: Todo) => boolean> = {
  all: () => true,
  pending: (t) => !t.complete,
  completed: (t) => t.complete
}
