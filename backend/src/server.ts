// // src/server.ts
// import express, { Application } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db';
// import projectRoutes from './routes/projects';
// import uploadRoutes from './routes/upload';
// import { errorHandler, notFound } from './middleware/errorHandler';
// import leadRoutes from './routes/leadRoutes'; // 1. IMPORT THE NEW ROUTES
// dotenv.config();

// const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
// process.env.NODE_ENV = NODE_ENV;

// const app: Application = express();

// connectDB();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:8080',
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Replica Elegance API',
//     health: '/api/health',
//     env: NODE_ENV,
//   });
// });

// // app.get('/favicon.ico', (req, res) => res.status(204).end());

// app.use('/api/projects', projectRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/leads', leadRoutes); // 2. ADD THIS LINE

// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// app.use('/api', (req, res) => {
//   res.json({
//     message: 'Replica Elegance API Endpoints',
//     projects: '/api/projects',
//     upload: '/api/upload',
//     health: '/api/health',
//   });
// });

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log('='.repeat(50));
//   console.log(`Server running in ${NODE_ENV} mode`);
//   console.log(`Server: http://localhost:${PORT}`);
//   console.log(`API: http://localhost:${PORT}/api`);
//   console.log('='.repeat(50));
// });

// // src/server.ts
// import express, { Application } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db';
// import projectRoutes from './routes/projects';
// import uploadRoutes from './routes/upload';
// import { errorHandler, notFound } from './middleware/errorHandler';
// import leadRoutes from './routes/leadRoutes';

// dotenv.config();

// const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
// process.env.NODE_ENV = NODE_ENV;

// const app: Application = express();
  
// connectDB();

// // CORS configuration for your frontend
// const allowedOrigins = [
//   'https://rama-reality.vercel.app',
//   'http://localhost:8080',
//   process.env.FRONTEND_URL,
// ].filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, Postman, etc.)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       console.log('❌ CORS blocked origin:', origin);
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Replica Elegance API',
//     health: '/api/health',
//     env: NODE_ENV,
//   });
// });

// app.use('/api/projects', projectRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/leads', leadRoutes);

// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//     env: NODE_ENV,
//   });
// });

// app.use('/api', (req, res) => {
//   res.json({
//     message: 'Replica Elegance API Endpoints',
//     projects: '/api/projects',
//     upload: '/api/upload',
//     leads: '/api/leads',
//     health: '/api/health',
//   });
// });

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// // For Vercel, we export the app instead of listening
// if (NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log('='.repeat(50));
//     console.log(`Server running in ${NODE_ENV} mode`);
//     console.log(`Server: http://localhost:${PORT}`);
//     console.log(`API: http://localhost:${PORT}/api`);
//     console.log('='.repeat(50));
//   });
// }

// // Export for Vercel serverless
// export default app;

// src/server.ts - AWS Production Version with NO SIZE LIMITS
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

// CORS configuration for AWS deployment
const allowedOrigins = [
  'http://51.20.85.130',
  'http://51.20.85.130:80',
  'https://51.20.85.130',
  'https://rama-reality.vercel.app',
  'http://localhost:8080',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('❌ CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      return callback(new Error('Not allowed by CORS'), false);
    }
    console.log('✅ CORS allowed origin:', origin);
    return callback(null, true);
  },
  credentials: true,
}));

// ⭐ REMOVE ALL SIZE LIMITS - Set to '0' for unlimited
app.use(express.json({ limit: '0' }));
app.use(express.urlencoded({ extended: true, limit: '0' }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Replica Elegance API - AWS Deployment',
    health: '/api/health',
    env: NODE_ENV,
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/leads', leadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running on AWS',
    timestamp: new Date().toISOString(),
    env: NODE_ENV,
    uptime: process.uptime(),
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Replica Elegance API Endpoints',
    endpoints: {
      projects: '/api/projects',
      upload: '/api/upload',
      leads: '/api/leads',
      health: '/api/health',
    },
  });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running in ${NODE_ENV} mode`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Public IP: http://51.20.85.130:${PORT}`);
  console.log('⭐ Upload Size: UNLIMITED');
  console.log('='.repeat(50));
});

export default app;