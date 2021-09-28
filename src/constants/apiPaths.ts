const api = process.env.REACT_APP_API;
const importApi = process.env.REACT_APP_API_IMPORT;

const imageshosting = process.env.REACT_APP_IMAGES_HOSTING;

const API_PATHS = {
  products: `${api}/products`,
  product: `${api}/product/{id}`,
  import: `${importApi}/import`,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export const IMAGES_PATH = imageshosting;

export default API_PATHS;
