import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  weight: number,
  img: string,
  creationDate: Date,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
  weight: Yup.number().required(),
  img: Yup.string().required(),
  creationDate: Yup.date(),
});
