import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/check_login.php');

const checkLogin = (token) => (
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

export default checkLogin;
