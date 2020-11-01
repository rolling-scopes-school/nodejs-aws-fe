import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  country: string
  count: number
  color: string
  image: string
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
