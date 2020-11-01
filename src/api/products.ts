import API_PATHS from "constants/apiPaths";

import axios from "axios";

type Response = any;

export const fetchProducts = () => {
  return axios.get(API_PATHS.products).then((res: Response) => {
    return res.data.result.items;
  });
};
