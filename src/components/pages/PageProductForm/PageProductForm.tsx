import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { AvailableProduct, AvailableProductSchema } from "~/models/Product";
import { Formik, Field, FormikProps, FormikValues } from "formik";
import TextField from "~/components/Form/TextField";
import { useNavigate, useParams } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import {
  useAvailableProduct,
  useInvalidateAvailableProducts,
  useRemoveProductCache,
  useUpsertAvailableProduct,
} from "~/queries/products";

const Form = (props: FormikProps<FormikValues>) => {
  const { dirty, isSubmitting, isValid, handleSubmit } = props;
  const navigate = useNavigate();
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
        <Grid item container xs={12} justifyContent="space-between">
          <Button color="primary" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
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

const initialValues: AvailableProduct = AvailableProductSchema.cast({});

export default function PageProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const invalidateAvailableProducts = useInvalidateAvailableProducts();
  const removeProductCache = useRemoveProductCache();
  const { data, isLoading } = useAvailableProduct(id);
  const { mutate: upsertAvailableProduct } = useUpsertAvailableProduct();
  const onSubmit = (values: AvailableProduct) => {
    const formattedValues = AvailableProductSchema.cast(values);
    const productToSave = id
      ? {
          ...formattedValues,
          id,
        }
      : formattedValues;
    upsertAvailableProduct(productToSave, {
      onSuccess: () => {
        invalidateAvailableProducts();
        removeProductCache(id);
        navigate("/admin/products");
      },
    });
  };

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center" mb={2}>
        {id ? "Edit product" : "Create new product"}
      </Typography>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Formik
          initialValues={data ?? initialValues}
          validationSchema={AvailableProductSchema}
          onSubmit={onSubmit}
        >
          {(props: FormikProps<FormikValues>) => <Form {...props} />}
        </Formik>
      )}
    </PaperLayout>
  );
}
