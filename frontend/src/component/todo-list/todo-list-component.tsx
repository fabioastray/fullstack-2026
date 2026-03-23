import {useCallback, useState} from 'react'
import type {Task} from "./model/task.ts";
import styles from './todo-list-component.module.css'

export interface TodoListProps {
    defaultTasks: Task[]
}

function TodoListComponent({defaultTasks}: TodoListProps) {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks)

    const toggle = useCallback((id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t))
    }, [])

    return (
        <div>
            <h2>TODO list</h2>
            {tasks.length === 0 && <p>No tasks yet.</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggle(task.id)}
                        />
                        <span className={task.done ? styles.taskDone : undefined}>
                            {task.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoListComponent