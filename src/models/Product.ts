import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  artist: string
  description: string,
  price: number,
  coverUrl: string
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
