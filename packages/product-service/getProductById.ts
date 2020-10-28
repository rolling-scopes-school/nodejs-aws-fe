import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { cors } from './cors';
import { products } from './products';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const product = products.find(({ id }) => event.pathParameters?.id === id);

  if (!product) {
    return {
      statusCode: 404,
      body: 'Product not found.',
      headers: cors,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product, null, 2),
    headers: cors,
  };
};
