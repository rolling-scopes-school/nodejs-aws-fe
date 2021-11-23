import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  image: string,
  price: number,
  count: number
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  img: Yup.string().url(),
  count: Yup.number(),
  price: Yup.number().required(),
});
