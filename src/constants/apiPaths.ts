const productServiceHash = `uhvqepz8rb`;
const importServiceHash = 'demqlfwkr8';


const API_PATHS = {
  product: `https://${productServiceHash}.execute-api.eu-west-1.amazonaws.com/dev`,
  order: `https://${null}.execute-api.eu-west-1.amazonaws.com/dev`,
  import: `https://${importServiceHash}.execute-api.eu-west-1.amazonaws.com/dev`,
  bff: `https://${null}.execute-api.eu-west-1.amazonaws.com/dev`,
  cart: `http://naooki-cart-api-dev.eu-west-1.elasticbeanstalk.com/api`,
};

export default API_PATHS;
