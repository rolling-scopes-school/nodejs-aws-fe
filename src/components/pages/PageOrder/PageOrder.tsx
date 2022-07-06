import React from "react";
import { Order, OrderItem } from "~/models/Order";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { Product } from "~/models/Product";
import ReviewOrder from "~/components/pages/PageCart/components/ReviewOrder";
import { OrderStatus, ORDER_STATUS_FLOW } from "~/constants/order";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Field, Formik, FormikProps, FormikValues } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "~/components/Form/TextField";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import { useMutation, useQueryClient, useQueries } from "react-query";

const Form = (props: FormikProps<FormikValues>) => {
  const { values, dirty, isSubmitting, isValid, handleSubmit } = props;
  let helperText = "";
  if (values.status === OrderStatus.Approved) {
    helperText =
      "Setting status to APPROVED will decrease products count from stock!!!";
  }
  // TODO add check if status was changed from approved to cancelled
  //  to increase product count back again
  // if ((values.status) === ORDER_STATUS.cancelled) {
  //   helperText = 'Setting status to CANCELLED will increase products count in stock!!!';
  // }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="status"
            label="Status"
            select
            fullWidth
            helperText={helperText}
          >
            {ORDER_STATUS_FLOW.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="comment"
            label="Comment"
            fullWidth
            autoComplete="off"
            multiline
          />
        </Grid>
        <Grid item container xs={12} justifyContent="space-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!dirty || isSubmitting || !isValid}
          >
            Change status
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default function PageOrder() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const results = useQueries([
    {
      queryKey: ["order", { id }],
      queryFn: async () => {
        const res = await axios.get<Order>(`${API_PATHS.order}/order/${id}`);
        return res.data;
      },
    },
    {
      queryKey: "products",
      queryFn: async () => {
        const res = await axios.get<Product[]>(
          `${API_PATHS.bff}/product/available`
        );
        return res.data;
      },
    },
  ]);
  const [
    { data: order, isFetching: isOrderFetching },
    { data: products, isFetching: isProductsFetching },
  ] = results;

  const cartItems: CartItem[] = React.useMemo(() => {
    if (order && products) {
      return order.items.map((item: OrderItem) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          throw new Error("Product not found");
        }
        return { product, count: item.count };
      });
    }
    return [];
  }, [order, products]);

  const { mutate } = useMutation(
    (values: { status: OrderStatus; comment: string }) =>
      axios.put(`${API_PATHS.order}/order/${id}/status`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["order", { id }], { exact: true });
      },
    }
  );

  if (isOrderFetching || isProductsFetching) return <p>loading...</p>;

  const statusHistory = order?.statusHistory || [];

  const lastStatusItem = statusHistory[statusHistory.length - 1];

  return order ? (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Manage order
      </Typography>
      <ReviewOrder address={order.address} items={cartItems} />
      <Typography variant="h6">Status:</Typography>
      <Typography variant="h6" color="primary">
        {lastStatusItem?.status.toUpperCase()}
      </Typography>
      <Typography variant="h6">Change status:</Typography>
      <Box py={2}>
        <Formik
          initialValues={{ status: lastStatusItem.status, comment: "" }}
          enableReinitialize
          onSubmit={(values) => mutate(values)}
        >
          {(props: FormikProps<FormikValues>) => <Form {...props} />}
        </Formik>
      </Box>
      <Typography variant="h6">Status history:</Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Date and Time</TableCell>
              <TableCell align="right">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusHistory.map((statusHistoryItem) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {statusHistoryItem.status.toUpperCase()}
                </TableCell>
                <TableCell align="right">
                  {new Date(statusHistoryItem.timestamp).toString()}
                </TableCell>
                <TableCell align="right">{statusHistoryItem.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperLayout>
  ) : null;
}
