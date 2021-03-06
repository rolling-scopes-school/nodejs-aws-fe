import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().required(),
    count: Yup.number(),
}).defined();

export type Product = Yup.InferType<typeof ProductSchema>;
