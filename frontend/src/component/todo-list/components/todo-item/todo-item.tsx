import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-item.module.css'

const EDIT_DEBOUNCE_MS = 500

export interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const debouncedEdit = useDebouncedCallback(
    (text: string) => onEdit(todo.id, text),
    EDIT_DEBOUNCE_MS
  )

  const commitEdit = () => {
    debouncedEdit.flush()
    setIsEditing(false)
  }

  const onChange = (value: string) => {
    setEditText(value)
    debouncedEdit(value)
  }

  const onKeyDown = (key: string) => {
    if (key === 'Enter') commitEdit()
    if (key === 'Escape') {
      debouncedEdit.cancel()
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <li className={styles.item}>
        <input
          className={styles.editInput}
          value={editText}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e.key)}
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
