export function getApiBaseUrl(codespaceName = process.env.CODESPACE_NAME): string {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}
