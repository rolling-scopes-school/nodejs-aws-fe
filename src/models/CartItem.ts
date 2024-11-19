import { Product } from "~/models/Product";

export type CartItem = {
  product: Product;
  count: number;
};

export type CartRespose = {
  cart: {
    id: string;
    user_id: string;
    status: string;
    created_at: string;
    updated_at: string;

    items: CartItem[];
  };
  total: number;
};
