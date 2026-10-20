import CollectionPage from './CollectionPage.jsx'
import { getCollectionUrl } from '../api.js'

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : getCollectionUrl('teams')

  return <CollectionPage description="Find the crews training together." endpoint={endpoint} resource="teams" title="Teams" />
}

export default Teams