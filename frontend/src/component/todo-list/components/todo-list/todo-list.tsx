import TodoItem from '../todo-item/todo-item.tsx'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-list.module.css'
import { useState } from 'react'

export interface Props {
  loading: boolean
  todos: Todo[]
  onToggle: (id: string) => void
  onCreate: (text: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

const FILTERS = ['all', 'pending', 'completed'] as const
type Filter = (typeof FILTERS)[number]
const FILTER_FN: Record<Filter, (t: Todo) => boolean> = {
  all: () => true,
  pending: (t) => !t.complete,
  completed: (t) => t.complete
}

function TodoList({
  loading,
  todos,
  onToggle,
  onCreate,
  onEdit,
  onDelete
}: Props) {
  const [filter, setFilter] = useState<Filter>(FILTERS[0])
  const [text, setText] = useState('')

  const filteredTodos = todos.filter(FILTER_FN[filter])
  const noTodos = todos.length === 0
  const noFilteredTodos = todos.length > 0 && filteredTodos.length === 0

  const commitNew = () => {
    if (!text.trim()) return
    onCreate(text.trim())
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

      <div className={styles.filterRow}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterButton} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {noTodos && <p className={styles.empty}>No todos yet.</p>}
      {noFilteredTodos && <p className={styles.empty}>No {filter} todos.</p>}

      <ul className={styles.list}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
