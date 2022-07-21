import {
  HTTPMETHODS,
  PATHS,
  HTTPSTATUSCODES,
  QUERIES,
} from "../productConstants";
import { formatJSONResponse } from "@libs/apiGateway";
const { Client } = require("pg");

const connectDb = async () => {
  let isDbConnected = false;
  try {
    const { host, port, user, password, database } = process.env;
    const dbConfig = {
      host,
      port,
      user,
      password,
      database,
    };
    console.log({ dbConfig });
    const client = new Client(dbConfig);
    await client.connect();
    console.log({ isDbConnected: !isDbConnected });
    return { client, isDbConnected: !isDbConnected };
  } catch (error) {
    console.log(error);
    return { error, isDbConnected };
  }
};

const dbNotConnected = async (postgressClient) => {
  console.log(postgressClient.error);
  return await formatJSONResponse(
    postgressClient.error,
    HTTPSTATUSCODES.INTERNALERROR
  );
};

const getProducts = async () => {
  const postgressClient = await connectDb();
  console.log({ isDbConnected: postgressClient.isDbConnected });
  if (!postgressClient.isDbConnected) {
    return await dbNotConnected(postgressClient);
  }

  const { client } = postgressClient;

  const { rows: products } = await client.query(QUERIES.allProducts);
  if (!products?.length) {
    return await formatJSONResponse({ message: "No products exist" });
  }

  return await formatJSONResponse(products);
};

const getProductById = async (productId) => {
  const postgressClient = await connectDb();

  if (!postgressClient.isDbConnected) {
    return await dbNotConnected(postgressClient);
  }
  console.log({ productId });
  if (!productId) {
    return await formatJSONResponse(
      { message: "Product doesn't exist." },
      HTTPSTATUSCODES.NOTFOUND
    );
  }

  const { client } = postgressClient;
  const executeQuery = QUERIES.selectedProduct.replace("PID", productId);
  const { rows: product } = await client.query(executeQuery);

  if (!product) {
    return await formatJSONResponse({ message: "No product exist" });
  }

  return await formatJSONResponse(product);
};

export const buildProductResponse = async (event) => {
  const { httpMethod, path, pathParameters } = event;

  const isGet = httpMethod === HTTPMETHODS.GET;

  switch (true) {
    case isGet && path === PATHS.PRODUCTS:
      return await getProducts();

    case isGet && path === `${PATHS.PRODUCTBYID}${pathParameters?.productId}`:
      return await getProductById(pathParameters?.productId);

    default:
      return formatJSONResponse(
        { message: "This is not valid Operation" },
        HTTPSTATUSCODES.NOTFOUND
      );
  }
};
