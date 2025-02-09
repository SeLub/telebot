import { client } from '../client'

interface MediaItem {
  type: 'image' | 'video' | 'document' | 'audio'
  url: string
}

interface Post {
  post_id: string
  postline_id: string
  text: string
  media: MediaItem[]
  created_at: string
  updated_at: string
}

interface CreatePostData {
  text: string
  postline_id: string
  user_id: string
  media?: File[]
}

export const postsApi = {
  getAll: () => 
    client('/posts'),
    
  getOne: (id: string) => 
    client(`/posts/${id}`),
    
  create: (data: CreatePostData) => {
    const postData = {
      text: data.text,
      postline_id: data.postline_id,
      user_id: data.user_id,
      media: data.media?.length ? data.media.map(file => ({
        type: file.type.split('/')[0] as MediaItem['type'],
        url: URL.createObjectURL(file)
      })) : []
    }

    return client('/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  },
    
  update: (id: string, data: Partial<Post>) =>
    client(`/posts/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
    
  delete: (id: string) =>
    client(`/posts/${id}`, { method: 'DELETE' })
}
