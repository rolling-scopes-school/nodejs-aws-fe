import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  imageurl: string,
  price: number,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
