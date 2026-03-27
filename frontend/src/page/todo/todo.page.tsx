import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth/useAuth.ts'

export default function TodoPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true
      })
    }
  }, [isLoggedIn, navigate, location.pathname])

  if (!isLoggedIn) {
    return null // Prevent flash while redirecting
  }

  return <Outlet />
}
