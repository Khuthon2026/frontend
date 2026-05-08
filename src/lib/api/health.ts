import { apiFetch } from './client'

type HealthResponse = {
  status: string
  timestamp?: string
}

export const getHealth = () => apiFetch<HealthResponse>('/health')
