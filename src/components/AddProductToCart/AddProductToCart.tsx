import React from "react";
import Typography from "@mui/material/Typography";
import { Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems, removeFromCart } from "~/store/cartSlice";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.product.id === product.id);

  return <>
    {cartItem ? (
      <>
        <IconButton onClick={() => dispatch(removeFromCart(product))} size="large">
          <Remove color={"secondary"} />
        </IconButton>
        <Typography align="center">{cartItem.count}</Typography>
        <IconButton onClick={() => dispatch(addToCart(product))} size="large">
          <Add color={"secondary"} />
        </IconButton>
      </>
    ) : (
      <IconButton onClick={() => dispatch(addToCart(product))} size="large">
        <CartIcon color={"secondary"} />
      </IconButton>
    )}
  </>;
}
