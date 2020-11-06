import { Client } from 'pg';
import { cors } from '../cors';
import { getProductsList } from './getProductsList';

jest.mock('pg');

describe('getProductsList', () => {
  it('should return a list of all products', async () => {
    ((Client as unknown) as jest.Mock).mockImplementation(function () {
      return {
        connect: jest.fn().mockResolvedValue(true),
        query: jest.fn().mockResolvedValue({
          rows: [{ id: '1' }],
        }),
        end: jest.fn().mockResolvedValue(true),
      };
    });

    expect(await getProductsList({} as any, {} as any, jest.fn())).toEqual({
      statusCode: 200,
      body: JSON.stringify([{ id: '1' }]),
      headers: cors,
    });
  });

  it('should return error if something went wrong', async () => {
    ((Client as unknown) as jest.Mock).mockImplementation(function () {
      return {
        connect: jest.fn().mockResolvedValue(true),
        query: jest.fn().mockRejectedValue('error'),
        end: jest.fn().mockResolvedValue(true),
      };
    });

    expect(await getProductsList({} as any, {} as any, jest.fn())).toEqual({
      statusCode: 500,
      body: 'Something went wrong',
      headers: cors,
    });
  });
});
