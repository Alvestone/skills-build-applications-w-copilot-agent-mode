import { Router, type Request, type Response } from 'express';
import mongoose, { type Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

type OctofitRecord = Record<string, unknown>;

function isRecord(value: unknown): value is OctofitRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function collectionRouter(model: Model<OctofitRecord>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await model.find().lean().exec();
    response.json(records);
  });

  router.post('/', async (request: Request, response: Response) => {
    if (!isRecord(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object.' });
      return;
    }

    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

export const apiRouter = Router();

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

apiRouter.get('/config', (_request, response) => {
  response.json({ baseUrl });
});

apiRouter.use('/users', collectionRouter(User));
apiRouter.use('/teams', collectionRouter(Team));
apiRouter.use('/activities', collectionRouter(Activity));
apiRouter.use('/leaderboard', collectionRouter(Leaderboard));
apiRouter.use('/workouts', collectionRouter(Workout));

export function apiErrorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: (error?: unknown) => void,
): void {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }

  if (isRecord(error) && error.code === 11000) {
    response.status(409).json({ error: 'A record with a unique value already exists.' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'An unexpected server error occurred.' });
}
