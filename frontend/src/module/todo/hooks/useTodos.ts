import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TodosHttpService } from '../service/todos-http.service.ts'
import type { UpsertTodo } from '../model/todo.ts'

const service = new TodosHttpService()

export const TODO_KEYS = {
  all: ['todos'] as const,
  one: (id: number) => ['todos', id] as const
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
    mutationFn: ({ id, todo }: { id: number; todo: UpsertTodo }) =>
      service.update(id, todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_KEYS.all })
  })

  const remove = useMutation({
    mutationFn: (id: number) => service.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_KEYS.all })
  })

  return {
    todos: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    creating: create.isPending,
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    mutatingId:
      update.isPending || remove.isPending
        ? (update.variables?.id ?? remove.variables)
        : null
  }
}

export function useTodo(id: number | undefined) {
  const query = useQuery({
    queryKey: TODO_KEYS.one(id!),
    queryFn: () => service.findOne(id!),
    enabled: id !== undefined
  })

  return {
    todo: query.data,
    loading: query.isLoading,
    error: query.error?.message ?? null
  }
}
