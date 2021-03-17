import { CartItem } from "models/CartItem";

export type CartItemsProps = {
  items: CartItem[],
  isEditable: boolean
};
