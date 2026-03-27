import TodoItem from '../todo-item/todo-item.tsx'
import styles from './todo-list.module.css'
import { useState } from 'react'
import { useTodoStore } from '../../store/todo.store.ts'
import { TodoFilter } from '../todo-filter/todo-filter.tsx'
import Spinner from '../../../../common/component/spinner/spinner.tsx'
import { FILTER_FN } from '../../model/filter.ts'
import type { UpsertTodo } from '../../model/todo.ts'

function TodoList() {
  const [text, setText] = useState('')

  const { todos, loading, creating, error, selectedFilter, create } =
    useTodoStore()

  const sortedTodos = [...todos].sort((a, b) => parseInt(a.id) - parseInt(b.id))
  const filteredTodos = sortedTodos.filter(FILTER_FN[selectedFilter])
  const noTodos = todos.length === 0
  const noFilteredTodos = todos.length > 0 && filteredTodos.length === 0

  const commitNew = () => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const todo: UpsertTodo = {
      text: trimmedText,
      complete: false
    }
    create(todo)
    setText('')
  }

  const onChange = (value: string) => setText(value)

  const onKeyDown = (key: string) => {
    if (key === 'Enter') commitNew()
    if (key === 'Escape') setText('')
  }

  if (loading) return <Spinner message="Loading todos..." />
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>

      <div className={styles.controls}>
        <input
          id="add"
          className={styles.addInput}
          placeholder="What needs to be done?"
          value={text}
          disabled={creating}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e.key)}
        />
        <button
          className={styles.addButton}
          onClick={commitNew}
          disabled={!text.trim() || creating}
        >
          {creating ? 'Adding...' : 'Add'}
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
