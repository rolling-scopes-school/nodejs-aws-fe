import Badge from "@mui/material/Badge";
import CartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateFromApi } from "~/store/cartSlice";
import { Link } from "react-router-dom";
import API_PATHS from "~/constants/apiPaths";
import { useQuery } from "react-query";
import { CartItem } from "~/models/CartItem";

export default function Cart() {
  const dispatch = useDispatch();
  useQuery<CartItem[], AxiosError>(
    "cart",
    async () => {
      const res = await axios.get<CartItem[]>(
        `${API_PATHS.cart}/profile/cart`,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        dispatch(updateFromApi({ items: data }));
      },
    }
  );

  const cartItems = useSelector(selectCartItems);
  const badgeContent = cartItems.length || undefined;

  return (
    <IconButton
      aria-label="show 4 new mails"
      color="inherit"
      component={Link}
      to="/cart"
      size="large"
    >
      <Badge badgeContent={badgeContent} color="secondary">
        <CartIcon />
      </Badge>
    </IconButton>
  );
}
