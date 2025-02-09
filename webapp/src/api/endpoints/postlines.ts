import { client } from '../client'

export const postlinesApi = {
  getAll: () => 
    client('/postlines'),
    
  getOne: (id: string) => 
    client(`/postlines/${id}`),
    
  create: (data: { name: string; description: string }) =>
    client('/postlines', { method: 'POST', body: JSON.stringify(data) }),
    
  update: (id: string, data: { name?: string; description?: string; status?: string }) =>
    client(`/postlines/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    
  delete: (id: string) =>
    client(`/postlines/${id}`, { method: 'DELETE' })
}
