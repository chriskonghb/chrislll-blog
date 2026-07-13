import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import categoryRoutes from './routes/categories';
import tagRoutes from './routes/tags';
import uploadRoutes from './routes/upload';
import statsRoutes from './routes/stats';
import searchRoutes from './routes/search';
import settingsRoutes from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.resolve(process.env.UPLOAD_DIR || './uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Blog API server running on port ${PORT}`);
});
