import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './component/todo-list/components/todo-list/todo-list.tsx'
import TodoStats from './component/todo-list/components/todo-stats/todo-stats.tsx'
import type { Todo } from './component/todo-list/model/todo.ts'

function App() {
  const mockedTodos = [
    { id: '1', text: 'Learn React fundamentals', complete: false },
    { id: '2', text: 'Master TypeScript props', complete: true },
  ]

  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<Todo[]>(mockedTodos)

  const onToggle = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    )
  }, [])

  const onEdit = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      <section id="spacer"></section>
      <TodoList todos={todos} onToggle={onToggle} onEdit={onEdit} />
      <TodoStats todos={todos} />
    </>
  )
}

export default App
