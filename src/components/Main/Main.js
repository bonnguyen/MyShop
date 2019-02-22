import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import Shop from './Shop/Shop';
import Menu from './Menu';
import Header from './Shop/Header';

const AppDrawerNavigator = createDrawerNavigator({
  Shop
}, {
  initialRouteName: 'Shop',
  contentComponent: Menu,
  drawerWidth: 300,
  navigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: 'transparent'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#FFF',
    },
    headerTintColor: '#FFF',
    animationEnabled: true
  }
});

export default AppDrawerNavigator;
