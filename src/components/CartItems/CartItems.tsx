import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import {CartItem} from "models/CartItem";
import {formatAsPrice} from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

type CartItemsProps = {
  items: CartItem[],
  isEditable: boolean
};

export default function CartItems({items, isEditable}: CartItemsProps) {
  const classes = useStyles();

  const totalPrice: number = items.reduce((total, item) => (item.count * item.product.price + total), 0);

  return (
    <>
      <List disablePadding>
        {items.map((cartItem: CartItem) => (
          <ListItem className={classes.listItem} key={cartItem.product.id}>
            {isEditable && <AddProductToCart product={cartItem.product}/>}
            <ListItemText primary={cartItem.product.title} secondary={cartItem.product.description}/>
            <Typography
              variant="body2">{formatAsPrice(cartItem.product.price)} x {cartItem.count} = {formatAsPrice(cartItem.product.price * cartItem.count)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Shipping"/>
          <Typography
            variant="body2">Free</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total"/>
          <Typography variant="subtitle1" className={classes.total}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
