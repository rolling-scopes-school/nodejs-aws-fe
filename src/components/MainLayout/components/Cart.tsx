import Badge from "@material-ui/core/Badge";
import CartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "store/cartSlice";
import { Link } from 'react-router-dom';

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const badgeContent = cartItems.length || undefined;

  return (
    <IconButton 
      aria-label="show 4 new mails" 
      color="inherit" 
      component={Link} 
      to="/cart"
    >
      <Badge badgeContent={badgeContent} color="secondary">
        <CartIcon/>
      </Badge>
    </IconButton>
  );
}
