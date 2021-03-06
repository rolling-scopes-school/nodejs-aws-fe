import API_PATHS from 'constants/apiPaths';
import { ORDER_STATUS, ORDER_STATUS_FLOW } from 'constants/order';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ReviewOrder from 'components/pages/PageCart/components/ReviewOrder';
import PaperLayout from 'components/PaperLayout/PaperLayout';
import {
    Field, Formik, FormikProps, FormikValues,
} from 'formik';
import { TextField } from 'formik-material-ui';
import { CartItem } from 'models/CartItem';
import { Order, OrderItem } from 'models/Order';
import { Product } from 'models/Product';

const Form = (props: FormikProps<FormikValues>) => {
    const {
        values,
        // touched,
        // errors,
        dirty,
        isSubmitting,
        isValid,
        // handleChange,
        // handleBlur,
        handleSubmit,
    // handleReset,
    // setFieldValue,
    // isEditMode,
    // onCancel,
    // isButtonContact,
    // setTouched,
    // isButtonAddAndRedirect,
    // setShouldRedirect,
    // submitForm,
    // onGetCitizen,
    // shouldConfirmLeave,
    } = props;
    let helperText = '';

    if ((values.status) === ORDER_STATUS.approved) {
        helperText = 'Setting status to APPROVED will decrease products count from stock!!!';
    }
    // TODO add check if status was changed from approved to cancelled
    //  to increase product count back again
    // if ((values.status) === ORDER_STATUS.cancelled) {
    //   helperText = 'Setting status to CANCELLED will increase products count in stock!!!';
    // }

    return (
        <form onSubmit={ handleSubmit } autoComplete="off">
            <Grid container={ true } spacing={ 2 }>
                <Grid item={ true } xs={ 12 }>
                    <Field
                        component={ TextField }
                        name="status"
                        label="Status"
                        select={ true }
                        fullWidth={ true }
                        helperText={ helperText }
                    >
                        { ORDER_STATUS_FLOW.map((status) => (
                            <MenuItem key={ status } value={ status }>
                                { status }
                            </MenuItem>
                        )) }
                    </Field>
                </Grid>
                <Grid item={ true } xs={ 12 }>
                    <Field
                        component={ TextField }
                        name="comment"
                        label="Comment"
                        fullWidth={ true }
                        autoComplete="off"
                        multiline={ true }
                    />
                </Grid>
                <Grid item={ true } container={ true } xs={ 12 } justify="space-between">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={ !dirty || isSubmitting || !isValid }
                    >
                        Change status
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default function PageOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSubmit = useCallback((values: FormikValues) => axios
        .put(`${API_PATHS.order}/order/${order?.id}/status`, values)
        .then(({ data }) => setOrder(data)), [order]);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);

            return;
        }
        const promises = [
            axios.get(`${API_PATHS.product}/product`),
            axios.get(`${API_PATHS.order}/order/${id}`),
        ];

        Promise.all(promises)
            .then(([{ data: products }, { data: orderFromResponse }]) => {
                const cartItemsFromResponse: CartItem[] = orderFromResponse.items
                    .map((i: OrderItem) => ({
                        product: products.find((p: Product) => p.id === i.productId),
                        count: i.count,
                    }));

                setOrder(orderFromResponse);
                setCartItems(cartItemsFromResponse);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading || !order) return <p>loading...</p>;

    const statusHistory = order.statusHistory || [];

    const lastStatusItem = statusHistory[statusHistory.length - 1];

    return (
        <PaperLayout>
            <Typography component="h1" variant="h4" align="center">
                Manage order
            </Typography>
            <ReviewOrder address={ order.address } items={ cartItems } />
            <Typography variant="h6">
                Status:
            </Typography>
            <Typography variant="h6" color="primary">
                { lastStatusItem?.status.toUpperCase() }
            </Typography>
            <Typography variant="h6">
                Change status:
            </Typography>
            <Formik
                initialValues={ { status: lastStatusItem.status, comment: '' } }
                enableReinitialize={ true }
                onSubmit={ handleSubmit }
            >
                { (props: FormikProps<FormikValues>) => <Form { ...props } /> }
            </Formik>
            <Typography variant="h6">
                Status history:
            </Typography>
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
                        { statusHistory.map((statusHistoryItem) => (
                            <TableRow key={ order.id }>
                                <TableCell component="th" scope="row">
                                    { statusHistoryItem.status.toUpperCase() }
                                </TableCell>
                                <TableCell align="right">
                                    { (new Date(statusHistoryItem.timestamp)).toString() }
                                </TableCell>
                                <TableCell align="right">{ statusHistoryItem.comment }</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </PaperLayout>
    );
}
