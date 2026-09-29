import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(cors());
app.use(express.json());

app.get(['/', '/api', '/health', '/api/health'], (_req, res) => {
  res.json({
    status: 'ok',
    team: 'URS Gamara Management Service',
    architecture: 'Hexagonal',
    timestamp: new Date().toISOString(),
  });
});

// Soporta tanto rutas con /api/ como sin /api/ para total compatibilidad con Vercel
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/upload', uploadRoutes);
app.use('/upload', uploadRoutes);

export default app;
