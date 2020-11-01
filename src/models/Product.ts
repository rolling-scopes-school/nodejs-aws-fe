import * as Yup from 'yup';

export type Product = {
  id: string,
  year: number,
  engine: string,
  imageUrl: string,
  title: string,
  price: number,
};

export const ProductSchema = Yup.object().shape({
  year: Yup.number().required(),
  engine: Yup.string().required(),
  imageUrl: Yup.string().required(),
  title: Yup.string().required(),
  price: Yup.number().required(),
});
