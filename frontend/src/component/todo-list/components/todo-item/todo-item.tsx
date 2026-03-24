import { useState } from 'react'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-item.module.css'

export interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
}

function TodoItem({ todo, onToggle, onEdit }: Props) {
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
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit()
            if (e.key === 'Escape') {
              setEditText(todo.text)
              setIsEditing(false)
            }
          }}
          autoFocus
        />
      </li>
    )
  }

  return (
    <li className={`${styles.item} ${todo.complete ? styles.complete : ''}`}>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={`${styles.label} ${todo.complete ? styles.done : ''}`}
        onDoubleClick={() => setIsEditing(true)}
      >
        {todo.text}
      </span>
    </li>
  )
}

export default TodoItem
