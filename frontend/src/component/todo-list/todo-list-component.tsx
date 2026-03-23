import {useCallback, useState} from 'react'
import type {Task} from "./model/task.ts";

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
            <pre>TODO list</pre>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggle(task.id)}
                        />
                        <span style={{textDecoration: task.done ? 'line-through' : 'none'}}>
            {task.label}
          </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoListComponent