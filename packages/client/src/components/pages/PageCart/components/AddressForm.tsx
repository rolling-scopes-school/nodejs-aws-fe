import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {ProductSchema} from "models/Product";
import {Field, Formik, FormikProps, FormikValues} from "formik";
import Button from "@material-ui/core/Button";
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