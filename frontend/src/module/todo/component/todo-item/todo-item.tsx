import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-item.module.css'
import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../../store/todo.store.ts'

const EDIT_DEBOUNCE_MS = 500

export interface Props {
  todo: Todo
}

function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const navigate = useNavigate()
  const { toggle, edit, remove } = useTodoStore()

  const debouncedEdit = useDebouncedCallback(
    (text: string) => edit(todo.id, text),
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

  const onClick = (id: string) => navigate(`/todos/${id}`)

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
      </li>
    )
  }

  return (
    <li className={`${styles.item} ${todo.complete ? styles.complete : ''}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.complete}
        onChange={() => toggle(todo.id)}
      />
      <span
        className={`${styles.label} ${todo.complete ? styles.done : ''}`}
        onClick={() => onClick(todo.id)}
        title="Double tap to edit"
      >
        {todo.text}
      </span>
      <p>{todo.complete ? '✅ Complete' : '⏳ Pending'}</p>
      <button
        className={styles.deleteButton}
        onClick={() => setIsEditing(true)}
        title="Edit"
      >
        ✏️
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => remove(todo.id)}
        title="Remove"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
