import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import expedientesRoutes from './routes/expedientes';
import { authMiddleware } from './middleware/auth';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/api/expedientes', authMiddleware, expedientesRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Rutas disponibles:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/expedientes`);
  console.log(`   POST http://localhost:${PORT}/api/expedientes`);
  console.log(`   PUT  http://localhost:${PORT}/api/expedientes/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/expedientes/:id`);
});

