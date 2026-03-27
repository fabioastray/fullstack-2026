import styles from './todo-stats.module.css'
import { useTodoStore } from '../../store/todo.store.ts'

function TodoStats() {
  const { todos, loading } = useTodoStore()

  const total = todos.length
  const complete = todos.filter((t) => t.complete).length
  const pending = total - complete

  const completed = total > 0 && pending === 0

  if (!loading)
    return (
      <div className={styles.stats}>
        <span className={styles.stat}>
          Total: <span>{total}</span>
        </span>
        <span className={styles.stat}>
          Pending: <span>{pending}</span>
        </span>
        <span className={styles.stat}>
          Complete: <span>{complete}</span>
        </span>
        {completed && (
          <span className={styles.fireworks}>
            🎆 You've completed your todos!
          </span>
        )}
      </div>
    )
}

export default TodoStats
