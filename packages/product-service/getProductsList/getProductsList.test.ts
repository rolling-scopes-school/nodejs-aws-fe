import { cors } from '../cors';
import { getProductsList } from './getProductsList';

jest.mock('../products', () => ({ products: [{ id: '1' }] }));

describe('getProductsList', () => {
  it('should return a list of all products', async () => {
    expect(await getProductsList({} as any, {} as any, jest.fn())).toEqual({
      statusCode: 200,
      body: JSON.stringify([{ id: '1' }]),
      headers: cors,
    });
  });
});
