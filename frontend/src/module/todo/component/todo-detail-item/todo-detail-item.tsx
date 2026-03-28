import styles from './todo-detail-item.module.css'
import { Link } from 'react-router-dom'
import Spinner from '../../../../common/component/spinner/spinner.tsx'
import { useTodo } from '../../hooks/useTodos.ts'

export interface Props {
  id: string | undefined
}

function TodoDetailItem({ id }: Props) {
  const { todo, loading, error } = useTodo(id ?? '')

  if (loading) return <Spinner message="Loading todo..." />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/todos">
          ← Back
        </Link>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && !todo && <span>TODO not found!</span>}
      {todo && (
        <p className={`${styles.text} ${todo.complete ? styles.done : ''}`}>
          {todo.text}
        </p>
      )}
    </div>
  )
}

export default TodoDetailItem
