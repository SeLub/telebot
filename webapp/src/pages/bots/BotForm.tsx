import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { botsApi } from '../../api/endpoints'
import { useAuth } from '../../auth/AuthProvider'
interface BotFormData {
  name: string
  description: string
  bot_token: string
  user_id: string
}

export function BotForm() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [botToken, setBotToken] = useState('')
  const [description, setDescription] = useState('')

  const createMutation = useMutation<any, Error, BotFormData>({
    mutationFn: (data: BotFormData) => botsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bots'] })
      navigate('/bots')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token) {
      createMutation.mutate({ name, description, bot_token: botToken, user_id: token })
    }
  }

  return (
    <div>
      <h1>Add New Bot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bot Token:</label>
          <input
            type="text"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Bot</button>
      </form>
    </div>
  )
}
