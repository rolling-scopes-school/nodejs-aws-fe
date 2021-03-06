import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CartItems from 'components/CartItems/CartItems';
import { selectCartItems } from 'store/cartSlice';

export default function ReviewCart() {
    const cartItems = useSelector(selectCartItems);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom={ true }>
                Order summary
            </Typography>
            <CartItems items={ cartItems } isEditable={ true } />
        </React.Fragment>
    );
}
