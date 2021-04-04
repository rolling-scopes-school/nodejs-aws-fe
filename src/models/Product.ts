import * as Yup from "yup";

export type Product = {
  count: number;
  description: string;
  date: string;
  location: string;
  id: string;
  price: number;
  title: string;
  image: string;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
