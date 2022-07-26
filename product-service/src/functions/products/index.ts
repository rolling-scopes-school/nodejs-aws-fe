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
        responses: {
          200: {
            description: "Successful API Response",
            bodyType: "Products",
          },
          404: {
            description: "SEARCHING IN MARS SERVERS, NOT FOUND ON EARTH!!!",
          },
          500: {
            description:
              "CONFLICTS ON EARTH, RESULTED IN INTERNAL SERVER ERROR",
          },
        },
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
        responses: {
          200: {
            description: "Successful API Response",
            bodyType: "Product",
          },
          404: {
            description: "SEARCHING IN MARS SERVERS, NOT FOUND ON EARTH!!!",
          },
          500: {
            description:
              "CONFLICTS ON EARTH, RESULTED IN INTERNAL SERVER ERROR",
          },
        },
      },
    },
    {
      http: {
        method: "post",
        path: "products",
        cors: true,
        summary: "Add a new product",
        description: "Test the product addition to application",
        bodyType: "NewProduct",
        responses: {
          201: {
            description: "Product Created Successfully",
            bodyType: "Product",
          },
          404: {
            description: "SEARCHING IN MARS SERVERS, NOT FOUND ON EARTH!!!",
          },
          500: {
            description:
              "CONFLICTS ON EARTH, RESULTED IN INTERNAL SERVER ERROR",
          },
        },
      },
    },
  ],
};
