import * as Yup from 'yup';

export type Product = {
  id: string,
  description: string,
  title: string,
  sort: string,
  height: number,
  count: number
  price: number,
};

export const ProductSchema = Yup.object().shape({
  description: Yup.string(),
  title: Yup.string().required(),
  sort: Yup.string().required(),
  height: Yup.number().required(),
  count: Yup.number().required(),
  price: Yup.number().required(),
});
