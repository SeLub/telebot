import { useQuery } from '@tanstack/react-query'
import { postlinesApi, channelsApi, botsApi, postsApi } from '../../api/endpoints'

export function DashboardPage() {
  const { data: postlines = [] } = useQuery({
    queryKey: ['postlines'],
    queryFn: postlinesApi.getAll
  })

  const { data: channels = [] } = useQuery({
    queryKey: ['channels'],
    queryFn: channelsApi.getAll
  })

  const { data: bots = [] } = useQuery({
    queryKey: ['bots'],
    queryFn: botsApi.getAll
  })

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll
  })

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Postlines</h3>
          <div className="stat-value">{postlines.length}</div>
        </div>
        <div className="stat-card">
          <h3>Channels</h3>
          <div className="stat-value">{channels.length}</div>
        </div>
        <div className="stat-card">
          <h3>Bots</h3>
          <div className="stat-value">{bots.length}</div>
        </div>
        <div className="stat-card">
          <h3>Posts</h3>
          <div className="stat-value">{posts.length}</div>
        </div>
      </div>
    </div>
  )
}
