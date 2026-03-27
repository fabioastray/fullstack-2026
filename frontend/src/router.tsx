import { createBrowserRouter } from 'react-router-dom'
import AppModule from './app.module.tsx'
import TodoPage from './page/todo/todo.page.tsx'
import AboutPage from './page/about/about.page.tsx'
import { routes as todoRoutes } from './page/todo/todo.router'
import LoginPage from './module/login/login.module.tsx'
import { AuthProvider } from './context/auth/auth.context.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AppModule />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <AboutPage /> },
      {
        path: 'todos',
        element: <TodoPage />,
        children: todoRoutes
      }
    ]
  },
  {
    path: 'login',
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    )
  }
])
