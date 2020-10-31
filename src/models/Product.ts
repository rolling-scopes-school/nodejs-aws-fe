import * as Yup from 'yup';
import {Price} from "models/Price";

export type Product = {
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  price: Price,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.object().required(),
});
