export interface Product {
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
}

export interface Products {
  products: Product[];
}

export interface NewProduct {
  count: number;
  description: string;
  price: number;
  title: string;
}
