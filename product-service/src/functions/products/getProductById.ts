import getProducts from "./productList";

const getProductById = async (productId: string) => {
  if (!productId) {
    throw new Error("Provide proper Id");
  }

  const products = await getProducts();
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    return { message: "Product not found" };
  }
  return product;
};

export default getProductById;
