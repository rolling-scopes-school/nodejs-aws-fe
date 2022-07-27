import {
  HTTPMETHODS,
  PATHS,
  HTTPSTATUSCODES,
  QUERIES,
  TRANSACTIONCONSTANTS,
} from "../productConstants";
import { formatJSONResponse } from "@libs/apiGateway";
const { Client } = require("pg");

const genericCatchTrap = async (error) => {
  console.error("genericCatchTrap", error.stack);
  return await formatJSONResponse(
    { message: error.stack },
    HTTPSTATUSCODES.INTERNALERROR
  );
};

const disconnectDb = (client) => {
  if (client) {
    return client.end().then(() => {
      console.log("Db disconnected successfully!!");
    });
  }
  //client.release();
};

const connectDb = async () => {
  let isDbConnected = false;
  let client = null;
  try {
    const { host, port, user, password, database } = process.env;
    const dbConfig = {
      host,
      port,
      user,
      password,
      database,
    };
    client = new Client(dbConfig);
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

const productInternalServerError = async (client) => {
  await client.query(TRANSACTIONCONSTANTS.ROLLBACK);
  return await formatJSONResponse(
    { message: "Product Details not present or not correct!!" },
    HTTPSTATUSCODES.INVALIDDATA
  );
};

const isEmptyUndefined = (value) => {
  if (!value) {
    return true;
  }
  return false;
};

const validateNewProduct = (newProduct) => {
  let isValid = true;
  if (!newProduct) {
    return false;
  }

  if (
    isEmptyUndefined(newProduct.count) ||
    isEmptyUndefined(newProduct.price) ||
    isEmptyUndefined(newProduct.title) ||
    isEmptyUndefined(newProduct.description)
  ) {
    isValid = false;
  }

  if (
    typeof newProduct.count !== "number" ||
    typeof newProduct.price !== "number"
  ) {
    isValid = false;
  }
  return isValid;
};

const createProduct = async (newProduct) => {
  const postgressClient = await connectDb();

  if (!postgressClient.isDbConnected) {
    return await genericCatchTrap(postgressClient);
  }

  console.log({ isValid: validateNewProduct(newProduct) });

  if (!validateNewProduct(newProduct)) {
    return await formatJSONResponse(
      { message: "Product Details not present or not correct!!" },
      HTTPSTATUSCODES.INVALIDDATA
    );
  }

  const { client } = postgressClient;
  try {
    await client.query(TRANSACTIONCONSTANTS.BEGIN);
    const { count, title, description, price } = newProduct;

    const { rowCount, rows } = await client.query(QUERIES.createProduct, [
      title,
      description,
      price,
    ]);

    if (!rowCount) {
      return await productInternalServerError(client);
    }

    const newProductId = rows?.[0]?.id;

    const stockResp = await client.query(QUERIES.createStock, [
      newProductId,
      count,
    ]);

    if (!stockResp.rowCount) {
      return await productInternalServerError(client);
    }

    await client.query(TRANSACTIONCONSTANTS.COMMIT);
    return await formatJSONResponse(
      { message: `${rowCount} Products Created with Id:${newProductId}` },
      HTTPSTATUSCODES.OK
    );
  } catch (error) {
    await client.query(TRANSACTIONCONSTANTS.ROLLBACK);
    return await genericCatchTrap(error);
  } finally {
    disconnectDb(client);
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
