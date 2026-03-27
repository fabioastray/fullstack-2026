import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => {
    login()
    // Redirect back to intended page, or todos if no specific location
    const from = (location.state as any)?.from?.pathname || '/todos'
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Fake Login</button>
    </div>
  )
}
