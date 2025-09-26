import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connectionDB';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Qualifica o seu Professor - API' });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

export default app;
