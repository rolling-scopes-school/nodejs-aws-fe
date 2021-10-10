const api = process.env.REACT_APP_API;
const importApi = process.env.REACT_APP_API_IMPORT;

const API_PATHS = {
  products: `${api}/products`,
  product: `${api}/product/{id}`,
  import: `${importApi}/import`,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
