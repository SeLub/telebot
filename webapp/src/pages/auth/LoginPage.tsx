import { useState } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import { authApi } from '../../api/endpoints'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await authApi.login({ email, password })
    login(result.token)
    navigate('/')
  }

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}