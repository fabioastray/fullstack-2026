import { useParams } from 'react-router-dom'
import TodoDetailItem from '../../module/todo/component/todo-detail-item/todo-detail-item.tsx'

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>()

  return <TodoDetailItem id={id} />
}
