import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  AvailableProduct,
  AvailableProductSchema,
  Product,
} from "~/models/Product";
import { Formik, Field, FormikProps, FormikValues } from "formik";
import TextField from "~/components/Form/TextField";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import Typography from "@mui/material/Typography";
import API_PATHS from "~/constants/apiPaths";
import { useQuery, useMutation, useQueryClient } from "react-query";

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

const emptyValues = AvailableProductSchema.cast({});

export default function PageProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Product, AxiosError>(
    ["product", { id }],
    async () => {
      const res = await axios.get<Product>(`${API_PATHS.bff}/product/${id}`);
      return res.data;
    },
    { enabled: !!id }
  );
  const { mutate } = useMutation(
    (productToSave: AvailableProduct) =>
      axios.put(`${API_PATHS.bff}/product`, productToSave),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("available-products", { exact: true });
      },
    }
  );
  const onSubmit = (values: FormikValues) => {
    const formattedValues = AvailableProductSchema.cast(values);
    const productToSave = id
      ? ({
          ...AvailableProductSchema.cast(formattedValues),
          id,
        } as AvailableProduct)
      : (formattedValues as AvailableProduct);
    mutate(productToSave, {
      onSuccess: () => {
        queryClient.invalidateQueries("available-products", { exact: true });
        queryClient.removeQueries(["product", { id }], { exact: true });
        navigate("/admin/products");
      },
    });
  };

  if (isFetching) return <p>loading...</p>;

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        {id ? "Edit product" : "Create new product"}
      </Typography>
      <Formik
        initialValues={data || emptyValues}
        validationSchema={AvailableProductSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<FormikValues>) => <Form {...props} />}
      </Formik>
    </PaperLayout>
  );
}
