import CollectionPage from './CollectionPage.jsx'
import { getCollectionUrl } from '../api.js'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : getCollectionUrl('activities')

  return <CollectionPage description="Training sessions logged by the OctoFit community." endpoint={endpoint} resource="activities" title="Activities" />
}

export default Activities