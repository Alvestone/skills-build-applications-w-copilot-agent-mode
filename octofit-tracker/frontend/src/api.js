const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollectionUrl(component) {
  const resource = component.replace(/^\/+|\/+$/g, '')
  return `${API_BASE_URL}/api/${resource}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, next: null, previous: null, count: payload.length }
  }

  const page = payload?.data && !Array.isArray(payload.data)
    ? payload.data
    : payload

  const items = Array.isArray(page?.results)
    ? page.results
    : Array.isArray(page?.data)
      ? page.data
      : Array.isArray(page?.items)
        ? page.items
        : Array.isArray(payload?.data)
          ? payload.data
          : []

  return {
    items,
    next: page?.next ?? payload?.next ?? null,
    previous: page?.previous ?? payload?.previous ?? null,
    count: page?.count ?? payload?.count ?? items.length,
  }
}