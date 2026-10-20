import CollectionPage from './CollectionPage.jsx'
import { getCollectionUrl } from '../api.js'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : getCollectionUrl('leaderboard')

  return <CollectionPage description="A live view of the community standings." endpoint={endpoint} resource="leaderboard" title="Leaderboard" />
}

export default Leaderboard