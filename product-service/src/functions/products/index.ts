//import schema from './schema';
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/productHandler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: true,
      },
    },
    {
      http: {
        method: "get",
        path: "products/{productId}",
        cors: true,
        request: {
          parameters: {
            paths: { productId: true },
          },
        },
      },
    },
  ],
};
