type ApiError = {
  status: number
  message: string
  details?: unknown
}

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '')

const buildUrl = (path: string) => {
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`
  }

  return `${API_BASE_URL}/${path}`
}

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  if (!response.ok) {
    const errorBody = isJson ? await response.json() : await response.text()
    throw {
      status: response.status,
      message: response.statusText || 'Request failed',
      details: errorBody,
    } satisfies ApiError
  }

  if (response.status === 204) {
    return null as T
  }

  return (isJson ? await response.json() : await response.text()) as T
}
