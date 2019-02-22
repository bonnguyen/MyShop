import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api');

const getListProduct = (idType, page) => {
  let url;
  if (idType !== 'COLLECTION') {
    url = API_URL.concat(`/product_by_type.php?id_type=${idType}&page=${page}`);
  } else {
    url = API_URL.concat(`/get_collection.php?page=${page}`);
  }
  return fetch(url) // eslint-disable-line
  .then(res => res.json());
};

export default getListProduct;
