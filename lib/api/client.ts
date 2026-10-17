/**
 * Future independent NestJS API transport. This module makes no requests until
 * explicitly called after backend deployment. Auth should use secure HttpOnly
 * cookies (with CSRF/origin controls) and never browser-local token storage.
 */
export class ApiRequestError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

export function apiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_KOOKABURRA_API_URL
  if (!configured) throw new Error('Backend API is not configured. Storefront remains in preview mode.')
  let url: URL
  try {
    url = new URL(configured)
  } catch {
    throw new Error('Invalid API URL')
  }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid API protocol')
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('Production API URL must use HTTPS')
  }
  if (url.username || url.password || url.search || url.hash) throw new Error('Invalid API URL')
  return url.origin + url.pathname.replace(/\/$/, '')
}

export async function apiRequest<T>(path: `/v1/${string}`, options: {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'; body?: unknown; signal?: AbortSignal
} = {}): Promise<T> {
  if (!/^\/v1\/[a-zA-Z0-9/_?&=.%+,-]+$/.test(path) || path.includes('..') || path.includes('//')) {
    throw new Error('Unsafe API path')
  }
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: options.method ?? 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json', ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }) },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
  })
  if (!response.ok) throw new ApiRequestError(response.status, `API request failed (${response.status})`)
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
