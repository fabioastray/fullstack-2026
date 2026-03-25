import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../component/todo-list/model/todo.ts'
import { loadTodos, storeTodos } from '../service/todoStorage.ts'

interface UseTodoStore {
  todos: Todo[]
  loading: boolean
  error: string | null
  toggle: (id: string) => void
  create: (text: string) => void
  edit: (id: string, text: string) => void
  remove: (id: string) => void
}

export function useTodoStore(): UseTodoStore {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initialised = useRef(false)

  useEffect(() => {
    let cancelled = false

    loadTodos()
      .then((data) => {
        if (!cancelled) {
          setTodos(data)
          initialised.current = true
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load todos')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!initialised.current) return
    void storeTodos(todos)
  }, [todos])

  const toggle = (id: string) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    )

  const create = (text: string) =>
    setTodos((prev) => {
      const nextId =
        prev.length === 0
          ? 1
          : Math.max(...prev.map((todo) => parseInt(todo.id))) + 1
      return [...prev, { id: nextId.toString(), text, complete: false }]
    })

  const edit = (id: string, text: string) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )

  const remove = (id: string) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== id))

  return { todos, loading, error, toggle, create, edit, remove }
}
