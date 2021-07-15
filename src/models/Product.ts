import * as Yup from 'yup';

interface IRating {
  source: string
  value: number
}

enum MovieType {
  movie = 'movie',
  series = 'series',
}

export type Product = {
  id: string,
  title: string
  year: number
  adult?: boolean
  release?: string
  genre?: string
  director?: string
  writer?: string
  actors?: string[]
  language?: string
  country?: string
  poster?: string
  ratings?: IRating[]
  type?: MovieType
  production?: string
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  year: Yup.string().required(),
  adult: Yup.boolean(),
  release: Yup.string(),
  genre: Yup.string(),
  director: Yup.string(),
  writer: Yup.string(),
  actors: Yup.array(Yup.string()),
  language: Yup.string(),
  country: Yup.string(),
  poster: Yup.string(),
  type: Yup.string(),
  production: Yup.string(),
});
