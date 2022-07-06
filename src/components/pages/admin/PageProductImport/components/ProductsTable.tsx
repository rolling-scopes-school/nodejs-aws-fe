import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import API_PATHS from "~/constants/apiPaths";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { formatAsPrice } from "~/utils/utils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AvailableProduct } from "~/models/Product";

export default function ProductsTable() {
  const queryClient = useQueryClient();
  const { data } = useQuery<AvailableProduct[], AxiosError>(
    "available-products",
    async () => {
      const res = await axios.get<AvailableProduct[]>(
        `${API_PATHS.bff}/product/available`
      );
      return res.data;
    }
  );

  const { mutate } = useMutation(
    (id: string) => axios.delete(`${API_PATHS.bff}/product/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("available-products", { exact: true });
      },
    }
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">
                {formatAsPrice(product.price)}
              </TableCell>
              <TableCell align="right">{product.count}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`../product-form/${product.id}`}
                >
                  Manage
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    if (product.id) {
                      mutate(product.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
