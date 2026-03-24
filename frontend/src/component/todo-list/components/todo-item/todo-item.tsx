import { useState } from 'react'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-item.module.css'

export interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const commitEdit = () => {
    setIsEditing(false)
    onEdit(todo.id, editText)
  }

  if (isEditing) {
    return (
      <li className={styles.item}>
        <input
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit()
            if (e.key === 'Escape') {
              setEditText(todo.text)
              setIsEditing(false)
            }
          }}
          autoFocus
        />
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
          title="Remove"
        >
          ✕
        </button>
      </li>
    )
  }

  return (
    <li className={`${styles.item} ${todo.complete ? styles.complete : ''}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.complete}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={`${styles.label} ${todo.complete ? styles.done : ''}`}
        onDoubleClick={() => setIsEditing(true)}
        title="Double tap to edit"
      >
        {todo.text}
      </span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        title="Remove"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
