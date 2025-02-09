import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export function MainLayout() {
  const { logout } = useAuth()

  return (
    <div className="main-layout">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/postlines">Postlines</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/channels">Channels</Link></li>
            <li><Link to="/bots">Bots</Link></li>
          </ul>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
