import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from 'pg';
import { Product } from '../models';
import { cors } from '../cors';

export const addProduct: APIGatewayProxyHandler = async (event) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Bad request',
      headers: cors,
    };
  }

  const client = new Client();

  try {
    await client.connect();

    const { description, title, count, price }: Product = JSON.parse(
      event.body,
    );

    await client.query('begin');

    const insertProduct = `  
      insert into products (title, description, price) 
      values ($1, $2, $3)
      returning *
    `;
    const { rows: products } = await client.query<Product>(insertProduct, [
      title,
      description,
      price,
    ]);
    const insertStocks = `
      insert into stocks(product_id, count) 
      values ($1, $2) 
      returning count
    `;
    const { rows: stocks } = await client.query(insertStocks, [
      products[0].id,
      count,
    ]);
    await client.query('commit');
    return {
      statusCode: 201,
      headers: cors,
      body: JSON.stringify({
        ...products[0],
        ...stocks[0],
      }),
    };
  } catch (e) {
    console.error(e);
    await client.query('rollback');
    return {
      statusCode: 500,
      headers: cors,
      body: 'Internal server error',
    };
  } finally {
    await client.end();
  }
};
