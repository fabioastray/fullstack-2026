import type { Todo } from '../../model/todo.ts'
import styles from './todo-stats.module.css'

export interface Props {
  todos: Todo[]
}

function TodoStats({ todos }: Props) {
  const total = todos.length
  const complete = todos.filter((t) => t.complete).length
  const pending = total - complete

  const completed = total > 0 && pending === 0

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
        <span className={styles.fireworks}>🎆 Completed your list!</span>
      )}
    </div>
  )
}

export default TodoStats
