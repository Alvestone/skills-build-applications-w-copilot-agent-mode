import express from 'express';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/users', (_request, response) => {
  response.json([]);
});

app.get('/api/activities', (_request, response) => {
  response.json([]);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Octofit API listening at ${apiBaseUrl}`);
});
