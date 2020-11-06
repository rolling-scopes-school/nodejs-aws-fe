import { cors } from '../cors';
import { getProductById } from './getProductById';

jest.mock('../products', () => ({ products: [{ id: '1' }] }));

describe('getProductsById', () => {
  const context = {} as any;

  it('should return 404 if product was not found', async () => {
    const event = {
      pathParameters: {
        id: '2',
      },
    } as any;

    expect(await getProductById(event, context, jest.fn())).toEqual({
      statusCode: 404,
      body: 'Product not found.',
      headers: cors,
    });
  });

  it('should return product found by id', async () => {
    const event = {
      pathParameters: {
        id: '1',
      },
    } as any;

    expect(await getProductById(event, context, jest.fn())).toEqual({
      statusCode: 200,
      body: JSON.stringify({ id: '1' }, null, 2),
      headers: cors,
    });
  });
});
