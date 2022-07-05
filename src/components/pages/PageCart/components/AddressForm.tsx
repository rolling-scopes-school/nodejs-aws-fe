import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ProductSchema } from "~/models/Product";
import { Field, Formik, FormikProps, FormikValues } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";

// type AddressFormProps = {
//   initialValues: object,
//   onChange: any
// };
//
// export default function AddressForm({initialValues, onChange}:AddressFormProps) {
//   return (
//     <React.Fragment>
//
//       <Formik
//         initialValues={initialValues}
//         validationSchema={ProductSchema}
//         onSubmit={() => undefined}
//       >
//         {(props: FormikProps<FormikValues>) => <Form {...props} onChange={onChange} />}
//       </Formik>
//     </React.Fragment>
//   );
// }
