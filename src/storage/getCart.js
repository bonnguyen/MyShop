import { AsyncStorage } from 'react-native';

const getCart = async () => {
  try {
    const cartArray = await AsyncStorage.getItem('@cart');
    return cartArray === null ? [] : JSON.parse(cartArray);
  } catch (error) {
    console.log(error);
  }
};

export default getCart;
