import * as Yup from 'yup';

export class Product {
  id: string;
  year: number;
  engine: string;
  imageUrl: string;
  title: string;
  price: number;

  constructor(data: any){
    this.id = data.id;
    this.year = data.year;
    this.engine = data.engine;
    this.imageUrl = data.image_url;
    this.title = data.title;
    this.price = data.price;
  }

  static convertToProducts(products: any) {
    return products.map((prod: any) => new Product(prod))
  }
}

export const ProductSchema = Yup.object().shape({
  year: Yup.number().required(),
  engine: Yup.string().required(),
  imageUrl: Yup.string().required(),
  title: Yup.string().required(),
  price: Yup.number().required(),
});
