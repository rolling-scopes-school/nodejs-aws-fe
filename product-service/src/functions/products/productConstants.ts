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
};

export const QUERIES = {
  allProducts:
    "SELECT P.*,S.COUNT FROM PRODUCTS P, STOCKS S WHERE P.ID = S.PRODUCT_ID",
  selectedProduct: `SELECT * FROM PRODUCTS WHERE ID::text='PID'`
};
