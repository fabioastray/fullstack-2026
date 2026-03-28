import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TodosHttpService } from '../service/todos-http.service.ts'
import type { UpsertTodo } from '../model/todo.ts'

const service = new TodosHttpService()

export const TODO_KEYS = {
  all: ['todos'] as const,
  one: (id: string) => ['todos', id] as const
}

export function useTodos() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: TODO_KEYS.all,
    queryFn: () => service.findAll()
  })

  const create = useMutation({
    mutationFn: (todo: UpsertTodo) => service.create(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_KEYS.all })
  })

  const update = useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: UpsertTodo }) =>
      service.update(id, todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_KEYS.all })
  })

  const remove = useMutation({
    mutationFn: (id: string) => service.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_KEYS.all })
  })

  return {
    todos: query.data ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    creating: create.isPending,
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    mutatingId:
      update.isPending || remove.isPending
        ? ((update.variables?.id ?? remove.variables) as string)
        : null
  }
}

export function useTodo(id: string) {
  const query = useQuery({
    queryKey: TODO_KEYS.one(id),
    queryFn: () => service.findOne(id)
  })

  return {
    todo: query.data,
    loading: query.isLoading,
    error: query.error?.message ?? null
  }
}
