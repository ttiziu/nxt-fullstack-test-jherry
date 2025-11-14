import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from '../types';

const router = Router();

/**
 * POST /api/auth/login
 * Endpoint de autenticación
 * 
 * Credenciales de prueba:
 * - username: admin, password: admin123
 * - username: user, password: user123
 */
router.post('/login', (req: Request, res: Response): void => {
  try {
    const { username, password }: LoginRequest = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      res.status(400).json({ error: 'Username y password son requeridos' });
      return;
    }

    // Validación simple (en producción, verificar contra base de datos con hash)
    const validUsers: Record<string, string> = {
      admin: 'admin123',
      user: 'user123',
    };

    if (!validUsers[username] || validUsers[username] !== password) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    // Generar JWT
    const jwtSecret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { username },
      jwtSecret,
      { expiresIn: '24h' }
    );

    const response: LoginResponse = {
      token,
      user: { username },
    };

    res.json(response);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;

