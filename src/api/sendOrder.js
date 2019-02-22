import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/cart.php');

const sendOrder = (token, arrayDetail) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token, arrayDetail })
  })
  .then(res => res.text())
);

export default sendOrder;
