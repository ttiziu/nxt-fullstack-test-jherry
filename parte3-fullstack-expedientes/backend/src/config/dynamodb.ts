import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

/**
 * Cliente de DynamoDB configurado con la región desde variables de entorno
 */
export const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

/**
 * Nombre de la tabla de expedientes
 */
export const TABLE_NAME = process.env.TABLE_NAME || 'tec-practicantes-expedientes';

