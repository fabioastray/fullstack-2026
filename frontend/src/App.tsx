import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './component/todo-list/components/todo-list/todo-list.tsx'
import TodoStats from './component/todo-list/components/todo-stats/todo-stats.tsx'
import type { Todo } from './component/todo-list/model/todo.ts'

const loadTodos = (): Todo[] => {
  const saved = localStorage.getItem('todos')
  if (!saved) return []

  try {
    return JSON.parse(saved) as Todo[]
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error parsing todos', error.message)
    }
    return []
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  const onToggle = (id: string) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    )

  const onCreate = (text: string) =>
    setTodos((prev) => {
      const nextId =
        prev.length === 0
          ? 1
          : Math.max(...prev.map((todo) => parseInt(todo.id))) + 1
      return [...prev, { id: nextId.toString(), text, complete: false }]
    })

  const onEdit = (id: string, text: string) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )

  const onDelete = (id: string) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== id))

  const sortedTodos = [...todos].sort((a, b) => parseInt(a.id) - parseInt(b.id))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <section id="center">
        <TodoList
          todos={sortedTodos}
          onToggle={onToggle}
          onEdit={onEdit}
          onCreate={onCreate}
          onDelete={onDelete}
        />
      </section>
      <section id="spacer"></section>
      <TodoStats todos={todos} />
    </>
  )
}

export default App
