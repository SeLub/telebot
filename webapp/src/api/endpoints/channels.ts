import { client } from '../client'

export const channelsApi = {
  getAll: () => 
    client('/channels'),
    
  getOne: (id: string) => 
    client(`/channels/${id}`),
    
  create: (data: { name: string; description?: string; language?: string }) =>
    client('/channels', { method: 'POST', body: JSON.stringify(data) }),
    
  update: (id: string, data: { name?: string; description?: string; language?: string }) =>
    client(`/channels/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    
  delete: (id: string) =>
    client(`/channels/${id}`, { method: 'DELETE' })
}
