import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', team: 'URS Gamara Management Service', architecture: 'Hexagonal' });
});
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
export default app;
//# sourceMappingURL=app.js.map