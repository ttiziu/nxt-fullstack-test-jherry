import { Router, Request, Response } from 'express';
import { ScanCommand, PutItemCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { dynamoClient, TABLE_NAME } from '../config/dynamodb';
import { Expediente } from '../types';
import { randomUUID } from 'crypto';

const router = Router();

/**
 * Convierte un item de DynamoDB a Expediente
 */
function dynamoToExpediente(item: Record<string, any>): Expediente {
  return {
    id: item.id.S || '',
    nombre: item.nombre.S || '',
    descripcion: item.descripcion.S || '',
    estado: (item.estado.S || 'Activo') as 'Activo' | 'En progreso' | 'Cerrado',
    createdAt: item.createdAt?.S,
    updatedAt: item.updatedAt?.S,
  };
}

/**
 * Convierte un Expediente a formato DynamoDB
 */
function expedienteToDynamo(expediente: Expediente): Record<string, any> {
  const item: Record<string, any> = {
    id: { S: expediente.id },
    nombre: { S: expediente.nombre },
    descripcion: { S: expediente.descripcion },
    estado: { S: expediente.estado },
  };

  if (expediente.createdAt) {
    item.createdAt = { S: expediente.createdAt };
  }
  if (expediente.updatedAt) {
    item.updatedAt = { S: expediente.updatedAt };
  }

  return item;
}

/**
 * GET /api/expedientes
 * Obtener todos los expedientes
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await dynamoClient.send(command);
    const expedientes = (response.Items || []).map(dynamoToExpediente);

    res.json({ expedientes });
  } catch (error) {
    console.error('Error al obtener expedientes:', error);
    res.status(500).json({ error: 'Error al obtener expedientes' });
  }
});

/**
 * GET /api/expedientes/:id
 * Obtener un expediente por ID
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const command = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    });

    const response = await dynamoClient.send(command);

    if (!response.Item) {
      res.status(404).json({ error: 'Expediente no encontrado' });
      return;
    }

    const expediente = dynamoToExpediente(response.Item);
    res.json({ expediente });
  } catch (error) {
    console.error('Error al obtener expediente:', error);
    res.status(500).json({ error: 'Error al obtener expediente' });
  }
});

/**
 * POST /api/expedientes
 * Crear un nuevo expediente
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, estado } = req.body;

    // Validaciones
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
      res.status(400).json({ error: 'El campo "nombre" es requerido' });
      return;
    }

    if (!descripcion || typeof descripcion !== 'string') {
      res.status(400).json({ error: 'El campo "descripcion" es requerido' });
      return;
    }

    const estadosValidos = ['Activo', 'En progreso', 'Cerrado'];
    const estadoFinal = estado && estadosValidos.includes(estado) ? estado : 'Activo';

    // Crear nuevo expediente
    const nuevoExpediente: Expediente = {
      id: randomUUID(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      estado: estadoFinal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: expedienteToDynamo(nuevoExpediente),
    });

    await dynamoClient.send(command);

    res.status(201).json({ expediente: nuevoExpediente });
  } catch (error) {
    console.error('Error al crear expediente:', error);
    res.status(500).json({ error: 'Error al crear expediente' });
  }
});

/**
 * PUT /api/expedientes/:id
 * Actualizar un expediente
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    // Verificar que el expediente existe
    const getCommand = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    });

    const getResponse = await dynamoClient.send(getCommand);

    if (!getResponse.Item) {
      res.status(404).json({ error: 'Expediente no encontrado' });
      return;
    }

    const expedienteActual = dynamoToExpediente(getResponse.Item);

    // Validaciones
    if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim().length === 0)) {
      res.status(400).json({ error: 'El campo "nombre" debe ser un string no vacío' });
      return;
    }

    if (descripcion !== undefined && typeof descripcion !== 'string') {
      res.status(400).json({ error: 'El campo "descripcion" debe ser un string' });
      return;
    }

    const estadosValidos = ['Activo', 'En progreso', 'Cerrado'];
    if (estado !== undefined && !estadosValidos.includes(estado)) {
      res.status(400).json({ error: 'El campo "estado" debe ser Activo, En progreso o Cerrado' });
      return;
    }

    // Actualizar expediente
    const expedienteActualizado: Expediente = {
      ...expedienteActual,
      nombre: nombre !== undefined ? nombre.trim() : expedienteActual.nombre,
      descripcion: descripcion !== undefined ? descripcion.trim() : expedienteActual.descripcion,
      estado: estado !== undefined ? estado : expedienteActual.estado,
      updatedAt: new Date().toISOString(),
    };

    const putCommand = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: expedienteToDynamo(expedienteActualizado),
    });

    await dynamoClient.send(putCommand);

    res.json({ expediente: expedienteActualizado });
  } catch (error) {
    console.error('Error al actualizar expediente:', error);
    res.status(500).json({ error: 'Error al actualizar expediente' });
  }
});

/**
 * DELETE /api/expedientes/:id
 * Eliminar un expediente
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar que el expediente exists
    const getCommand = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    });

    const getResponse = await dynamoClient.send(getCommand);

    if (!getResponse.Item) {
      res.status(404).json({ error: 'Expediente no encontrado' });
      return;
    }

    // Eliminar expediente
    const deleteCommand = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    });

    await dynamoClient.send(deleteCommand);

    res.json({ message: 'Expediente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar expediente:', error);
    res.status(500).json({ error: 'Error al eliminar expediente' });
  }
});

export default router;

