import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import CartIcon from '@material-ui/icons/ShoppingCart';
import { Product } from 'models/Product';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from 'store/cartSlice';

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.product.id === product.id);

  const increaseItemCountDisabled =
    typeof cartItem?.count === 'number' && cartItem.count >= product.count;

  return (
    <>
      {cartItem ? (
        <>
          <IconButton onClick={() => dispatch(removeFromCart(product))}>
            <Remove color="secondary" />
          </IconButton>
          <Typography align="center">{cartItem.count}</Typography>
          <IconButton
            onClick={() => dispatch(addToCart(product))}
            disabled={increaseItemCountDisabled}
          >
            <Add color={increaseItemCountDisabled ? 'disabled' : 'secondary'} />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={() => dispatch(addToCart(product))}>
          <CartIcon color="secondary" />
        </IconButton>
      )}
    </>
  );
}
