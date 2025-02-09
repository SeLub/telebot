import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'
import { postsApi, postlinesApi } from '../../api/endpoints'

interface PostFormData {
  text: string
  postline_id: string
  media: File[]
  user_id: string
}

interface Postline {
  postline_id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'deleted'
  last_updated: string
}

export function PostForm() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [text, setText] = useState('')
  const [postlineId, setPostlineId] = useState('')
  const [mediaFiles, setMediaFiles] = useState<File[]>([])

  const { data: postlines = [] } = useQuery<Postline[]>({
    queryKey: ['postlines'],
    queryFn: postlinesApi.getAll
  })

  const createMutation = useMutation<any, Error, PostFormData>({
    mutationFn: (data: PostFormData) => postsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token) {
      const formData = new FormData()
      formData.append('text', text)
      formData.append('postline_id', postlineId)
      formData.append('user_id', token)
      
      // Add empty media array if no files selected
      if (mediaFiles.length === 0) {
        formData.append('media', JSON.stringify([]))
      } else {
        mediaFiles.forEach(file => {
          formData.append('media', file)
        })
      }
  
      createMutation.mutate({ 
        text, 
        postline_id: postlineId,
        media: mediaFiles,
        user_id: token 
      })
    }
  }  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files))
    }
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Postline:</label>
          <select 
            value={postlineId} 
            onChange={(e) => setPostlineId(e.target.value)}
            required
          >
            <option value="">Select Postline</option>
            {postlines.map(postline => (
              <option key={postline.postline_id} value={postline.postline_id}>
                {postline.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Media:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}
