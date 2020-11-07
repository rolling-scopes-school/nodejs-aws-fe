import { Product } from '../models/Product';
import { APIProduct } from '../models/APIProduct';

export const mapAPIProduct = (product: APIProduct): Product => {
    return {
        id: product.id.toString(),
        title: `${product.make} ${product.model} ${product.year}`,
        description: `${product.vin} ${product.description}`,
        photo_url: product.photo_url,
        price: Number(product.price.substring(1) || ''),
    };
};
