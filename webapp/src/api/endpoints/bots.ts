import { client } from '../client'

export const botsApi = {
  getAll: () => 
    client('/bots'),
    
  getOne: (id: string) => 
    client(`/bots/${id}`),
    
  create: (data: { name: string; bot_token: string; description?: string }) =>
    client('/bots', { method: 'POST', body: JSON.stringify(data) }),
    
  update: (id: string, data: { name?: string; description?: string }) =>
    client(`/bots/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    
  delete: (id: string) =>
    client(`/bots/${id}`, { method: 'DELETE' })
}
