import CollectionPage from './CollectionPage.jsx'
import { getCollectionUrl } from '../api.js'

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : getCollectionUrl('users')

  return <CollectionPage description="Member profiles across the OctoFit community." endpoint={endpoint} resource="users" title="Users" />
}

export default Users