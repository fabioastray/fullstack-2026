import styles from './todo-detail-item.module.css'
import { useTodoStore } from '../../store/todo.store'
import { Link } from 'react-router-dom'

export interface Props {
  id: string | undefined
}

function TodoDetailItem({ id }: Props) {
  const { getTodoById } = useTodoStore()

  const todo = id ? getTodoById(id) : undefined

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/todos">
          ← Back
        </Link>
      </div>
      {!todo && <span>TODO not found!</span>}
      {todo && (
        <p className={`${styles.text} ${todo.complete ? styles.done : ''}`}>
          {todo.text}
        </p>
      )}
    </div>
  )
}

export default TodoDetailItem
