import * as Yup from 'yup';

export type APIProduct = {
    id: number;
    make: string;
    model: string;
    year: number;
    vin: string;
    description: string;
    photo_url: string;
    price: string;
};

export const APIProductSchema = Yup.object().shape({
    make: Yup.string().required(),
    model: Yup.string().required(),
    year: Yup.number().required(),
    vin: Yup.string().required(),
    description: Yup.string(),
    photo_url: Yup.string(),
    price: Yup.string().required(),
});
