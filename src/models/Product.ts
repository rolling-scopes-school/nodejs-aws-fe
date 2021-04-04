import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  count: number,
  imgUrl: string,
  ram: number,
  storage: string,
  display: string,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
