import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);

  const isFavicon = req.originalUrl.includes('favicon');
  const isApi = req.originalUrl.startsWith('/api');
  if (!isFavicon && isApi && req.originalUrl !== '/api') {
    console.warn(`404 API Route: ${req.method} ${req.originalUrl}`);
  }

  next(error);
};