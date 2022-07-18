import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import getProducts from "./productList";
import schema from "../../types/schema";
import getProductById from "./getProductById";
import { PATHS, HTTPMETHODS, HTTPSTATUSCODES } from "./productConstants";

const buildProductResponse = async (event) => {
  const { httpMethod, path, pathParameters } = event;

  const isGet = httpMethod === HTTPMETHODS.GET;

  switch (true) {
    case isGet && path === PATHS.PRODUCTS: {
      const products = await getProducts();
      return await formatJSONResponse({ products });
    }

    case isGet && path === `${PATHS.PRODUCTBYID}${pathParameters?.productId}`: {
      const { productId } = pathParameters;
      if (!productId) {
        return await formatJSONResponse(
          { message: "Product doesn't exist." },
          HTTPSTATUSCODES.NOTFOUND
        );
      }
      const product = await getProductById(productId);
      return await formatJSONResponse(product);
    }
    default:
      return formatJSONResponse(
        { message: "This is not valid Operation" },
        HTTPSTATUSCODES.NOTFOUND
      );
  }
};

const productHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return await buildProductResponse(event);
};

export const main = middyfy(productHandler);
