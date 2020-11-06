import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { cors } from '../cors';

export const queryProducts = `
    select product_id, title, description, price, count from products
    inner join stocks on id = product_id
`;

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);
  const client = new Client();

  try {
    await client.connect();
    const { rows } = await client.query(queryProducts);

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
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
