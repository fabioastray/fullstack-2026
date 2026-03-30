import { useParams } from 'react-router-dom'
import TodoDetailItem from '../../module/todo/component/todo-detail-item/todo-detail-item.tsx'

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) return <div>Invalid todo</div>

  return <TodoDetailItem id={parseInt(id)} />
}
