import { createStackNavigator } from 'react-navigation';

import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail';

const SearchStack = createStackNavigator({
  SearchView,
  ProductDetail
}, {
  initialRouteName: 'SearchView',
  headerMode: 'none'
});

export default SearchStack;
