import getProducts from "./productList";

const getProductById = (productId: string) => {
  if (!productId) {
    throw new Error("Provide proper Id");
  }

  const products = getProducts();
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    return { message: "Product not found" };
  }
  return product;
};

export default getProductById;
