import React from "react";
import Typography from "@mui/material/Typography";
import CartItems from "~/components/CartItems/CartItems";
import { useSelector } from "react-redux";
import { selectCartItems } from "~/store/cartSlice";

export default function ReviewCart() {
  const cartItems = useSelector(selectCartItems);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <CartItems items={cartItems} isEditable />
    </React.Fragment>
  );
}
