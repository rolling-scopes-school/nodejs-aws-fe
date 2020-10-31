import * as Yup from 'yup';

export type Product = {
  id: string,
  name: string,
  description: string,
  category: string,
  size: string,
  color: string,
  gender: string,
  price: number,
};

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  category: Yup.string(),
  size: Yup.string(),
  color: Yup.string(),
  gender: Yup.string(),
  price: Yup.number().required(),
});
