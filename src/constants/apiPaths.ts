
const API_PATHS = {
  product: 'https://4wu2eb644j.execute-api.eu-west-1.amazonaws.com/dev',
  order: 'https://4wu2eb644j.execute-api.eu-west-1.amazonaws.com/dev',
  import: 'https://m4vi868ne8.execute-api.eu-west-1.amazonaws.com/dev',
  bff: 'https://4wu2eb644j.execute-api.eu-west-1.amazonaws.com/dev',
  // cart: 'http://ohalahan-cart-api-develop.eu-west-1.elasticbeanstalk.com/api', cannot used because it is served using HTTP
  cart: 'https://no8p3hmfgh.execute-api.eu-west-1.amazonaws.com/develop/api', // use proxy instead
};

export default API_PATHS;
