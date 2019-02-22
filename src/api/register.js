import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/register.php');

const register = (email, name, password) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email, name, password })
  })
  .then(res => res.text())
);

export default register;
