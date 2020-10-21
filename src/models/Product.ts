import * as Yup from "yup";

export type Product = {
  image: string;
  id: string;
  title: string;
  description: string;
  price: number;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
