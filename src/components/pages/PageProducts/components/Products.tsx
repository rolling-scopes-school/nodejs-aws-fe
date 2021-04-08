import React, {useEffect, useState} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AddProductToCart from 'components/AddProductToCart/AddProductToCart';

import {Product} from 'models/Product';

import {formatAsPrice} from 'utils/utils';
import productList from './productList.json';

import {useStyles} from './styles';
import axios from 'axios';
import API_PATHS from 'constants/apiPaths';

export default function Products() {
  const classes = useStyles();

  const [products, setProducts] = useState<Product[]>([]);

  console.log('prod', products);

  useEffect(() => {
    axios
      .get(`${API_PATHS.product}/products`, {
        // headers: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      // },
      })
      .then(res => setProducts(res.data.data))
      .catch(error => console.log('!!error', error));
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Image title"
            />

            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>

              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>

            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
