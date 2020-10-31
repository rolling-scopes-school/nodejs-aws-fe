import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Product} from "models/Product";
import {formatAsPrice} from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";
import Loading from "components/common/Loading/Loading";
import axios from 'axios';
import API_PATHS from "constants/apiPaths";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


const renderProducts = (products: Product[], classes: any) =>
  products.map((product: Product) => (
    <Grid item key={product.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={product.imageUrl}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography>
            {formatAsPrice(product.price.value)}
          </Typography>
        </CardContent>
        <CardActions>
          <AddProductToCart product={product}/>
        </CardActions>
      </Card>
    </Grid>
  ))

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_PATHS.product}/products`, {
      headers: {
        'Accept': 'application/json',
			  'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setProducts(res?.data?.data || []);
      setLoading(false);
    });
  }, [])

  return (
    <Grid container spacing={4}>
      { isLoading ? <Loading /> : renderProducts(products, classes) }
    </Grid>
  );
}
