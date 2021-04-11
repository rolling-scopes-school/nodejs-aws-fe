import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  tagline: string,
  price: number,
  budget: number,
  revenue: number,
  description: string,
  vote_average: number,
  poster_path: string,
  genres: string[],
  runtime: number,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
