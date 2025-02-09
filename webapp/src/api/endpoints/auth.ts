import { client } from '../client'

export const authApi = {
  login: (data: { email: string; password: string }) => 
    client('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    
  register: (data: { email: string; password: string; name: string }) =>
    client('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    
  refresh: () => 
    client('/auth/refresh', { method: 'POST' })
}
