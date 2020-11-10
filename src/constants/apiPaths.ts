const API_PREFIX = 'https://rkn3w31r6f.execute-api.eu-west-1.amazonaws.com/dev';

const API_PATHS = {
  products: `${API_PREFIX}/products`,
  create: `${API_PREFIX}/product`,
  order: `${API_PREFIX}/order`,
  import: `${API_PREFIX}/import`,
  bff: `${API_PREFIX}/api/v1`,
};

export default API_PATHS;
