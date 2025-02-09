import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { PostlinesPage } from './pages/postlines/PostlinesPage'
import { BotsPage } from './pages/bots/BotsPage'
import { ChannelsPage } from './pages/channels/ChannelsPage'
import { PostlineForm } from './pages/postlines/PostlineForm'
import { ChannelForm } from './pages/channels/ChannelForm'
import { BotForm } from './pages/bots/BotForm'
import { PostsPage } from './pages/posts/PostsPage'
import { PostForm } from './pages/posts/PostForm'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/postlines/*" element={<PostlinesPage />} />
              <Route path="/channels/*" element={<ChannelsPage />} />
              <Route path="/bots/*" element={<BotsPage />} />
              <Route path="/postlines/new" element={<PostlineForm />} />
              <Route path="/channels/new" element={<ChannelForm />} />
              <Route path="/bots/new" element={<BotForm />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/posts/new" element={<PostForm />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
