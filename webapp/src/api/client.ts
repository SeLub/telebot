const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface FetchOptions extends RequestInit {
  token?: string
}

async function client(endpoint: string, { token, ...customConfig }: FetchOptions = {}) {
  const headers: Record<string, string> = {}
  
  if (!(customConfig.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)
  const data = await response.json()

  if (response.ok) {
    return data
  }

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  throw data
}

export { client }
