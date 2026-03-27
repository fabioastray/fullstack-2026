import { useState } from 'react'
import type { Todo, UpsertTodo } from '../../model/todo.ts'
import styles from './todo-item.module.css'
import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../../store/todo.store.ts'

export interface Props {
  todo: Todo
}

function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const navigate = useNavigate()
  const { update, remove, mutatingId } = useTodoStore()
  const isBusy = mutatingId === todo.id

  const commitEdit = () => {
    const upsertTodo: UpsertTodo = {
      text: editText,
      complete: todo.complete
    }
    update(todo.id, upsertTodo)
    setIsEditing(false)
  }

  const onChange = (value: string) => setEditText(value)

  const onKeyDown = (key: string) => {
    if (key === 'Enter') commitEdit()
    if (key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  const onClick = () => navigate(`/todos/${todo.id}`)

  const toggleComplete = () => {
    const upsertTodo: UpsertTodo = {
      text: todo.text,
      complete: !todo.complete
    }
    update(todo.id, upsertTodo)
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
      </li>
    )
  }

  return (
    <li
      className={`${styles.item} ${todo.complete ? styles.complete : ''} ${isBusy ? styles.busy : ''}`}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.complete}
        disabled={isBusy}
        onChange={() => toggleComplete()}
      />
      <span
        className={`${styles.label} ${todo.complete ? styles.done : ''}`}
        onClick={() => onClick()}
        title="Double tap to edit"
      >
        {todo.text}
      </span>
      <p>{todo.complete ? '✅ Complete' : '⏳ Pending'}</p>
      <button
        className={styles.deleteButton}
        onClick={() => setIsEditing(true)}
        title="Edit"
        disabled={isBusy}
      >
        ✏️
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => remove(todo.id)}
        title="Remove"
        disabled={isBusy}
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
