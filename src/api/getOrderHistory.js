import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/order_history.php');

const getOrderHistory = (token) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
);

export default getOrderHistory;
