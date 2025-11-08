// src/server.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import projectRoutes from './routes/projects';
import uploadRoutes from './routes/upload';
import { errorHandler, notFound } from './middleware/errorHandler';
import leadRoutes from './routes/leadRoutes';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
process.env.NODE_ENV = NODE_ENV;

const app: Application = express();

connectDB();

// CORS configuration for your frontend
const allowedOrigins = [
  'https://rama-reality.vercel.app',
  'http://localhost:8080',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('❌ CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
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

app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/leads', leadRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: NODE_ENV,
  });
});

app.use('/api', (req, res) => {
  res.json({
    message: 'Replica Elegance API Endpoints',
    projects: '/api/projects',
    upload: '/api/upload',
    leads: '/api/leads',
    health: '/api/health',
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Vercel, we export the app instead of listening
if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`Server running in ${NODE_ENV} mode`);
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log('='.repeat(50));
  });
}

// Export for Vercel serverless
export default app;