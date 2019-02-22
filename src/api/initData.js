import { HOST_API } from './../Constants';

const API_URL = HOST_API.concat('api/index.php');

const initData = () => (
  fetch(API_URL) // eslint-disable-line
  .then(res => res.json())
);

export default initData;
