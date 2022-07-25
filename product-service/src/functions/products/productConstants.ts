export const HTTPMETHODS = {
  GET: "GET",
  POST: "POST",
};

export const PATHS = {
  PRODUCTS: "/products",
  PRODUCTBYID: "/products/",
};

export const HTTPSTATUSCODES = {
  OK: 200,
  NOTFOUND: 404,
  INTERNALERROR: 500,
  INVALIDDATA: 400,
};

export const QUERIES = {
  allProducts:
    "SELECT P.*,S.COUNT FROM PRODUCTS P, STOCKS S WHERE P.ID = S.PRODUCT_ID",
  selectedProduct: `SELECT * FROM PRODUCTS WHERE ID::text=$1`,
  createProduct: `INSERT INTO PRODUCTS(TITLE,DESCRIPTION,PRICE) VALUES ($1, $2, $3) RETURNING Id`, //for all props instead of Id put it as *
  createStock: `INSERT INTO STOCKS(product_id,count) VALUES ($1,$2) RETURNING Id`,
};

export const TRANSACTIONCONSTANTS = {
  COMMIT: "COMMIT",
  ROLLBACK: "ROLLBACK",
  BEGIN: "BEGIN",
};
