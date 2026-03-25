import './App.css'
import TodoList from './component/todo-list/components/todo-list/todo-list.tsx'
import TodoStats from './component/todo-list/components/todo-stats/todo-stats.tsx'
import { useTodoStore } from './store/useTodoStore.ts'

function App() {
  const { todos, loading, toggle, create, edit, remove } = useTodoStore()

  const sortedTodos = [...todos].sort((a, b) => parseInt(a.id) - parseInt(b.id))

  return (
    <>
      <section id="center">
        <TodoList
          loading={loading}
          todos={sortedTodos}
          onToggle={toggle}
          onEdit={edit}
          onCreate={create}
          onDelete={remove}
        />
      </section>
      <section id="spacer"></section>
      <TodoStats loading={loading} todos={todos} />
    </>
  )
}

export default App
