import { useEffect, useState } from 'react'
import { getCollectionUrl, normalizeCollectionResponse } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.map(formatValue).join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function recordTitle(record, index) {
  const titleKey = ['name', 'username', 'title', 'activity', 'type', 'email']
    .find((key) => record?.[key] !== undefined && record[key] !== null)
  return titleKey ? formatValue(record[titleKey]) : `Record ${index + 1}`
}

function CollectionPage({ resource, title, description }) {
  const endpoint = getCollectionUrl(resource)
  const [url, setUrl] = useState(endpoint)
  const [reloadKey, setReloadKey] = useState(0)
  const [items, setItems] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`The API returned ${response.status} ${response.statusText}.`)
        }

        const page = normalizeCollectionResponse(await response.json())
        setItems(page.items)
        setNext(page.next)
        setPrevious(page.previous)
        setCount(page.count)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.')
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [url, reloadKey])

  return (
    <section className="collection-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">TRACKER / {resource.toUpperCase()}</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <button
          className="btn btn-outline-dark refresh-button"
          onClick={() => setReloadKey((key) => key + 1)}
          type="button"
        >
          <span aria-hidden="true">↻</span> Refresh
        </button>
      </div>

      <div className="collection-meta">
        <span className="collection-count">{count} {count === 1 ? 'ENTRY' : 'ENTRIES'}</span>
        <span className="collection-endpoint">GET /api/{resource}/</span>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
          <div className="small mt-1">Check that the API is running and the Codespaces port is forwarded.</div>
        </div>
      )}

      {isLoading ? (
        <div className="collection-state" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      ) : error ? null : items.length === 0 ? (
        <div className="collection-state empty-state">
          <span className="empty-mark" aria-hidden="true">—</span>
          <strong>No {title.toLowerCase()} yet</strong>
          <span>New records will appear here when they are added.</span>
        </div>
      ) : (
        <div className="record-list">
          {items.map((record, index) => {
            const fields = Object.entries(record ?? {})
              .filter(([key]) => !key.startsWith('_'))
              .slice(0, 6)

            return (
              <article className="record-row" key={record?._id ?? record?.id ?? `${resource}-${index}`}>
                <div className="record-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="record-content">
                  <h2>{recordTitle(record, index)}</h2>
                  <dl className="record-fields">
                    {fields.map(([key, value]) => (
                      <div className="record-field" key={key}>
                        <dt>{key.replaceAll('_', ' ')}</dt>
                        <dd title={formatValue(value)}>{formatValue(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {!isLoading && !error && (previous || next) && (
        <nav className="pagination-bar" aria-label={`${title} pages`}>
          <button
            className="btn btn-outline-dark"
            disabled={!previous}
            onClick={() => setUrl(previous)}
            type="button"
          >
            Previous
          </button>
          <span>{count} total</span>
          <button
            className="btn btn-outline-dark"
            disabled={!next}
            onClick={() => setUrl(next)}
            type="button"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

export default CollectionPage