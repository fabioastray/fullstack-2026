import TodoItem from '../todo-item/todo-item.tsx'
import styles from './todo-list.module.css'
import { useState } from 'react'
import { useTodoStore } from '../../store/todo.store.ts'
import { type Filter, FILTER_FN } from '../../model/todo.ts'
import { TodoFilter } from '../todo-filter/todo-filter.tsx'

export interface Props {
  selectedFilter: Filter
}

function TodoList() {
  const [text, setText] = useState('')

  const { todos, loading, selectedFilter, create } = useTodoStore()

  const sortedTodos = [...todos].sort((a, b) => parseInt(a.id) - parseInt(b.id))
  const filteredTodos = sortedTodos.filter(FILTER_FN[selectedFilter])
  const noTodos = todos.length === 0
  const noFilteredTodos = todos.length > 0 && filteredTodos.length === 0

  const commitNew = () => {
    if (!text.trim()) return
    create(text.trim())
    setText('')
  }

  const onChange = (value: string) => setText(value)

  const onKeyDown = (key: string) => {
    if (key === 'Enter') commitNew()
    if (key === 'Escape') setText('')
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>

      <div className={styles.controls}>
        <input
          id="add"
          className={styles.addInput}
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e.key)}
        />
        <button
          className={styles.addButton}
          onClick={commitNew}
          disabled={!text.trim()}
        >
          Add
        </button>
      </div>

      <TodoFilter />

      {noTodos && <p className={styles.empty}>No todos yet.</p>}
      {noFilteredTodos && (
        <p className={styles.empty}>No {selectedFilter} todos.</p>
      )}

      <ul className={styles.list}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
