import { createStackNavigator } from 'react-navigation';

import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail';

const CartStack = createStackNavigator({
  CartView,
  ProductDetail
}, {
  initialRouteName: 'CartView',
  headerMode: 'none'
});

export default CartStack;
