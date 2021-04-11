import Axios from 'axios';
import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Products from "components/pages/PageProducts/components/Products";
import API_PATHS from 'constants/apiPaths';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageProducts () {
  const classes = useStyles();
  const [showOrder, setOrder] = useState<any>(null)

  const getOneProduct = useCallback(
    (product: any) => async () => {
      const response = await Axios.get(`${API_PATHS.product}/${product.id}`);
      if (response?.data) {
        setOrder(response?.data)
      }
    },
    [setOrder],
  )

  return (
    <div className={classes.content}>
      <Modal
        open={showOrder}
        onClose={() => setOrder(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="wrapepr" style={{ backgroundColor: 'white', padding: "25px" }}>
          <div className="name">{showOrder?.title} title</div>
          <div className="name">{showOrder?.id} id</div>
          <div className="name">{showOrder?.price} price</div>
          <div className="name">{showOrder?.amount} amount</div>
          <div className="name">{
            showOrder?.bitcoin &&
            <>
              <div> {showOrder.bitcoin.chartName}</div>
              <div> {showOrder.bitcoin.disclaimer}</div>
              <div> {showOrder.bitcoin.time.updated} - time</div>
              <div> {showOrder.bitcoin.bpi.EUR.rate} - rate EUR</div>
              <div> {showOrder.bitcoin.bpi.USD.rate} - rate USR</div>
            </>
          }</div>
        </div>
      </Modal>
      <Products getOneProduct={getOneProduct} />
    </div>
  );
}
