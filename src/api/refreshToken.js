import { HOST_API } from './../Constants';
import getToken from './../storage/getToken';
import saveToken from './../storage/saveToken';

const API_URL = HOST_API.concat('api/refresh_token.php');

const getNewToken = (token) => (
  fetch(API_URL, // eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.text())
);

const refreshToken = async () => {
  try {
    const token = await getToken();
    if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
      return;
    }
    const newToken = await getNewToken(token);
    await saveToken(newToken);
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
