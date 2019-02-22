import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api');

const searchProduct = (key) => {
  const url = API_URL.concat(`/search.php?key=${key}`);
  return fetch(url) // eslint-disable-line
  .then(res => res.json());
};

export default searchProduct;
