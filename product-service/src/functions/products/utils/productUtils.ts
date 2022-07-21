import {
  HTTPMETHODS,
  PATHS,
  HTTPSTATUSCODES,
  QUERIES,
} from "../productConstants";
import { formatJSONResponse } from "@libs/apiGateway";
const { Client } = require("pg");

const genericCatchTrap = async (error) => {
  console.error(error.stack);
  return await formatJSONResponse(
    { message: error.stack },
    HTTPSTATUSCODES.INTERNALERROR
  );
};

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
    const client = new Client(dbConfig);
    await client.connect();
    return { client, isDbConnected: !isDbConnected };
  } catch (error) {
    console.error(error);
    return { error, isDbConnected };
  }
};

const getProducts = async () => {
  const postgressClient = await connectDb();
  if (!postgressClient.isDbConnected) {
    return await genericCatchTrap(postgressClient);
  }
  try {
    const { client } = postgressClient;

    const { rows: products } = await client.query(QUERIES.allProducts);
    if (!products?.length) {
      return await formatJSONResponse({ message: "No products exist" });
    }

    return await formatJSONResponse(products);
  } catch (error) {
    return await genericCatchTrap(error);
  }
};

const getProductById = async (productId) => {
  const postgressClient = await connectDb();

  if (!postgressClient.isDbConnected) {
    return await genericCatchTrap(postgressClient);
  }

  try {
    if (!productId) {
      return await formatJSONResponse(
        { message: "Product doesn't exist." },
        HTTPSTATUSCODES.NOTFOUND
      );
    }

    const { client } = postgressClient;
    const { rows: product } = await client.query(QUERIES.selectedProduct, [
      productId,
    ]);

    if (!product) {
      return await formatJSONResponse({ message: "No product exist" });
    }

    return await formatJSONResponse(product);
  } catch (error) {
    return await genericCatchTrap(error);
  }
};

const createProduct = async (newProduct) => {
  const postgressClient = await connectDb();

  if (!postgressClient.isDbConnected) {
    return await genericCatchTrap(postgressClient);
  }

  if (!newProduct) {
    return await formatJSONResponse(
      { message: "Product Details not present or not correct!!" },
      HTTPSTATUSCODES.INVALIDDATA
    );
  }

  try {
    const { client } = postgressClient;
    const { rowCount, rows } = await client.query(
      QUERIES.createProduct,
      Object.values(newProduct)
    );

    if (!rowCount) {
      return await formatJSONResponse(
        { message: "OOPS!! , Product cannot be created at this time" },
        HTTPSTATUSCODES.INTERNALERROR
      );
    }

    return await formatJSONResponse(
      { message: `${rowCount} Products Created with Id:${rows[0].id}` },
      HTTPSTATUSCODES.OK
    );
  } catch (error) {
    return await genericCatchTrap(error);
  }
};

export const buildProductResponse = async (event) => {
  const { httpMethod, path, pathParameters } = event;
  console.log({ httpMethod }, { path }, { pathParameters });
  const isGet = httpMethod === HTTPMETHODS.GET;
  const isPost = httpMethod === HTTPMETHODS.POST;

  switch (true) {
    case isGet && path === PATHS.PRODUCTS:
      return await getProducts();

    case isGet && path === `${PATHS.PRODUCTBYID}${pathParameters?.productId}`: {
      console.log({ productId: pathParameters?.productId });
      return await getProductById(pathParameters?.productId);
    }

    case isPost: {
      console.log({ body: event.body });
      return await createProduct(event.body);
    }

    default:
      return formatJSONResponse(
        { message: "This is not valid Operation" },
        HTTPSTATUSCODES.NOTFOUND
      );
  }
};
