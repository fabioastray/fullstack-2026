import './todo.module.css'
import TodoList from './component/todo-list/todo-list.tsx'
import TodoStats from './component/todo-stats/todo-stats.tsx'
import { useEffect } from 'react'
import { useTodoStore } from './store/todo.store.ts'

function TodoModule() {
  useEffect(() => void useTodoStore.getState().findAll(), [])

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
