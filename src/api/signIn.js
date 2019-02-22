import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/login.php');

const signIn = (email, password) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
);

export default signIn;
