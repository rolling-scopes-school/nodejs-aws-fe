import API_PATHS from "~/constants/apiPaths";
import ProductsTable from "~/components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "~/components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function PageProductImport() {
  return (
    <Box py={3}>
      <Box display="flex" alignItems="center">
        <CSVFileImport
          url={`${API_PATHS.import}/import`}
          title="Import Products CSV"
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          component={Link}
          to={"../product-form/"}
        >
          create product
        </Button>
      </Box>
      <ProductsTable />
    </Box>
  );
}
