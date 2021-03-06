import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CartItems from 'components/CartItems/CartItems';
import { FormikValues } from 'formik';
import { CartItem } from 'models/CartItem';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
    },
}));

type ReviewOrderProps = {
    address: FormikValues;
    items: CartItem[];
};

export default function ReviewOrder({ address, items }: ReviewOrderProps) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom={ true }>
                Order summary
            </Typography>
            <CartItems items={ items } isEditable={ false } />
            <Grid container={ true } spacing={ 2 }>
                <Grid item={ true } xs={ 12 } sm={ 6 }>
                    <Typography variant="h6" gutterBottom={ true } className={ classes.title }>
                        Shipping
                    </Typography>
                    <Typography gutterBottom={ true }>
                        { address.firstName } { address.lastName }
                    </Typography>
                    <Typography gutterBottom={ true }>{ address.address }</Typography>
                </Grid>
                <Grid item={ true } container={ true } direction="column" xs={ 12 } sm={ 6 }>
                    <Typography variant="h6" gutterBottom={ true } className={ classes.title }>
                        Comment
                    </Typography>
                    <Typography gutterBottom={ true }>{ address.comment }</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
