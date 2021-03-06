import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import CartIcon from '@material-ui/icons/ShoppingCart';
import { Product } from 'models/Product';
import { addToCart, removeFromCart, selectCartItems } from 'store/cartSlice';

type AddProductToCartProps = {
    product: Product;
};

export function AddProductToCart({ product }: AddProductToCartProps) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartItem = useMemo(
        () => cartItems.find((i) => i.product.id === product.id),
        [cartItems, product.id],
    );

    return (
        <React.Fragment>
            {
                cartItem
                    ? (
                        <React.Fragment>
                            <IconButton onClick={ () => dispatch(removeFromCart(product)) }>
                                <Remove color="secondary" />
                            </IconButton>
                            <Typography align="center">
                                { cartItem.count }
                            </Typography>
                            <IconButton onClick={ () => dispatch(addToCart(product)) }>
                                <Add color="secondary" />
                            </IconButton>
                        </React.Fragment>
                    )
                    : (
                        <IconButton onClick={ () => dispatch(addToCart(product)) }>
                            <CartIcon color="secondary" />
                        </IconButton>
                    )
            }
        </React.Fragment>
    );
}
