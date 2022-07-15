import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import getProducts from "./productList";
import schema from "./schema";
import getProductById from "./getProductById";
import { PATHS, HTTPMETHODS } from "./productConstants";

const buildProductResponse = (event) => {
  const { httpMethod, path, pathParameters } = event;

  const isGet = httpMethod === HTTPMETHODS.GET;

  switch (true) {
    case isGet && path === PATHS.PRODUCTS: {
      return formatJSONResponse({ products: getProducts() });
    }

    case isGet && path === `${PATHS.PRODUCTBYID}${pathParameters?.productId}`: {
      const { productId } = pathParameters;
      if (!productId) {
        return formatJSONResponse({ message: "Product doesn't exist." });
      }
      return formatJSONResponse(getProductById(productId));
    }
    
    default:
      return formatJSONResponse({ message: "This is not valid Operation" });
  }
};

const productHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return buildProductResponse(event);
};

export const main = middyfy(productHandler);
