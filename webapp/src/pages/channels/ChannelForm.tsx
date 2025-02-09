import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { channelsApi } from '../../api/endpoints'
import { useAuth } from '../../auth/AuthProvider'
interface ChannelFormData {
  name: string
  description: string
  language: string
  user_id: string
}

export function ChannelForm() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('en')

  const createMutation = useMutation<any, Error, ChannelFormData>({
    mutationFn: (data: ChannelFormData) => channelsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      navigate('/channels')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token) {
      createMutation.mutate({ name, description, language, user_id: token })
    }
  }

  return (
    <div>
      <h1>Add New Channel</h1>
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
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <button type="submit">Add Channel</button>
      </form>
    </div>
  )
}
