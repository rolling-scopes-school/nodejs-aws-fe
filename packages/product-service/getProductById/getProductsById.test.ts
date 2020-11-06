import { Client } from 'pg';
import { cors } from '../cors';
import { getProductById } from './getProductById';

jest.mock('pg');

describe('getProductsById', () => {
  const context = {} as any;

  it('should return 404 if product was not found', async () => {
    ((Client as unknown) as jest.Mock).mockImplementation(function () {
      return {
        connect: jest.fn().mockResolvedValue(true),
        query: jest.fn().mockResolvedValue({ rows: [] }),
        end: jest.fn().mockResolvedValue(true),
      };
    });

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
    ((Client as unknown) as jest.Mock).mockImplementation(function () {
      return {
        connect: jest.fn().mockResolvedValue(true),
        query: jest.fn().mockResolvedValue({
          rows: [
            {
              id: '1',
            },
          ],
        }),
        end: jest.fn().mockResolvedValue(true),
      };
    });

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
