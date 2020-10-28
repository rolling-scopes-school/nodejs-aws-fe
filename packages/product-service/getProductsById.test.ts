import { cors } from './cors';
import { handler } from './getProductById';

jest.mock('./products', () => ({ products: [{ id: '1' }] }));

describe('getProductsById', () => {
  const context = {} as any;

  it('should return 404 if product was not found', async () => {
    const event = {
      pathParameters: {
        id: '2',
      },
    } as any;

    expect(await handler(event, context, jest.fn())).toEqual({
      statusCode: 404,
      body: 'Product not found.',
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
    });
  });

  it('should return product found by id', async () => {
    const event = {
      pathParameters: {
        id: '1',
      },
    } as any;

    expect(await handler(event, context, jest.fn())).toEqual({
      statusCode: 200,
      body: JSON.stringify({ id: '1' }, null, 2),
      headers: cors,
    });
  });
});
