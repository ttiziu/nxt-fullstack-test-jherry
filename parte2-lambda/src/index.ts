import { DynamoDBClient, ScanCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';

// Cliente de DynamoDB
const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });

// Nombre de la tabla
const TABLE_NAME = process.env.TABLE_NAME || 'tec-practicantes-todo';

/**
 * Interfaz para una tarea
 */
interface Task {
  id: string;
  titulo: string;
  completada: boolean;
}

/**
 * Interfaz para el cuerpo de la petición POST
 */
interface CreateTaskRequest {
  titulo: string;
}

/**
 * Crea una respuesta HTTP exitosa
 */
function createSuccessResponse(data: any, statusCode: number = 200): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
}

/**
 * Crea una respuesta HTTP de error
 */
function createErrorResponse(message: string, statusCode: number = 400): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: message }),
  };
}

/**
 * Convierte un item de DynamoDB (AttributeValue) a un objeto Task
 */
function dynamoItemToTask(item: Record<string, any>): Task {
  return {
    id: item.id.S || '',
    titulo: item.titulo.S || '',
    completada: item.completada.BOOL || false,
  };
}

/**
 * Convierte un objeto Task a formato DynamoDB (AttributeValue)
 */
function taskToDynamoItem(task: Task): Record<string, any> {
  return {
    id: { S: task.id },
    titulo: { S: task.titulo },
    completada: { BOOL: task.completada },
  };
}

/**
 * Maneja el método GET - Obtiene todas las tareas
 */
async function handleGet(): Promise<APIGatewayProxyResult> {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await client.send(command);

    // Convertir los items de DynamoDB a objetos Task
    const tasks: Task[] = (response.Items || []).map((item) => dynamoItemToTask(item));

    return createSuccessResponse({ tasks }, 200);
  } catch (error) {
    console.error('Error al leer las tareas:', error);
    return createErrorResponse('Error al leer las tareas de la base de datos', 500);
  }
}

/**
 * Maneja el método POST - Crea una nueva tarea
 */
async function handlePost(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    // Validar que el cuerpo de la petición existe
    if (!event.body) {
      return createErrorResponse('El cuerpo de la petición es requerido', 400);
    }

    // Parsear el cuerpo de la petición
    let requestBody: CreateTaskRequest;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return createErrorResponse('El cuerpo de la petición debe ser un JSON válido', 400);
    }

    // Validar que el título existe y es un string
    if (!requestBody.titulo || typeof requestBody.titulo !== 'string') {
      return createErrorResponse('El campo "titulo" es requerido y debe ser un string', 400);
    }

    // Validar que el título no esté vacío
    if (requestBody.titulo.trim().length === 0) {
      return createErrorResponse('El campo "titulo" no puede estar vacío', 400);
    }

    // Crear la nueva tarea con UUID
    const newTask: Task = {
      id: randomUUID(),
      titulo: requestBody.titulo.trim(),
      completada: false, // Siempre false por defecto
    };

    // Convertir a formato DynamoDB
    const dynamoItem = taskToDynamoItem(newTask);

    // Guardar en DynamoDB
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: dynamoItem,
    });

    await client.send(command);

    return createSuccessResponse({ task: newTask }, 200);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return createErrorResponse('Error al crear la tarea en la base de datos', 500);
  }
}

/**
 * Handler principal de la función Lambda
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Evento recibido:', JSON.stringify(event, null, 2));

  try {
    // Enrutar según el método HTTP
    switch (event.httpMethod) {
      case 'GET':
        return await handleGet();

      case 'POST':
        return await handlePost(event);

      default:
        return createErrorResponse(`Método HTTP no soportado: ${event.httpMethod}`, 405);
    }
  } catch (error) {
    console.error('Error no manejado:', error);
    return createErrorResponse('Error interno del servidor', 500);
  }
};
