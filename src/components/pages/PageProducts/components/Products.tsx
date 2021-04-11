import React, { useCallback, useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import Fade from '@material-ui/core/Fade';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';

import { Product } from 'models/Product';

import { formatAsPrice } from 'utils/utils';
import axios from 'axios';
import API_PATHS from 'constants/apiPaths';
import productList from './productList.json';

import { useStyles } from './styles';

export default function Products() {
  const classes = useStyles();

  const [products, setProducts] = useState<Product[]>([]);

  const [open, setOpen] = React.useState(false);

  const [openedProductInfo, setOpenedProductInfo] = React.useState({ title: '', description: '' });

  useEffect(() => {
    axios.get(`${API_PATHS.products}`).then(res => setProducts(res.data.data));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedProductInfo({ title: '', description: '' });
  };

  const getProductInfo = useCallback(
    (productId: string) => () => {
      axios.get(`${API_PATHS.products}/${productId}`).then(res => {
        handleOpen();
        setOpenedProductInfo({ title: res.data.data.title, description: res.data.data.description });
      });
    },
    [],
  );

  return (
    <Grid container spacing={4}>
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{openedProductInfo?.title}</h2>
              <p id="transition-modal-description">{openedProductInfo?.description}</p>
            </div>
          </Fade>
        </Modal>
      </>

      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Image title"
            />

            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.cardTitle}
                gutterBottom
                variant="h5"
                component="h2"
                onClick={getProductInfo(product.id)}
              >
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
