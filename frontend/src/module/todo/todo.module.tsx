import './todo.module.css'
import TodoList from './component/todo-list/todo-list.tsx'
import TodoStats from './component/todo-stats/todo-stats.tsx'

function TodoModule() {
  return (
    <>
      <section id="center">
        <TodoList />
      </section>
      <section id="spacer"></section>
      <TodoStats />
    </>
  )
}

export default TodoModule
