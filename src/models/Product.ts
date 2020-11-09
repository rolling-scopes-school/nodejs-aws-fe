import * as Yup from 'yup';

export type Product = {
  id: string;
  title: string;
  img: string;
  description: string;
  price: number;
  count: number;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  img: Yup.string().url(),
  price: Yup.number().required(),
  count: Yup.number().positive().required(),
});
