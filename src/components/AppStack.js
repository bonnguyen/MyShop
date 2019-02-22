import { createStackNavigator } from 'react-navigation';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import OrderHistory from './OrderHistory/OrderHistory';
import Main from './Main/Main';

const AppStack = createStackNavigator({
  ChangeInfo,
  Main,
  OrderHistory
}, {
  initialRouteName: 'Main',
  headerMode: 'screen'
});

export default AppStack;
