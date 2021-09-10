import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  image_url: string,
  price: number,
  count: number,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  image_url: Yup.string(),
  price: Yup.number().required(),
  count: Yup.number().required(),
});
