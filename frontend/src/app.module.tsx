import { NavLink, Outlet } from 'react-router-dom'
import styles from './app.module.css'
import { useAuth } from './context/auth/useAuth.ts'

export default function AppModule() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <div>
      <nav className={styles.nav}>
        <NavLink
          to="/todos"
          end
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          Todos
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          About
        </NavLink>
        <div className={styles.navAuth}>
          {isLoggedIn && <button onClick={logout}>Logout</button>}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
