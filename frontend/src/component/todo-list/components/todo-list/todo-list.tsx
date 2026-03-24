import TodoItem from '../todo-item/todo-item.tsx'
import type { Todo } from '../../model/todo.ts'
import styles from './todo-list.module.css'

export interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
}

function TodoList({ todos, onToggle, onEdit }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TODO list</h2>
      {todos.length === 0 && <p className={styles.empty}>No todos yet.</p>}
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
