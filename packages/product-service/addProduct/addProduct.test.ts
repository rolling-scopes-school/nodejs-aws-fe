import { Client } from 'pg';
import { cors } from '../cors';
import { addProduct } from './addProduct';

jest.mock('pg');

describe('addProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return bad request if body is absent', async () => {
    const response = await addProduct({} as any, {} as any, jest.fn());

    expect(response).toEqual({
      statusCode: 400,
      body: 'Bad request',
      header: cors,
    });
  });

  it('should return success if a transaction was committed', async () => {
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

    const response = await addProduct(
      {
        body: JSON.stringify({
          title: 'title',
          description: 'description',
          price: 1,
          count: 2,
        }),
      } as any,
      {} as any,
      jest.fn(),
    );

    expect(response).toEqual({
      statusCode: 201,
      header: cors,
      body: 'Created',
    });
  });

  it('should return internal server error in case of failed transaction', async () => {
    ((Client as unknown) as jest.Mock).mockImplementation(function () {
      return {
        connect: jest.fn().mockResolvedValue(true),
        query: jest.fn().mockRejectedValue('error'),
        end: jest.fn().mockResolvedValue(true),
      };
    });

    try {
      const response = await addProduct(
        {
          body: JSON.stringify({
            title: 'title',
            description: 'description',
            price: 1,
            count: 2,
          }),
        } as any,
        {} as any,
        jest.fn(),
      );
      expect(response).toEqual({
        statusCode: 500,
        header: cors,
        body: 'Internal server error',
      });
    } catch (e) {}
  });
});
