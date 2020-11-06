import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { cors } from '../cors';
import { products } from '../products';

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
    headers: cors,
  };
};
