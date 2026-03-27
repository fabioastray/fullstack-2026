import TodoDetailPage from './todo-detail.page.tsx'

export const routes = [
  {
    index: true,
    lazy: async () => {
      const { default: Component } =
        await import('../../module/todo/todo.module')
      return { Component }
    }
  },
  { path: ':id', element: <TodoDetailPage /> }
]
