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
        // request: {
        //   parameters: null,
        // },
        requestBody: {
          required: true,
          content: "application/json",
          description:
            "Product details in JSON, should include, title,price,description",
          schemas: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              price: { type: "integer" },
            },
          },
          example: {
            title: "PRODUCT_NAME",
            description: "short description about product",
            price: 99,
          },
        },
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
