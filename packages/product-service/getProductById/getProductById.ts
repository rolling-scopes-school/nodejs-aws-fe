import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { cors } from '../cors';
import { queryProducts } from '../getProductsList';

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context,
) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);
  const client = new Client();

  try {
    await client.connect();

    const queryProductById = `${queryProducts} where id = $1`;
    const { rows } = await client.query(queryProductById, [
      event.pathParameters?.id,
    ]);

    if (rows.length === 0) {
      return {
        statusCode: 404,
        body: 'Product not found.',
        headers: cors,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(rows[0], null, 2),
      headers: cors,
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: 'Something went wrong',
      headers: cors,
    };
  } finally {
    await client.end();
  }
};
