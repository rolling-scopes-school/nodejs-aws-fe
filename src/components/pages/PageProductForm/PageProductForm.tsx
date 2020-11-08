import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Product, ProductSchema} from 'models/Product';
import {Formik, Field, FormikProps, FormikValues} from 'formik';
import {TextField} from 'formik-material-ui';
import axios from 'axios';
import {Link, useHistory, useParams} from 'react-router-dom';
import PaperLayout from 'components/PaperLayout/PaperLayout';
import Typography from '@material-ui/core/Typography';
import API_PATHS from 'constants/apiPaths';
import {Spinner} from 'components/Spinner/Spinner';

const Form = (props: FormikProps<FormikValues>) => {
    const {
        // values,
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

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field
                        component={TextField}
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="off"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        component={TextField}
                        name="description"
                        label="Description"
                        fullWidth
                        autoComplete="off"
                        multiline
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Field
                        component={TextField}
                        name="price"
                        label="Price ($)"
                        fullWidth
                        autoComplete="off"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Field
                        component={TextField}
                        name="count"
                        label="Count"
                        fullWidth
                        autoComplete="off"
                        required
                    />
                </Grid>
                <Grid item container xs={12} justify="space-between">
                    <Button component={Link} to='/admin/products' color="primary">Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!dirty || isSubmitting || !isValid}
                    >
                        Save Product
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const emptyValues: any = ProductSchema.cast();

export default function PageProductForm() {
    const history = useHistory();
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onSubmit = (values: FormikValues) => {
        const formattedValues = ProductSchema.cast(values);
        const productToSave = id
            ? {...ProductSchema.cast(formattedValues), id}
            : formattedValues;
        axios
            .post(`${API_PATHS.bff}/products`, productToSave)
            .then(() => {
                history.push('/admin/products')
            })
            .catch(console.error);
    };

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        const getProductById = async () => {
            try {
                const {data} = await axios.get(`${API_PATHS.bff}/products/${id}`);
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        getProductById().catch(console.error);
    }, [id]);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <PaperLayout>
            <Typography component="h1" variant="h4" align="center">
                {id ? 'Edit product' : 'Create new product'}
            </Typography>
            <Formik
                initialValues={product || emptyValues}
                validationSchema={ProductSchema}
                onSubmit={onSubmit}
            >
                {(props: FormikProps<FormikValues>) => <Form {...props} />}
            </Formik>
        </PaperLayout>
    );
}
