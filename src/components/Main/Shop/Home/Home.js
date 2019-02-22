import { createStackNavigator } from 'react-navigation';

import HomeView from './HomeView';
import ListProduct from '../ListProduct/ListProduct';
import ProductDetail from '../ProductDetail/ProductDetail';

const HomeStack = createStackNavigator({
  HomeView,
  ListProduct,
  ProductDetail
}, {
  initialRouteName: 'HomeView',
  headerMode: 'none'
});

export default HomeStack;
