import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

/**
 * Middleware para verificar el token JWT
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Verificar el token
    const jwtSecret = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

    // Agregar el usuario al request
    (req as any).user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Token inválido' });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expirado' });
    } else {
      res.status(500).json({ error: 'Error al verificar el token' });
    }
  }
};

