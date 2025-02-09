import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'
import { postlinesApi } from '../../api/endpoints'

interface PostlineFormData {
  name: string
  description: string
  user_id: string
}

export function PostlineForm() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const createMutation = useMutation<any, Error, PostlineFormData>({
    mutationFn: (data: PostlineFormData) => postlinesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postlines'] })
      navigate('/postlines')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token) {
      createMutation.mutate({ name, description, user_id: token })
    }
  }

  return (
    <div>
      <h1>Create New Postline</h1>
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
        <button type="submit">Create Postline</button>
      </form>
    </div>
  )
}
