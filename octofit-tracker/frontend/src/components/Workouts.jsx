import CollectionPage from './CollectionPage.jsx'
import { getCollectionUrl } from '../api.js'

function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : getCollectionUrl('workouts')

  return <CollectionPage description="Explore the workouts available to members." endpoint={endpoint} resource="workouts" title="Workouts" />
}

export default Workouts