import styles from './todo-detail-item.module.css'
import { useTodoStore } from '../../store/todo.store'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../../../../common/component/spinner/spinner.tsx'

export interface Props {
  id: string
}

function TodoDetailItem({ id }: Props) {
  const { loading, error, selectedTodo } = useTodoStore()

  useEffect(() => {
    if (id) useTodoStore.getState().findOne(id)
  }, [id])

  if (loading) return <Spinner message="Loading todo..." />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/todos">
          ← Back
        </Link>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && !selectedTodo && <span>TODO not found!</span>}
      {selectedTodo && (
        <p
          className={`${styles.text} ${selectedTodo.complete ? styles.done : ''}`}
        >
          {selectedTodo.text}
        </p>
      )}
    </div>
  )
}

export default TodoDetailItem
