// src/server.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import projectRoutes from './routes/projects';
import uploadRoutes from './routes/upload';
import { errorHandler, notFound } from './middleware/errorHandler';
import leadRoutes from './routes/leadRoutes'; // 1. IMPORT THE NEW ROUTES
dotenv.config();

const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
process.env.NODE_ENV = NODE_ENV;

const app: Application = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Replica Elegance API',
    health: '/api/health',
    env: NODE_ENV,
  });
});

// app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/leads', leadRoutes); // 2. ADD THIS LINE

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', (req, res) => {
  res.json({
    message: 'Replica Elegance API Endpoints',
    projects: '/api/projects',
    upload: '/api/upload',
    health: '/api/health',
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`Server running in ${NODE_ENV} mode`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
  console.log('='.repeat(50));
});