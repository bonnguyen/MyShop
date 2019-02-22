import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/change_info.php');

const changeInfo = (token, name, phone, address) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token, name, phone, address })
  })
  .then(res => res.json())
);

export default changeInfo;
