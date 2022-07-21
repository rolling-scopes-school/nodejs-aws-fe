import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "../../types/schema";
import { buildProductResponse } from "./utils/productUtils";

const productHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return await buildProductResponse(event);
};

export const main = middyfy(productHandler);
