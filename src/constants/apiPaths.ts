const API_PREFIX_PRODUCT = 'https://rkn3w31r6f.execute-api.eu-west-1.amazonaws.com/dev';
const API_PREFIX_IMPORT = 'https://0oronyurq7.execute-api.eu-west-1.amazonaws.com/dev';

const API_PATHS = {
  products: `${API_PREFIX_PRODUCT}/products`,
  create: `${API_PREFIX_PRODUCT}/product`,
  order: `${API_PREFIX_PRODUCT}/order`,

  import: `${API_PREFIX_IMPORT}/import`,

  bff: `${API_PREFIX_PRODUCT}/api/v1`,
};

export default API_PATHS;
